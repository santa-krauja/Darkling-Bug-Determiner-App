import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { csvReader } from "../services/csv"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { BodyPartDescription, BugDescription, BugDescriptionModel } from "./BugDescription"
import { mapSimpleDescriptionsToFullDescriptions } from "./helpers/bugDescriptionMapper"
import { filterBodyPartDescriptions, filterBugDescriptions } from "app/services/determiner"
import { BugBodyPart } from "app/services/determiner/BugBodyPart"
import { csvData } from "app/services/csv/indications"

export interface SimpleDescription {
  genus: string
  body_part: string
  indication_text: string
  indication_code: string
  picture_name: string
}

const bodyPartOderForDeterminer: BugBodyPart[] = [BugBodyPart.TENTACLES, BugBodyPart.FORE_CHEST, BugBodyPart.LEG, BugBodyPart.FRONT_WINGS]

export const BugDescriptionStoreModel = types
  .model("BugDescriptionStore")
  .props({
    allDescriptions: types.array(BugDescriptionModel),
    possibleBugs: types.array(types.reference(BugDescriptionModel)),
    currentBodyPart: types.optional(
      types.enumeration<BugBodyPart>("BugBodyPart", Object.values(BugBodyPart)),
      bodyPartOderForDeterminer[0],
    ),
    finished: false,
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    addPossible(bugDescription: BugDescription) {
      store.possibleBugs.push(bugDescription)
    },
    removePossible(bugDescription: BugDescription) {
      store.possibleBugs.remove(bugDescription)
    },
    setBodyPart(bodyPart: BugBodyPart) {
      store.setProp("currentBodyPart", bodyPart)
    },
    async getDescriptions() {
      // await runInAction(async () => {
      console.log("refresh")
      store.setProp("possibleBugs", [])
      store.setProp("finished", false)
      const data = await csvReader.readCsvText<SimpleDescription>(csvData)
      const bugDescriptionsIn = mapSimpleDescriptionsToFullDescriptions(data)
      store.setProp("allDescriptions", bugDescriptionsIn)
      bugDescriptionsIn.forEach(d => this.addPossible(d as BugDescription))
      this.setBodyPart(bodyPartOderForDeterminer[0])
    },
  }))
  .views((store) => ({
    get allDescriptionsForList() {
      return store.allDescriptions
    },
    get currentBodyPartDescriptions() {
      const dec = filterBodyPartDescriptions(store.possibleBugs, store.currentBodyPart)
      console.log(JSON.stringify(dec))
      return dec
    },
    get currentDescriptions() {
      return store.possibleBugs
    },
    get hasFinished() {
      return store.finished
    },
    get getCurrentBodyPart() {
      return store.currentBodyPart
    },
    matchesCurrentBodyPart(bodyBart: BugBodyPart) {
      return store.currentBodyPart === bodyBart
    }
  })).actions((store) => ({
    updatePossibleBugs(bodyPartDescription: BodyPartDescription) {
      const trait = bodyPartDescription.indication_code
      console.log("In here")
      if (store.finished) {
        return
      }
      const possibleBugs = filterBugDescriptions(store.possibleBugs, store.currentBodyPart, trait)

      function itemsOnlyInOneList<T>(list1: T[], list2: T[]): T[] {
        return list1.filter(item => !list2.includes(item)).concat(list2.filter(item => !list1.includes(item)));
      }

      const result = itemsOnlyInOneList(store.possibleBugs, possibleBugs);
      result.forEach(d => store.removePossible(d as BugDescription))

      const index: number = bodyPartOderForDeterminer.indexOf(store.currentBodyPart)
      if (index >= bodyPartOderForDeterminer.length - 1) {
        store.setProp("finished", true)
      } else {
        store.setBodyPart(bodyPartOderForDeterminer[index + 1])
      }
      console.log(JSON.stringify(store.currentBodyPart))
    },
  }))

export interface BugDescriptionStore extends Instance<typeof BugDescriptionStoreModel> {
}

export interface BugDescriptionStoreSnapshot extends SnapshotOut<typeof BugDescriptionStoreModel> {
}
