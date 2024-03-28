import Papa from 'papaparse'

export class CsvReader {

    async readCsvText<T>(data: string): Promise<T[]> {
        try {
            return new Promise(resolve => {
                Papa.parse<T>(data, {
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