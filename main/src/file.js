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
            environments: ["DEFAULT"],
            settings: []
        };
    }


    let result = {
        environments: csvRows[0].filter(
            columnHeading => [
                "Handler",
                "Param1",
                "Param2",
                "Param3",
                "GROUPS"
            ].indexOf(columnHeading) === -1
        ),
        settings: []
    };

    for (let i = 1;i < csvRows.length;++i) {
        const {Handler, Param1, Param2, Param3, GROUPS, ...values} = mapRowToHeadings(csvRows[i], csvRows[0])

        const setting = {
            handler: Handler,
            params:  [Param1, Param2, Param3],
            groups:  GROUPS ? GROUPS.split(",") : [],
            values
        };

        result.settings.push(setting)
    }

    return result;
}

export async function read(filename) {
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
    console.log("Encoding row:  ", row)
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

export async function write(filename, data) {
    console.log("Writing:  ", data)
    const headerRow = ["Handler", "Param1", "Param2", "Param3", "GROUPS", ...data.environments];
    const dataRows = [
        ...data.settings.map(setting => [
            setting.handler,
            setting.params[0],
            setting.params[1],
            setting.params[2],
            setting.groups.join(","),
            ...data.environments.map(environment => setting.values[environment])
        ])
    ];

    fs.writeFileSync(filename, [
        encodeCsvLine(headerRow),
        ...dataRows.map(row => encodeCsvLine(row))
    ].join("\n"));
}