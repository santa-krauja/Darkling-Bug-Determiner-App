import BugBodyPart from "../../../app/services/determiner/BugBodyPart"
import { BugDescription } from "../../../app/models/BugDescription"

export const bugDescriptions: BugDescription[] = [
    {
        genus: 'Insecta',
        [BugBodyPart.LEG]: {
            indication_text: 'Six legs',
            indication_code: 'LEG_CODE',
            picture_name: 'leg_picture.png',
        },
        [BugBodyPart.HEAD]: {
            indication_text: 'Head description',
            indication_code: 'HEAD_CODE',
            picture_name: 'head_picture.png',
        },
        [BugBodyPart.FRONT_WINGS]: {
            indication_text: 'Front wings description',
            indication_code: 'WINGS_CODE',
            picture_name: 'wings_picture.png',
        },
        [BugBodyPart.TENTACLES]: {
            indication_text: 'Tentacles description',
            indication_code: 'TENTACLES_CODE',
            picture_name: 'tentacles_picture.png',
        },
        [BugBodyPart.FORE_CHEST]: {
            indication_text: 'Fore chest description',
            indication_code: 'CHEST_CODE',
            picture_name: 'chest_picture.png',
        },
    } as unknown as BugDescription,
]