import { csvReader } from "../../../app/services/csv/csvReader"

test("Reads file", async () => {
   
   const data = await csvReader.readCsvFile<JSON>('test/assets/indications.csv')
   console.log(data)
   expect(data.length).toEqual(1)
   expect(data).toEqual(expect.arrayContaining([expected]));
})

const expected = {
    genus: 'Lagria',
    body_part: 'head',
    indication_text: 'Tips nr 1',
    indication_code: 'type-1',
    picture_name: 'type-1'
  }