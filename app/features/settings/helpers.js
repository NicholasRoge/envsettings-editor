import fs from 'fs';
import path from 'path';

import parseCsv from 'csv-parse';


const NON_ENV_COLUMNS = ["Handler", "Param1", "Param2", "Param3", "GROUPS"]

function mapRowToHeadings(row, headings) {
    let result = {};
    for (let i = 0;i < headings.length;++i) {
        result[headings[i]] = i >= row.length ? '' : row[i]; 
    }
    return result;
}

function fromCsvData(csvRows) {
    if (!csvRows.length) {
        return {
            data: {},
            environments: ["DEFAULT"]
        };
    }


    let settings = {
        data: {},
        environments: csvRows[0].filter(
            columnHeading => [
                "Handler",
                "Param1",
                "Param2",
                "Param3",
                "GROUPS"
            ].indexOf(columnHeading) === -1
        )
    };

    for (let i = 1;i < csvRows.length;++i) {
        const row = mapRowToHeadings(csvRows[i], csvRows[0]);
        const {Handler, Param1, Param2, Param3, GROUPS} = row;

        const setting = {
            id:      i,
            handler: Handler.substr("Est_Handler_".length),
            params:  [Param1, Param2, Param3],
            groups:  GROUPS ? GROUPS.split(",") : [],
            value:   {}
        };
        for (let environment of settings.environments) {
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
        settings.data[setting.id] = setting;
    }

    return settings;
}

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

        let csvRows = await new Promise((resolve, reject) => {
            let parserOptions = {
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
        return fromCsvData(csvRows);


    } catch (error) {
        return Promise.reject(error.message);
    }
}