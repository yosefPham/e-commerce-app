import { getFont, getLineHeight, WIDTH } from './../../configs/functions'
import { StyleSheet } from "react-native"
import R from "../../assets/R"
import { HEIGHT } from "../../configs/functions"

const styles = StyleSheet.create({
  container: {
    backgroundColor: R.colors.gray0,
    width: "100%",
    flex: 1,
  },
  // flex: {
  //   alignItems: "center",
  //   flex: 1,
  //   paddingBottom: HEIGHT(16),
  // },
  flex: {
    alignItems: "center",
    flex: 1,
    paddingVertical: WIDTH(10),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  gap: {
    height: HEIGHT(5),
    margin: 0
  },
  icon: {
    height: WIDTH(22),
    width: WIDTH(22),
  },
  iconscale1: {
    height: WIDTH(27),
    width: WIDTH(27),
  },
  iconscale2: {
    height: WIDTH(24),
    width: WIDTH(24),
  },
  // row: {
  //   alignItems: "flex-end",
  //   // backgroundColor: R.colors.white,
  //   flex: 1,
  //   justifyContent: "space-around",
  // },
  row: {
    alignItems: "flex-end",
    flex: 1,
    justifyContent: "space-around",
    borderBottomWidth: WIDTH(0.5),
    borderBottomColor: R.colors.borderD,
  },
  // tabContainer: {
  //   backgroundColor: R.colors.white,
  //   paddingTop: HEIGHT(12),
  // },
  tabContainer: {
    backgroundColor: R.colors.white,
    // paddingBottom: HEIGHT(16),
    paddingTop: HEIGHT(8),
  },
  // text: {
  //   color: R.colors.gray5,
  // },
  text: {
    color: R.colors.gray5,
    // fontFamily: R.fonts.InterMedium,
    fontSize: getFont(12),
    fontWeight: "500",
    lineHeight: getLineHeight(16),
    // paddingBottom: HEIGHT(16),
    paddingTop: HEIGHT(5),
  },

})

export default styles
