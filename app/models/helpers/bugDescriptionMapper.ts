import { BodyPartDescription, BugDescriptionIn } from "../BugDescription"
import { SimpleDescription } from "../BugDescriptionStore"

interface TmpDescription {
    genus: string,
    head?: BodyPartDescription,
    leg?: BodyPartDescription,
    tentacles?: BodyPartDescription,
    front_wings?: BodyPartDescription,
    fore_chest?: BodyPartDescription,
}

const allowedBodyParts: string[] = ['head', 'leg', 'tentacles', 'front_wings', 'fore_chest']

export const mapSimpleDescriptionsToFullDescriptions = (descriptionsIn: SimpleDescription[]): BugDescriptionIn[] => {
    const descriptionMap = new Map<string, TmpDescription>
    descriptionsIn.forEach(d => {
        const bodyPart: string = d.body_part
        if (!allowedBodyParts.includes(bodyPart)) {
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

    return [...descriptionMap.values()].map(item => mapData(item))
}

const mapData = (tmpData: TmpDescription): BugDescriptionIn => {

    const { genus, head, leg, tentacles, front_wings, fore_chest } = tmpData

    if (!head || !leg || !tentacles || !front_wings || !fore_chest)
        throw new Error(`Thre are missing elements in descritption for ${genus}!`)
    return { genus, head, leg, tentacles, front_wings, fore_chest }
}