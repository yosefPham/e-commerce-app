import { getWidth, HEIGHT, WIDTH } from "../configs/functions"
import colors from "../assets/colors"

const themes = {
  shadow: {
    shadowColor: colors.black0,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.84,
    elevation: 20.84,
  },
  datepicker: {
    borderWidth: 0,
    shadowColor: colors.black0,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.84,
    elevation: 1.84,
  },
  shadowGray: {
    shadowColor: colors.colorDEE3E6,
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 0.84,
  },
  hitSlop: {
    top: 12,
    left: 12,
    right: 12,
    bottom: 12,
  },
  empty: {
    marginVertical: HEIGHT(16),
    marginHorizontal: WIDTH(20),
  },
  gap: {
    height: HEIGHT(16),
  },
  list: {
    backgroundColor: colors.white,
    borderTopLeftRadius: WIDTH(24),
    borderTopRightRadius: WIDTH(24),
    marginTop: HEIGHT(16),
    width: getWidth(),
    paddingBottom: HEIGHT(16)
  },
}

export default themes
