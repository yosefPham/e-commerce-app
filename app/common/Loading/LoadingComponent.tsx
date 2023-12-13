import React from "react"
import {View, Image, StyleSheet, StyleProp, ViewStyle, ImageStyle, ActivityIndicator} from "react-native"
import * as Animatable from 'react-native-animatable';

import R from "../../assets/R"
import { getHeight, getWidth, HEIGHT, WIDTH } from "../../configs/functions"

type Props = {
  isLoading: boolean
  style?: StyleProp<ViewStyle>,
  styleChildren?: StyleProp<ViewStyle>,
  styleLoadingImage?: StyleProp<ImageStyle>,
  children?: React.ReactNode
}

const LoadingComponent = (props: Props) => {
  const { style, isLoading,children,styleLoadingImage,styleChildren } = props
  if (!isLoading) return null
  return (
    <View style={[styles.loadingContainer, StyleSheet.absoluteFill, style]}>
      <ActivityIndicator size={35} color={R.colors.black0}/>
      <View style={[styles.children, styleChildren]}>
        {children}
      </View>
    </View>
  )
}

export default LoadingComponent

const styles = StyleSheet.create({
  loading: {
    height: WIDTH(50),
    width: WIDTH(50),
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  children: {

  }
})
