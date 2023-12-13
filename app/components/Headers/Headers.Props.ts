import { ViewStyle, TextStyle } from "react-native"
// import { IconTypes } from "../Icons/icons"

export interface HeaderProps {
  headerTx?: string
  headerText?: string
  leftIcon?: string
  onBack?(): void
  rightIcon?: string
  onCartPress?(): void
  onMessagePress?(): void
  onChangeText?(value: string): void
  onSubmit?(): void
  style?: ViewStyle
  titleStyle?: TextStyle
  searchText?: string
  isBack?: boolean
  isIconMessage?: boolean
  isIconCart?: boolean
  isIconFilter?: boolean
  numberCart?: number
  numberMessage?: number
  onPressInputSearch?: any
  typeInput?: string
  isFocusInput?: boolean
  isSearch?: boolean
  placeHolderInput?: string
  noBorder?: boolean
  quantityOfCart?: number
}
