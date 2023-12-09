import { getFont, getLineHeight, getWidth, WIDTH } from './../../configs/functions'
import { StyleSheet } from "react-native"
import R from "../../assets/R"
import { HEIGHT } from "../../configs/functions"

const styles = StyleSheet.create({
  container: {
    backgroundColor: R.colors.gray0,
    width: "100%",
    flex: 1,
  },
  flex: {
    alignItems: "center",
    flex: 1,
    paddingVertical: HEIGHT(10),
    paddingHorizontal: WIDTH(10),
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
  row: {
    // alignItems: "flex-end",
    // flex: 1,
    // justifyContent: "space-around",
    // paddingHorizontal: WIDTH(1),
    borderBottomWidth: WIDTH(0.5),
    borderBottomColor: R.colors.borderD,
  },
  tabContainer: {
    backgroundColor: R.colors.white,
    paddingTop: HEIGHT(8),
  },
  text: {
    color: R.colors.gray5,
    fontSize: getFont(12),
    fontWeight: "500",
    lineHeight: getLineHeight(16),
    paddingTop: HEIGHT(5),
  },
  buttonText: {
    width: '100%',
    height: HEIGHT(45),
    marginVertical: HEIGHT(2),
  },
  columnWrapperStyle: { justifyContent: "flex-start"},
    list: {
      width: getWidth(),
      backgroundColor: R.colors.gray1,
      paddingHorizontal: WIDTH(5),
      paddingVertical: HEIGHT(10)
    },

})

export default styles
