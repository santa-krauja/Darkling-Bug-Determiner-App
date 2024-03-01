import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export interface BodyPartDescritpion {
    indication_text: string
    indication_code: string
    picture_name: string
}

export const BugDescriptionModel = types
    .model("Episode")
    .props({
        genus: "",
        head: types.frozen<BodyPartDescritpion>(),
        leg: types.frozen<BodyPartDescritpion>(),
        tentacles: types.frozen<BodyPartDescritpion>(),
        front_wings: types.frozen<BodyPartDescritpion>(),
        fore_chest: types.frozen<BodyPartDescritpion>(),
    })
    .actions(withSetPropAction)


export interface BugDescription extends Instance<typeof BugDescriptionModel> { }
export interface EpisodeSnapshotOut extends SnapshotOut<typeof BugDescriptionModel> { }
export interface EpisodeSnapshotIn extends SnapshotIn<typeof BugDescriptionModel> { }
