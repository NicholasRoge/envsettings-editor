import fs from 'fs';
import path from 'path';

import parseCsv from 'csv-parse';


const NON_ENV_COLUMNS = ["Handler", "Param1", "Param2", "Param3", "GROUPS"]


export async function readDataFromFile(filename, forceCsv = false) {
    try {
        /*if (!fs.accessSync(filename, fs.constants.R_OK)) {
            throw new Error(`File '${filename}' does not exist or cannot be read.`);
        }*/


        let stats = fs.statSync(filename);
        if (!stats.isFile()) {
            throw new Error("The specified path is not a file.");
        }


        if (!path.extname(filename) && !forceCsv) {
            throw new Error(`The specified file does not have a CSV extension.`);
        }


        let data = fs.readFileSync(filename).toString();

        data = await new Promise((resolve, reject) => {
            let parserOptions = {
                columns: true, 
                comment: "#"
            };

            parseCsv(data, parserOptions, function (error, output) {
                if (error) {
                    reject(`Failed to parse file.  Reason:  ${error.message}`);

                    return;
                }


                resolve(output);
            });
        }).catch(error => {throw new Error(error)});

        let settings = {};
        for (let row of data) {
            const setting = {
                id: Object.keys(settings).length + 1,
                handler: row.Handler.substr("Est_Handler_".length),
                params: [
                    row.Param1,
                    row.Param2,
                    row.Param3
                ],
                groups: row.GROUPS ? row.groups.split(",").map(name => name.trim()) : [],
                value: {}
            };

            delete row["Handler"];
            delete row["Param1"];
            delete row["Param2"];
            delete row["Param3"];
            delete row["GROUPS"];

            for (let environment in row) {
                const value = {
                    default: row[environment] === "" && environment !== "DEFAULT",
                    delete: row[environment] === "--delete--"
                };
                if (value.default || value.delete) {
                    value.text = "";
                } else {
                    value.text = row[environment];
                    if (value.text === "--empty--") {
                        value.text = "";
                    }
                }

                setting.value[environment] = value;
            }

            settings[setting.id] = setting;
        }
        return settings;
    } catch (error) {
        return Promise.reject(error.message);
    }
}