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

        // A little more processing to put group the environment values under a
        // single key, as this will make it a little easier to work with.
        for (let setting of data) {
            // Technically, this will be the same for every "setting" object.
            // This can be optimized later. #TODO
            let envColumns = Object.keys(setting);
            for (let column of NON_ENV_COLUMNS) {
                let columnIndex = envColumns.indexOf(column);
                if (columnIndex !== -1) {
                    envColumns.splice(columnIndex, 1);
                }
            }

            setting.value = {};
            for (let column of envColumns) {
                setting.value[column] = setting[column];
                delete setting[column];
            }
        }

        return data;
    } catch (error) {
        return Promise.reject(error.message);
    }
}