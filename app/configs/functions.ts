import { Dimensions, Alert, Linking, Platform, ToastAndroid } from "react-native"
import { initialWindowMetrics } from "react-native-safe-area-context"
import moment from "moment"
import { colors } from "../assets"

const { width, height } = Dimensions.get("window")
const { width: widthScreen, height: heightScreen } = Dimensions.get("screen")
const deviceHeight = height - (initialWindowMetrics?.insets.top ?? 0)
export const responsiveHeight = (h: number): number => height * (h / 100)
export const WIDTH = (w: number): number => width * (w / 375)
export const HEIGHT = (h: number): number => deviceHeight * (h / 812)
export const WIDTH_SCREEN = (w: number): number => widthScreen * (w / 375)
export const HEIGHT_SCREEN = (h: number): number => heightScreen * (h / 812)
export const getWidth = (): number => width
export const getScreenWidth = (): number => widthScreen
export const getHeight = (): number => height
export const getScreenHeight = (): number => heightScreen
export const getLineHeight = (f: number): number => f
export const getHighAbsolute = (h: number): number => height * (h / 812)
export const getInsetVertical = (): number =>
  (initialWindowMetrics?.insets.top || 0) + (initialWindowMetrics?.insets.bottom || 0)

export const getFont = (f: number): number => {
  return RFValue(f)
}

export function RFPercentage(percent: number) {
  const heightPercent = (percent * (deviceHeight ?? 0)) / 100
  return Math.round(heightPercent)
}
export const formatTwoFigureNumber = (text: string) => {
  const formated = parseInt(text, 10) < 10 ? `0${text?.toString()}` : text?.toString()
  return formated
}
export const ARRAY_MONTH = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
]

export const ARRAY_DAY = ["Chủ Nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"]

export const ARRAY_SHORT_DAY = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"]
export function RFValue(fontSize: number) {
  const heightPercent =
    (((initialWindowMetrics?.insets.top ?? 0) > 20 ? fontSize : fontSize - 1) *
      (deviceHeight ?? 0)) /
    getHeight()
  return Math.round(heightPercent)
}

export const formatCurrency = (amount: number) => {
  // Kiểm tra xem amount có phải là số không
  if (typeof amount !== 'number') {
    // Nếu không phải là số, có thể thực hiện xử lý khác tùy vào yêu cầu của bạn
    return 'Invalid input';
  }

  // Sử dụng toLocaleString để định dạng số theo định dạng tiền tệ
  return amount.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
};

export const formatTimeVN = (dateTime: any) => {
  const time = new Date()
  const utcMoment = moment.utc(dateTime ?? time, "YYYY-MM-DDTHH:mm:ss.SS");
    // Chuyển đổi về múi giờ của Việt Nam (+7 giờ)
  const vietnamMoment = utcMoment.utcOffset(7);
  return vietnamMoment.format("HH:mm DD/MM/YYYY");
}

export const notifyMessage = (msg: string) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.TOP)
  }
}

export const formatString = (inputString: string) =>  {
  const formattedString = inputString.toLowerCase().replace(/\s+/g, '');

  return formattedString;
}