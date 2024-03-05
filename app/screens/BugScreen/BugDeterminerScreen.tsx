import { FC, useEffect } from "react"
import { Text, Screen, Card, ListView } from "../../components"
import { DemoTabScreenProps } from "app/navigators/DemoNavigator"
import { TextStyle, View, ViewStyle } from "react-native"
import { colors, spacing } from "app/theme"
import { useStores } from "../../models"
import React from "react"
import { observer } from "mobx-react-lite"
import { BugDescription } from "app/models/BugDescription"



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
        {bugDescriptionStore.allDescriptionsForList.map(d => <TextyText key={d.genus} description={d} />)}
      </Screen>
    )
  }

const TextyText = observer(function BugDescriptionCard({
  description,
}: {
  description: BugDescription
}) {
  return <Text weight="bold">{JSON.stringify(description)}</Text>
})

const $container: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingHorizontal: spacing.lg,
}

const $description: TextStyle = {
  marginBottom: spacing.lg,
}

const $item: ViewStyle = {
  padding: spacing.md,
  marginTop: spacing.md,
  minHeight: 120,
}

const $metadata: TextStyle = {
  color: colors.textDim,
  marginTop: spacing.xs,
  flexDirection: "row",
}


const $metadataText: TextStyle = {
  color: colors.textDim,
  marginEnd: spacing.md,
  marginBottom: spacing.xs,
}
