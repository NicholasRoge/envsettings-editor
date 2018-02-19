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

        let settings = [];
        for (let row of data) {
            let setting = {
                handler: row.Handler.substr("Est_Handler_".length),
                params: [
                    row.Param1,
                    row.Param2,
                    row.Param3
                ],
                groups: row.GROUPS ? row.groups.split(",").map(name => name.trim()) : [],
            };

            delete row["Handler"];
            delete row["Param1"];
            delete row["Param2"];
            delete row["Param3"];
            delete row["GROUPS"];
            setting.delete = [];
            setting.value = row;

            for (let environment in setting.value) {
                setting.delete[environment] = false;
                switch (setting.value[environment]) {
                    case "":
                        if (environment !== "DEFAULT") {
                            setting.value[environment] = null;
                        }
                        break;

                    case "--empty--":
                        setting.value[environment] = "";
                        break;
                    
                    case "--delete--":
                        setting.value[environment] = "";
                        setting.delete = true;
                        break;
                }
            }


            settings.push(setting);
        }
        console.log(settings);
        return settings;
    } catch (error) {
        return Promise.reject(error.message);
    }
}