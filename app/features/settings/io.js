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

export async function readFromCsv(filename) {
    try {
        let stats = fs.statSync(filename);
        if (!stats.isFile()) {
            throw new Error("The specified path is not a file.");
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


function encodeCsvLine(row) {
    return row
        .map(value => {
            let addQuotes = false;

            if (value.indexOf(",") !== -1) {
                addQuotes = true;
            }

            if (value.indexOf('"') !== -1) {
                addQuotes = true;
                value = value.replace('""', '""');
            }

            return addQuotes ? '"' + value + '"' : value;
        })
        .join(",");
}

export async function writeToCsv(filename, settings) {
    const headerRow = ["Handler", "Param1", "Param2", "Param3", "GROUPS", ...settings.environments];
    const dataRows = [
        ...Object.entries(settings.data).map(([id, setting]) => [
            setting.handler,
            setting.params[0],
            setting.params[1],
            setting.params[2],
            setting.groups.join(","),
            ...settings.environments.map(environment => {
                const value = setting.value[environment];

                if (value.default) {
                    return "";
                }

                if (value.delete) {
                    return "--delete--";
                }

                if (value.text === "") {
                    return "--empty--";
                }

                return value.text;
            })
        ])
    ];

    console.log("Trying to write to " + filename);
    fs.writeFileSync(filename, [
        encodeCsvLine(headerRow),
        ...dataRows.map(row => encodeCsvLine(row))
    ].join("\n"));
}