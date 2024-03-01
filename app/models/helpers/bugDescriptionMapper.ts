import { BodyPartDescritpion, BugDescription } from "../BugDescription"
import { SimpleDescription } from "../BugDescriptionStore"

interface TmpDescription {
    genus: string,
    head?: BodyPartDescritpion,
    leg?: BodyPartDescritpion,
    tentacles?: BodyPartDescritpion,
    front_wings?: BodyPartDescritpion,
    fore_chest?: BodyPartDescritpion,
}

const allowedBodyParts: string[] = ['head', 'leg', 'tentacles', 'front_wings', 'fore_chest']

export const mapSimpleDescriptionsToFullDescriptions = (descriptions: SimpleDescription[]): Map<string, BugDescription> => {
    const descriptionMap = new Map<string, TmpDescription>
    descriptions.forEach(d => {
        const bodyPart: string = d.body_part
        if(!allowedBodyParts.includes(bodyPart)) {
            console.error?.(`Error in initial data, unexpected body part ${bodyPart}: ${JSON.stringify(d)}`, [])
            return
        }
        let existingObject = descriptionMap.get(d.genus)
        const description = {
            indication_text: d.indication_text,
            indication_code: d.indication_code,
            picture_name: d.picture_name
        }
        if (existingObject) {
            const newObj = { ...existingObject, [bodyPart]: description };
            descriptionMap.set(d.genus, newObj)
        } else {
            const obj = {
                genus: d.genus,
                [bodyPart]: description
            }
            descriptionMap.set(d.genus, obj)
        }
    })
    descriptionMap.forEach( (k,v) => console.log(k + ' : ' + v))
    return new Map<string, BugDescription>(descriptionMap as Map<string, BugDescription>)
}