import React from "react"
import { View, StyleSheet, ViewStyle, TextStyle } from "react-native"
import { Text } from "@ui-kitten/components"

import R from "../../assets/R"

type Props = {
  customStyle?: ViewStyle
  content?: string
  customTextStyle?: TextStyle
}

const ItemEmpty = (props: Props) => {
  const { customStyle, content, customTextStyle } = props
  return (
    <View style={[styles.container, customStyle]}>
      <Text category={"s1"} style={[styles.text, customTextStyle]}>
        {content || "Trống"}
      </Text>
    </View>
  )
}
export default ItemEmpty
const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
  },
  text: {
    color: R.colors.gray6,
    textAlign: "center",
  },
})
