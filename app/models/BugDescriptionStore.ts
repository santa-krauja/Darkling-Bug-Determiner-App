import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { csvReader } from "../services/csv"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { BugDescription, BugDescriptionModel } from "./BugDescription"
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
        allDescriptions: types.map(BugDescriptionModel),
        possibleBugs: types.array(types.reference(BugDescriptionModel)),
        removedBugs: types.array(types.reference(BugDescriptionModel)),
    })
    .actions(withSetPropAction)
    .actions((store) => ({
        async getDescriptions() {
            const data = await csvReader.readCsvFile<SimpleDescription>('assets/indications.csv')

            mapSimpleDescriptionsToFullDescriptions(data)
                .forEach((v,k) => store.allDescriptions.set(k,v))

        },
        // addFavorite(episode: Episode) {
        //     store.favorites.push(episode)
        // },
        // removeFavorite(episode: Episode) {
        //     store.favorites.remove(episode)
        // },
    }))
    // .views((store) => ({
    //     get episodesForList() {
    //         return store.favoritesOnly ? store.favorites : store.episodes
    //     },

    //     hasFavorite(episode: Episode) {
    //         return store.favorites.includes(episode)
    //     },
    // }))
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
