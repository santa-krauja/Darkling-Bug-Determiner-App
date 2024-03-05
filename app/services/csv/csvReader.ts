import Papa from 'papaparse'
import { csvData } from './indications'

export class CsvReader {
    constructor() {
    }

    async readCsvText<T>(): Promise<T[]> {
        try {
            return new Promise(resolve => {
                Papa.parse<T>(csvData, {
                    header: true,
                    complete: results => {
                        console.log('Complete', results.data.length, 'records.')
                        resolve(results.data);
                    }
                })
            })
        } catch (e) {
            console.log('e', e)
            return Promise.reject(e)
        }
    }
}

export const csvReader = new CsvReader()