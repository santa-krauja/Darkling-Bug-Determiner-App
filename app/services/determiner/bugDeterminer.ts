import { BodyPartDescription, BugDescription } from "app/models/BugDescription"

export function filterBugDescriptions(
  bugDescriptions: BugDescription[],
  targetBodyPart: keyof BugDescription,
  targetIndicationCode: string,
): BugDescription[] {

  return bugDescriptions
    .filter((bug) => {
      const bodyPartDescription = bug[targetBodyPart]
      return bodyPartDescription.indication_code === targetIndicationCode
    })
}

export function filterBodyPartDescriptions(
  bugDescriptions: BugDescription[],
  targetBodyPart: keyof BugDescription,
): BodyPartDescription[] {

  return bugDescriptions
    .map(description => description[targetBodyPart])
    .filter((value, index, self) => {
      return self.indexOf(value) === index
    })
}