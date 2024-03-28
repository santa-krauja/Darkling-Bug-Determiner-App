import { BugDescription } from "../../../app/models/BugDescription"

export const bugDescriptions: BugDescription[] = [
    {
        genus: 'Insecta',
        leg: {
            indication_text: 'Six legs',
            indication_code: 'LEG_CODE',
            picture_name: 'leg_picture.png',
        },
        head: {
            indication_text: 'Head description',
            indication_code: 'HEAD_CODE',
            picture_name: 'head_picture.png',
        },
        front_wings: {
            indication_text: 'Front wings description',
            indication_code: 'WINGS_CODE',
            picture_name: 'wings_picture.png',
        },
        tentacles: {
            indication_text: 'Tentacles description',
            indication_code: 'TENTACLES_CODE',
            picture_name: 'tentacles_picture.png',
        },
        fore_chest: {
            indication_text: 'Fore chest description',
            indication_code: 'CHEST_CODE',
            picture_name: 'chest_picture.png',
        },
    } as unknown as BugDescription,
]