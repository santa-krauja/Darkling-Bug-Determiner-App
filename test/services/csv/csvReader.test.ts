import { csvReader } from "../../../app/services/csv"
import { csvTestData } from "./fixtures"

test("Reads file", async () => {

   const data = await csvReader.readCsvText<JSON>(csvTestData)
   console.log(data)
   expect(data.length).toEqual(10)
   expect(data).toEqual(expect.arrayContaining([expected]));
})

const expected = {
   genus: 'Lagria',
   body_part: 'head',
   indication_text: 'Tips nr 1',
   indication_code: 'type-1',
   picture_name: 'type-1'
}