import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { csvReader } from "../services/csv"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { BugDescriptionModel } from "./BugDescription"
import { mapSimpleDescriptionsToFullDescriptions } from "./helpers/bugDescriptionMapper"

export interface SimpleDescription {
    genus: string
    body_part: string
    indication_text: string
    indication_code: string
    picture_name: string
}

export const BugDescriptionStoreModel = types
    .model("BugDescriptionStore")
    .props({
        allDescriptions: types.array(BugDescriptionModel),
        possibleBugs: types.array(BugDescriptionModel),
        removedBugs: types.array(BugDescriptionModel),
    })
    .actions(withSetPropAction)
    .actions((store) => ({
        async getDescriptions() {
            const data = await csvReader.readCsvText<SimpleDescription>()
            store.setProp("allDescriptions", mapSimpleDescriptionsToFullDescriptions(data))
        },
        // addFavorite(episode: Episode) {
        //     store.favorites.push(episode)
        // },
        // removeFavorite(episode: Episode) {
        //     store.favorites.remove(episode)
        // },
    }))
.views((store) => ({
    get allDescriptionsForList() {
        return store.allDescriptions
    },

    // hasFavorite(episode: Episode) {
    //     return store.favorites.includes(episode)
    // },
}))
// .actions((store) => ({
//     toggleFavorite(episode: Episode) {
//         if (store.hasFavorite(episode)) {
//             store.removeFavorite(episode)
//         } else {
//             store.addFavorite(episode)
//         }
//     },
// }))

export interface BugDescriptionStore extends Instance<typeof BugDescriptionStoreModel> { }
export interface BugDescriptionStoreSnapshot extends SnapshotOut<typeof BugDescriptionStoreModel> { }
