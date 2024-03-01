import Papa from 'papaparse'
import { readFile, stat } from 'react-native-fs';

export class CsvReader {
    constructor() {

    }

    async readCsvFile<T>(path: string): Promise<T[]> {

        try {
            const fileStat = await stat(path);
    
            if (fileStat.isFile()) {
                //TODO instead of reading file from file system read it from web
              const csvFile = await readFile(fileStat.path, 'utf8')
              const csvData = csvFile.toString()


              return new Promise(resolve => {
                Papa.parse<T>(csvData, {
                    header: true,
                    complete: results => {
                        console.log('Complete', results.data.length, 'records.')
                        resolve(results.data);
                    }
                })
            })
            } else {
                return Promise.reject("File not found!")

            }
          } catch (e) {
            console.log('e', e)
            return Promise.reject(e)
          }
    };
}

export const csvReader = new CsvReader()
