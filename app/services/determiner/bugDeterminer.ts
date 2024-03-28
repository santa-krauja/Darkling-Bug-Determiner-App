import { BodyPartDescription, BugDescription } from "app/models/BugDescription"
import { BugBodyPartValue } from "app/services/determiner/BugBodyPart"

export function filterBugDescriptions(
  bugDescriptions: BugDescription[],
  targetBodyPart: BugBodyPartValue,
  targetIndicationCode: string,
): BugDescription[] {

  if (!targetBodyPart) {
    throw new Error("No body part provided!")
  }
  return bugDescriptions
    .filter((bug) => {
      const bodyPartDescription = bug[targetBodyPart]
      return bodyPartDescription.indication_code === targetIndicationCode
    })
}

export function filterBodyPartDescriptions(
  bugDescriptions: BugDescription[],
  targetBodyPart: BugBodyPartValue,
): BodyPartDescription[] {
  if (!targetBodyPart) {
    throw new Error("No body part provided!")
  }
  return bugDescriptions
    .map(description => description[targetBodyPart])
    .filter((value, index, self) => {
      return self.findIndex(p => equals(p, value)) === index
    })
}

function equals(first: BodyPartDescription, other: BodyPartDescription): boolean {
  return (first === null && other === null) || (first !== null && other !== null &&
  first.indication_text === other.indication_text &&
    first.indication_code === other.indication_code &&
    first.picture_name === other.picture_name)
}