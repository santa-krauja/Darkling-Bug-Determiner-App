import React, { ComponentType, FC, useEffect, useMemo } from "react"
import { Button, ButtonAccessoryProps, Card, EmptyState, ListView, Screen, Text } from "app/components"
import { DemoTabScreenProps } from "app/navigators/DemoNavigator"
import {
  ActivityIndicator, Dimensions,
  ImageStyle,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { colors, spacing } from "app/theme"
import { useStores } from "app/models"
import { observer } from "mobx-react-lite"
import { BodyPartDescription } from "app/models/BugDescription"
import { isRTL, translateBodyPart } from "app/i18n"
import type { ContentStyle } from "@shopify/flash-list"
import { delay } from "app/utils/delay"
import { BugDescriptionStore } from "app/models/BugDescriptionStore"
import { ImageView } from "app/components/ImageView"

const windowWidth = Dimensions.get("window").width

export const BugDeterminerScreen: FC<DemoTabScreenProps<"BugDeterminer">> =
  function BugDeterminerScreen(_props) {
    const { bugDescriptionStore } = useStores()

    const [refreshing, setRefreshing] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    async function manualRefresh() {
      setRefreshing(true)
      await Promise.all([bugDescriptionStore.getDescriptions(), delay(750)])
      setRefreshing(false)
    }

    useEffect(() => {
      (async function load() {
        setIsLoading(true)
        await bugDescriptionStore.getDescriptions()
        setIsLoading(false)
      })()
    }, [bugDescriptionStore])


    return (
      <Screen preset="fixed"
              safeAreaEdges={["top"]}
              contentContainerStyle={$screenContentContainer}>
        <Button
          onPress={manualRefresh}
          style={$favoriteButton}>Reload</Button>
        <BugDescriptionList bugDescriptionStore={bugDescriptionStore}
                            refreshing={refreshing}
                            manualRefresh={manualRefresh}
                            isLoading={isLoading} />
      </Screen>
    )
  }

const BugDescriptionList = observer(function BugDescriptionList(
  {
    bugDescriptionStore,
    refreshing,
    manualRefresh,
    isLoading,
  }: {
    bugDescriptionStore: BugDescriptionStore,
    refreshing: boolean,
    manualRefresh: () => void,
    isLoading: boolean,
  }) {

  if (bugDescriptionStore.hasFinished) {
    return <Text>Atrastais kukainis ir {bugDescriptionStore.possibleBugs[0].genus} ģints</Text>
  }

  return <ListView<BodyPartDescription>
    contentContainerStyle={$listContentContainer}
    data={bugDescriptionStore.currentBodyPartDescriptions.slice()}
    extraData={bugDescriptionStore.currentBodyPart}
    refreshing={refreshing}
    estimatedItemSize={177}
    onRefresh={manualRefresh}
    ListEmptyComponent={
      isLoading ? (
        <ActivityIndicator />
      ) : (
        <EmptyState
          preset="generic"
          style={$emptyState}
          headingTx={"demoPodcastListScreen.noFavoritesEmptyState.heading"}
          contentTx={"demoPodcastListScreen.noFavoritesEmptyState.content"}
          button={""}
          buttonOnPress={manualRefresh}
          imageStyle={$emptyStateImage}
          ImageProps={{ resizeMode: "contain" }}
        />
      )
    }
    ListHeaderComponent={
      <View style={$heading}>
        <Text preset="heading" tx="bugDeterminerScreen.title" />
        <Text preset="subheading">{translateBodyPart(bugDescriptionStore.currentBodyPart)}</Text>
      </View>
    }
    renderItem={({ item }) => (
      <BugDescriptionCard
        description={item}
        onPressChoose={() => {
          bugDescriptionStore.updatePossibleBugs(item)
        }
        }
      />
    )}
  />
})

const BugDescriptionCard = observer(function BugDescriptionCard({
                                                                  description,
                                                                  onPressChoose,
                                                                }: {
  description: BodyPartDescription,
  onPressChoose: () => void,
}) {

  // const imageUri = useMemo<ImageSourcePropType>(() => {
  //   return require(IMG_BASE_PATH + description.picture_name)
  // }, [])


  /**
   * Android has a "longpress" accessibility action. iOS does not, so we just have to use a hint.
   * @see https://reactnative.dev/docs/accessibility#accessibilityactions
   */
    // const accessibilityHintProps = useMemo(
    //   () =>
    //     Platform.select<AccessibilityProps>({
    //       ios: {
    //         accessibilityLabel: description.indication_code,
    //         // accessibilityHint: translate("demoPodcastListScreen.accessibility.cardHint", {
    //         //   action: isFavorite ? "unfavorite" : "favorite",
    //         // }),
    //       },
    //       android: {
    //         accessibilityLabel: description.indication_code,
    //         accessibilityActions: [
    //           {
    //             name: "longpress",
    //             label: translate("demoPodcastListScreen.accessibility.favoriteAction"),
    //           },
    //         ],
    //         onAccessibilityAction: ({ nativeEvent }) => {
    //           if (nativeEvent.actionName === "longpress") {
    //             handleChooseTrait()
    //           }
    //         },
    //       },
    //     }),
    //   [description],//, isFavorite],
    // )

    // const handlePressFavorite = () => {
    //   onPressChoose()
    //   liked.value = withSpring(liked.value ? 0 : 1)
    // }
  const handleChooseTrait = () => {
      onPressChoose()
    }

  const handlePressCard = () => {
    // TODO show larger picture
    console.log("Show bigger picture")
  }

  const ButtonLeftAccessory: ComponentType<ButtonAccessoryProps> = useMemo(
    () =>
      function ButtonLeftAccessory() {
        return (
          <View>
          </View>
        )
      },
    [],
  )


  return (
    <Card
      style={$item}
      verticalAlignment="force-footer-bottom"
      onPress={handlePressCard}
      onLongPress={handleChooseTrait}
      HeadingComponent={
        <View style={$metadata}>
          <Text
            style={$metadataText}
            size="md"
            accessibilityLabel={description.indication_code}
          >
            {description.indication_text}
          </Text>
        </View>
      }
      ContentComponent={<View style={$parentComponent}><ImageView imageName={description.picture_name}
                                                                  style={$itemThumbnail}
                                                                  resizeMode="contain" /></View>}
      FooterComponent={
        <Button
          onPress={handleChooseTrait}
          // onLongPress={handleChooseTrait}
          style={$favoriteButton}
          LeftAccessory={ButtonLeftAccessory}
        >
          <Text
            size="md"
            accessibilityLabel="choose-button"
            weight="medium"
            tx={"bugDeterminerScreen.choose_this"}
          />
        </Button>
      }
    />
  )
})

const $item: ViewStyle = {
  padding: spacing.md,
  marginTop: spacing.md,
  minHeight: 120,
  flex: 1, // Ensure the parent container occupies the entire screen or available space
  justifyContent: "center",
  alignItems: "center",
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
const $parentComponent: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}
const $itemThumbnail: ImageStyle = {
  marginTop: spacing.sm,
  alignSelf: "flex-start",
  width: windowWidth * 0.8,
  height: undefined,
  aspectRatio: 1,
}
const $favoriteButton: ViewStyle = {
  borderRadius: 17,
  marginTop: spacing.md,
  justifyContent: "flex-start",
  backgroundColor: colors.palette.neutral300,
  borderColor: colors.palette.neutral300,
  paddingHorizontal: spacing.md,
  paddingTop: spacing.xxxs,
  paddingBottom: 0,
  minHeight: 32,
  alignSelf: "flex-start",
}

const $emptyState: ViewStyle = {
  marginTop: spacing.xxl,
}

const $emptyStateImage: ImageStyle = {
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $listContentContainer: ContentStyle = {
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.lg,
}

const $heading: ViewStyle = {
  marginBottom: spacing.md,
}

const $screenContentContainer: ViewStyle = {
  flex: 1,
}