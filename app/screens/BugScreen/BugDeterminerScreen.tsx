import { FC, useEffect } from "react"
import { Text, Screen } from "../../components"
import { DemoTabScreenProps } from "app/navigators/DemoNavigator"
import { TextStyle, ViewStyle } from "react-native"
import { spacing } from "app/theme"
import { useStores } from "../../models"
import React from "react"



export const BugDeterminerScreen: FC<DemoTabScreenProps<"BugDeterminer">> =
  function BugDeterminerScreen(_props) {
    const { bugDescriptionStore } = useStores()

    const [refreshing, setRefreshing] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    useEffect(() => {
      ; (async function load() {
        setIsLoading(true)
        await bugDescriptionStore.getDescriptions()
        setIsLoading(false)
      })()
    }, [bugDescriptionStore])

    return (
      <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["top"]}>
        <Text tx="bugDeterminerScreen.test" style={$description} />
        <Text style={$description} >{JSON.stringify(bugDescriptionStore.allDescriptions)}</Text>
      </Screen>
    )
  }

const $container: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingHorizontal: spacing.lg,
}

const $description: TextStyle = {
  marginBottom: spacing.lg,
}