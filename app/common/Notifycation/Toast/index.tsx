import React from "react"
import Toast, { ToastOptions } from "react-native-root-toast"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

import R from "../../../assets/R"
import { getWidth, WIDTH, getFont, getLineHeight } from "../../../configs/functions"
import { HEIGHT } from "./../../../configs/functions"

type ToastConfig = {
  title: string
  message?: string
  option?: ToastOptions
  type?: TypeToast
}

export enum TypeToast {
  WARNING = "WARNING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  SUCCESS_BUG = "SUCCESS_BUG",
  ERROR_BUG = "ERROR_BUG",
}

// const image = {
//   warn: require("./assests/Warning.png"),
//   error: require("./assests/Error.png"),
//   success: require("./assests/Success.png"),
// }

const getColor = (type: TypeToast) => {
  switch (type) {
    case TypeToast.WARNING:
      return R.colors.yellowd200
    case TypeToast.ERROR:
      return R.colors.redab
    default:
      return R.colors.green56
  }
}

const getIcon = (type: TypeToast) => {
  switch (type) {
    case TypeToast.ERROR_BUG:
      return "ic_incorrect_answer"
    case TypeToast.SUCCESS_BUG:
      return "ic_correct_answer"
    default:
      return "ic_correct_answer"
  }
}

const getStyle = (type: TypeToast) => {
  switch (type) {
    case TypeToast.ERROR_BUG:
      return styles.viewToastError
    case TypeToast.SUCCESS_BUG:
      return styles.viewToastSuccess
    default:
      return styles.viewToastSuccess
  }
}

// const getImage = (type: TypeToast) => {
//   switch (type) {
//     case TypeToast.WARNING:
//       return image.warn
//     case TypeToast.ERROR:
//       return image.error
//     default:
//       return image.success
//   }
// }

export const showToast = (toastConfig: any) => {
  let toast: any = null
  const ToastComponent = (
    <View style={{width: WIDTH(100), height: HEIGHT(100), backgroundColor: R.colors.gray0}}>
      <Text>oke mà</Text>
      <View style={[styles.bage, { backgroundColor: getColor(toastConfig?.type) }]} />
      <View style={styles.content}>
        <View>
          <Text style={[styles.title, { color: getColor(toastConfig?.type) }]}>
            {toastConfig.title}
          </Text>
          {toastConfig.message && <Text style={styles.message}>{toastConfig.message}</Text>}
        </View>
      </View>
    </View>
  )
  const ToastBug = (
    <View style={getStyle(toastConfig.type)}>
      <Text style={styles.textToast}>{toastConfig.message}</Text>
      <TouchableOpacity activeOpacity={1} onPress={() => Toast.hide(toast)}>
        <Text style={styles.textClose}>X</Text>
      </TouchableOpacity>
    </View>
  )
  if (toastConfig.type === TypeToast.SUCCESS_BUG || toastConfig.type === TypeToast.ERROR_BUG) {
    toast = Toast.show(
      ToastBug as unknown as string, // toast not support type script, use this trick to bypass
      {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        shadow: false,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: "transparent",
        opacity: 1,
        containerStyle: styles.containerStyle,
        ...toastConfig.option,
      },
    )
  } else {
    toast = Toast.show(
      ToastComponent as unknown as string, // toast not support type script, use this trick to bypass
      {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        shadow: false,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: "transparent",
        opacity: 1,
        containerStyle: styles.containerStyle,
        ...toastConfig.option,
      },
    )
  }
}

const styles = StyleSheet.create({
  bage: {
    alignSelf: "center",
    height: 5,
    width: WIDTH(320),
  },
  container: {
    backgroundColor: R.colors.white,
    borderBottomLeftRadius: WIDTH(5),
    borderBottomRightRadius: WIDTH(5),
    elevation: 3,
    flex: 1,
    minHeight: HEIGHT(80),
    paddingHorizontal: WIDTH(15),
    shadowColor: R.colors.black0,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    width: WIDTH(320),
    height: WIDTH(100)
  },
  containerStyle: { alignItems: "center", justifyContent: "center", width: getWidth() },
  content: { flexDirection: "row", justifyContent: "space-between" },
  img: {
    height: HEIGHT(70),
    width: WIDTH(70),
  },
  message: {
    marginBottom: HEIGHT(10),
    marginVertical: HEIGHT(6),
    width: WIDTH(240),
  },
  textClose: {
    color: R.colors.border,
    fontSize: getFont(20),
    marginLeft: WIDTH(8),
  },
  textToast: {
    color: R.colors.black0,
    fontFamily: R.fonts.OpenSansRegular,
    fontSize: getFont(16),
    lineHeight: getLineHeight(24),
    marginLeft: WIDTH(8),
    width: WIDTH(247),
  },
  textToastColor: {
    color: R.colors.black0,
    fontFamily: R.fonts.OpenSansRegular,
    fontSize: getFont(16),
    lineHeight: getLineHeight(24),
  },
  title: {
    color: R.colors.green600,
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: HEIGHT(6),
  },
  viewToastError: {
    alignItems: "center",
    backgroundColor: R.colors.white,
    borderBottomLeftRadius: WIDTH(8),
    borderLeftColor: R.colors.red400,
    borderLeftWidth: WIDTH(8),
    borderRadius: WIDTH(8),
    borderTopLeftRadius: WIDTH(8),
    flexDirection: "row",
    paddingLeft: WIDTH(12),
    paddingVertical: HEIGHT(16),
    width: WIDTH(343),
  },
  viewToastSuccess: {
    alignItems: "center",
    backgroundColor: R.colors.white,
    borderBottomLeftRadius: WIDTH(8),
    borderLeftColor: R.colors.green7,
    borderLeftWidth: WIDTH(8),
    borderRadius: WIDTH(8),
    borderTopLeftRadius: WIDTH(8),
    flexDirection: "row",
    paddingLeft: WIDTH(12),
    paddingVertical: HEIGHT(16),
    width: WIDTH(343),
    height: HEIGHT(30)
  },
})
