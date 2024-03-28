import React from "react"
import { Image, ImageSourcePropType, ImageStyle, StyleProp, View, ViewStyle } from "react-native"
import { ImageResizeMode } from "react-native/Libraries/Image/ImageResizeMode"

const IMG_BASE_PATH = "../../assets/images/determiner"
export type ImageRegistry = keyof typeof imageRegistry

interface ImageViewProps {
  style?: StyleProp<ImageStyle>,
  imageName: ImageRegistry,
  resizeMode?: ImageResizeMode,
}

export function ImageView(props: ImageViewProps) {
  const imageUri: string = imageRegistry[props.imageName] || imageRegistry.default
  // This type check is necessary...
  const imageSource: ImageSourcePropType = typeof imageUri === "string" ? { uri: imageUri } : imageUri

  return <View style={$parentComponent}>
    <Image source={imageSource} style={props.style} resizeMode={props.resizeMode} />
  </View>
}

export const imageRegistry: { [key: string]: string } = {
  default: require("../../assets/images/demo/rnr-image-2.png"),
  "cob-shaped": require(`${IMG_BASE_PATH}/cob-shaped.png`),
  "type-3": require(`${IMG_BASE_PATH}/type-3.png`),
  "type-34": require(`${IMG_BASE_PATH}/type-34.png`),
}

const $parentComponent: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}