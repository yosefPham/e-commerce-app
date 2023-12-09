/* eslint-disable react-native/no-inline-styles */
import React from "react"

import { View, ActivityIndicator } from "react-native"
import { getWidth, HEIGHT } from "./../../configs/functions"
import R from "./../../assets/R"

type Props = {
  padding?: number
  color?: string
}

const Loading: React.FC<Props> = (props: Props) => {
  const {padding, color} = props
  return (
    <View
      style={{
        padding: padding || HEIGHT(10),
        alignSelf: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size={"small"} color={color ?? R.colors.grey1000} />
    </View>
  )
}

export default Loading
