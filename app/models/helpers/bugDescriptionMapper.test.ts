import { BugDescription } from "../BugDescription";
import { mapSimpleDescriptionsToFullDescriptions } from "./bugDescriptionMapper";

test("maps correctly with correct data", () => {
    const returnData = mapSimpleDescriptionsToFullDescriptions(initialData)
    const expectedMap = new Map<string, BugDescription>()
    expectedMap.set("Lagria", expectedData as BugDescription)
    expect(returnData).toEqual(expectedMap)
})

test("Does not map incorrect data", () => {
    const incorrectData = {
        genus: 'Lagria',
        body_part: 'galva',
        indication_text: '6',
        indication_code: 'type-6',
        picture_name: 'type-6'
    }
    initialData.push(incorrectData)
    const returnData = mapSimpleDescriptionsToFullDescriptions(initialData)
    const expectedMap = new Map<string, BugDescription>()
    expectedMap.set("Lagria", expectedData as BugDescription)
    expect(returnData).toEqual(expectedMap)
})

const initialData = [
    {
        genus: 'Lagria',
        body_part: 'head',
        indication_text: '1',
        indication_code: 'type-1',
        picture_name: 'type-1'
    },
    {
        genus: 'Lagria',
        body_part: 'leg',
        indication_text: '2',
        indication_code: 'type-2',
        picture_name: 'type-2'
    },
    {
        genus: 'Lagria',
        body_part: 'tentacles',
        indication_text: '3',
        indication_code: 'type-3',
        picture_name: 'type-3'
    },
    {
        genus: 'Lagria',
        body_part: 'front_wings',
        indication_text: '4',
        indication_code: 'type-4',
        picture_name: 'type-4'
    },
    {
        genus: 'Lagria',
        body_part: 'fore_chest',
        indication_text: '5',
        indication_code: 'type-5',
        picture_name: 'type-5'
    }
]

const expectedData = {
        genus: 'Lagria',
        fore_chest: {
            indication_text: '5',
            indication_code: 'type-5',
            picture_name: 'type-5'
        },
        front_wings: {
            indication_text: '4',
            indication_code: 'type-4',
            picture_name: 'type-4'
        },
        tentacles: {
            indication_text: '3',
            indication_code: 'type-3',
            picture_name: 'type-3'
        },
        leg: {
            indication_text: '2',
            indication_code: 'type-2',
            picture_name: 'type-2'
        },
        head: {
            indication_text: '1',
            indication_code: 'type-1',
            picture_name: 'type-1'
        }
    }
