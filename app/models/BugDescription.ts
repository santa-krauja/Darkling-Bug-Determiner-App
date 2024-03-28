import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
// import BodyPart from "../services/determiner/BugBodyPart"

export interface BodyPartDescription {
  indication_text: string
  indication_code: string
  picture_name: string
}

export const BugDescriptionModel = types
  .model("BugDescription")
  .props({
    genus: types.identifier,
    leg: types.frozen<BodyPartDescription>(),
    head: types.frozen<BodyPartDescription>(),
    tentacles: types.frozen<BodyPartDescription>(),
    front_wings: types.frozen<BodyPartDescription>(),
    fore_chest: types.frozen<BodyPartDescription>(),

/*     [BodyPart.LEG]: types.frozen<BodyPartDescription>(),
    [BodyPart.HEAD]: types.frozen<BodyPartDescription>(),
    [BodyPart.TENTACLES]: types.frozen<BodyPartDescription>(),
    [BodyPart.FRONT_WINGS]: types.frozen<BodyPartDescription>(),
    [BodyPart.FORE_CHEST]: types.frozen<BodyPartDescription>(), */

  })
  .actions(withSetPropAction)


export interface BugDescription extends Instance<typeof BugDescriptionModel> {
}

export interface BugDescriptionOut extends SnapshotOut<typeof BugDescriptionModel> {
}

export interface BugDescriptionIn extends SnapshotIn<typeof BugDescriptionModel> {
}
