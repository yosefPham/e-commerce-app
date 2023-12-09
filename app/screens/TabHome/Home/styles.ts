import { getFont, getLineHeight, getWidth, WIDTH } from './../../../configs/functions'
import { StyleSheet } from "react-native"
import R from "../../../assets/R"
import { HEIGHT } from "../../../configs/functions"

const styles = StyleSheet.create({
  columnWrapperStyle: { justifyContent: "flex-start"},
  list: {
    width: getWidth(),
    backgroundColor: R.colors.gray1,
    paddingHorizontal: WIDTH(5),
    paddingVertical: HEIGHT(10)
  },
  gap: {
    paddingTop: HEIGHT(10),
    backgroundColor: R.colors.white,
    height: HEIGHT(40),
    // alignItems: 'center',
    width: WIDTH(365),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    color: R.colors.primary, 
    fontSize: getFont(20), 
    fontWeight: "700",
    marginHorizontal: WIDTH(5),
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: WIDTH(3),
    width: WIDTH(150),
    height: HEIGHT(210),
    backgroundColor: R.colors.white,
    marginVertical: HEIGHT(10),
    borderColor: R.colors.borderD,
    borderWidth: 1,
  },
  containerImage: {
    width: WIDTH(150),
    height: HEIGHT(150),
    margin: 0,
    padding: 0
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  footer: {
    width: '100%',
    marginTop: HEIGHT(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewMore: {
    fontSize: getFont(18),
    flexDirection: 'row',
    alignItems: 'center',
  },
  countdown: {
    color: R.colors.white,
    backgroundColor: R.colors.black0,
    fontSize: getFont(16),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    fontWeight: '600',
  },
  flashIcon: {
  },
  containerFlashSale: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
  },
  quantitySold: {
    borderRadius: WIDTH(40),
    overflow: 'hidden',
    width: WIDTH(120),
    height: HEIGHT(20),
    marginTop: HEIGHT(10),
    color: R.colors.white,
    alignItems: 'center',
    position: 'relative',
  },
  viewAll: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: WIDTH(3),
    width: WIDTH(150),
    height: HEIGHT(210),
    backgroundColor: R.colors.white,
    marginVertical: HEIGHT(10),
  }
})

export default styles
