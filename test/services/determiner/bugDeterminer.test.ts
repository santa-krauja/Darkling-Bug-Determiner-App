import BugBodyPart from "../../../app/services/determiner/BugBodyPart"
import { bugDescriptions } from "./fixtures"
import { filterBodyPartDescriptions, filterBugDescriptions } from "../../../app/services/determiner"

describe('filterBugDescriptions', () => {

  it('should filter bug descriptions based on body part and indication code', () => {
    const filteredLegBugs = filterBugDescriptions(bugDescriptions, BugBodyPart.LEG, 'LEG_CODE')
    expect(filteredLegBugs.length).toBe(1)
    expect(filteredLegBugs[0].genus).toBe('Insecta')

    const filteredHeadBugs = filterBugDescriptions(bugDescriptions, BugBodyPart.HEAD, 'HEAD_CODE')
    expect(filteredHeadBugs.length).toBe(1)
    expect(filteredHeadBugs[0].genus).toBe('Insecta')

    const filteredWingsBugs = filterBugDescriptions(bugDescriptions, BugBodyPart.FRONT_WINGS, 'WINGS_CODE')
    expect(filteredWingsBugs.length).toBe(1)
    expect(filteredWingsBugs[0].genus).toBe('Insecta')

    const filteredTentaclesBugs = filterBugDescriptions(bugDescriptions, BugBodyPart.TENTACLES, 'TENTACLES_CODE')
    expect(filteredTentaclesBugs.length).toBe(1)
    expect(filteredTentaclesBugs[0].genus).toBe('Insecta')

    const filteredChestBugs = filterBugDescriptions(bugDescriptions, BugBodyPart.FORE_CHEST, 'CHEST_CODE')
    expect(filteredChestBugs.length).toBe(1)
    expect(filteredChestBugs[0].genus).toBe('Insecta')
  })

  it('should return 2 instances if bugs match body part code', () => {
    const additional = { ...bugDescriptions[0], genus: 'Lagria' }
    bugDescriptions.push(additional)
    const filteredBugs = filterBugDescriptions(bugDescriptions, BugBodyPart.LEG, 'LEG_CODE')
    expect(filteredBugs.length).toBe(2)
    expect(filteredBugs[0].genus).toBe('Insecta')
    expect(filteredBugs[1].genus).toBe('Lagria')
  })

  it('should return an empty array if no matches are found', () => {
    const filteredBugs = filterBugDescriptions(bugDescriptions, BugBodyPart.LEG, 'INVALID_CODE')
    expect(filteredBugs.length).toBe(0)
  })
})


describe("filterBodyPartDescriptions", () => {

  it("should filter bug descriptions based on body part and indication code", () => {
    const legDescriptions = filterBodyPartDescriptions(bugDescriptions, BugBodyPart.LEG)
    expect(legDescriptions.length).toBe(1)
    expect(legDescriptions[0].indication_code).toBe("LEG_CODE")

    const frontWingDescriptions = filterBodyPartDescriptions(bugDescriptions, BugBodyPart.FRONT_WINGS)
    expect(frontWingDescriptions.length).toBe(1)
    expect(frontWingDescriptions[0].indication_code).toBe("WINGS_CODE")

    const tentacleDescriptions = filterBodyPartDescriptions(bugDescriptions, BugBodyPart.TENTACLES)
    expect(tentacleDescriptions.length).toBe(1)
    expect(tentacleDescriptions[0].indication_code).toBe("TENTACLES_CODE")

    const foreChestDescriptions = filterBodyPartDescriptions(bugDescriptions, BugBodyPart.FORE_CHEST)
    expect(foreChestDescriptions.length).toBe(1)
    expect(foreChestDescriptions[0].indication_code).toBe("CHEST_CODE")
  })

  it("should return an empty array if no bugs are passed", () => {
    const filteredBugs = filterBodyPartDescriptions([], BugBodyPart.LEG)
    expect(filteredBugs.length).toBe(0)
  })

  it("should return one body part description if 2 bugs matches", () => {
    const additional = { ...bugDescriptions[0] }
    bugDescriptions.push(additional)
    const filteredBugs = filterBodyPartDescriptions(bugDescriptions, BugBodyPart.LEG)
    expect(filteredBugs.length).toBe(1)
    expect(filteredBugs[0].indication_code).toBe("LEG_CODE")
  })

  it("should return 2 body part description if 2 bugs dont match", () => {
    const additional = {
      ...bugDescriptions[0], genus: "Lagria", [BugBodyPart.LEG]: {
        indication_text: "Six legs",
        indication_code: "LEG_CODE_1",
        picture_name: "leg_picture.png",
      },
    }
    bugDescriptions.push(additional)
    const filteredBugs = filterBodyPartDescriptions(bugDescriptions, BugBodyPart.LEG)
    expect(filteredBugs.length).toBe(2)
    expect(filteredBugs[0].indication_code).toBe("LEG_CODE")
    expect(filteredBugs[1].indication_code).toBe("LEG_CODE_1")
  })
})