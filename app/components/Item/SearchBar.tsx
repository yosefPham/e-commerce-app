import React, {useEffect, useRef, useState} from "react"
import {StyleProp, StyleSheet, TextInput, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
// config
// import { translate } from "@i18n"
import R from "../../assets/R"
import { getFont, HEIGHT, WIDTH } from "../../configs/functions"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../../assets/colors";
import { E_TYPE_INPUT } from "../../types/emuns"
import { useNavigation } from "@react-navigation/native"

type Props = {
  value: string
  onChangeText?: (arg: string) => void
  placeHolder?: string
  style?: StyleProp<ViewStyle>
  inputStyle?: StyleProp<TextStyle>
  rightIcon?: boolean
  onPressInputSearch?: any
  type?: string
  isFocusInput?: boolean
  onSubmit?: () => void
}

const BORDER: ViewStyle = { borderColor: R.colors.primary, borderWidth: 0.5, backgroundColor: R.colors.white }

const SearchBar: React.FC<Props> = (props: Props) => {
  const navigation = useNavigation();
  const { value, placeHolder, style, rightIcon, onChangeText, inputStyle, onPressInputSearch, type, isFocusInput, onSubmit} = props
  const [inputVal, setInputVal] = useState<string>("");
  useEffect(() => {
      setInputVal(value)
  }, [value]);
  const inputRef = useRef(null);

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      // isFocusInput && inputRef?.current?.focus();
    });
    return focusListener;
  }, []);
  return (
    <TouchableOpacity activeOpacity={type === E_TYPE_INPUT.BORDER ? 1 : 0.7} style={[styles.searchContainer, style, type === E_TYPE_INPUT.BORDER && BORDER]} onPress={() => onPressInputSearch && onPressInputSearch()}>
      {type !== E_TYPE_INPUT.BORDER && <View style={styles.iconSearch}>
        <Icon name={"search"} size={WIDTH(20)} color={R.colors.black30p} />
      </View>}
      <TextInput
        ref={inputRef}
        value={inputVal}
        placeholder={placeHolder ?? "Tìm kiếm"}
        placeholderTextColor={R.colors.primary}
        style={styles.textInput}
        onChangeText={(newVal)=>{
          setInputVal(newVal);
          if (!!onChangeText){
            onChangeText(newVal);
          }
        }}
        onSubmitEditing={onSubmit}
        onFocus={() => onPressInputSearch && onPressInputSearch()}
        cursorColor={R.colors.primary}
      />
      {type === E_TYPE_INPUT.BORDER && <TouchableOpacity style={styles.iconSearchSharp}>
        <Icon name={"search"} size={WIDTH(20)} color={R.colors.white} />
      </TouchableOpacity>}
      {typeof inputVal === "string" && inputVal.trim() !== "" && 
        <TouchableOpacity 
          onPress={()=>{
            setInputVal("");
            if (!!onChangeText) {
              onChangeText("")
            }
          }}
          style={[styles.clearBtn, type === E_TYPE_INPUT.BORDER && { right: 40} ]}
        >
          <MaterialCommunityIcons name={"close-circle"} size={20} color={R.colors.black30p}/>
      </TouchableOpacity>}
    </TouchableOpacity>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  isSearch: {
    height: WIDTH(24),
    width: WIDTH(24),
    position: "absolute",
    left: 2
  },
  iconSearchSharp: {
    paddingHorizontal: WIDTH(9),
    backgroundColor: R.colors.primary,
    paddingVertical: HEIGHT(9),
  },
  searchContainer: {
    alignItems: "center",
    alignSelf: "center",
    position: 'relative',
    backgroundColor: R.colors.borderE70p,
    flexDirection: "row",
    justifyContent: "space-between",
    height: HEIGHT(40),
    width: WIDTH(265),
  },
  textInput: {
    fontSize: getFont(16),
    flex: 1,
    paddingLeft: 10,
    paddingRight: 25,
    color: Colors.black0,
    alignItems: "center",
  },
  clearBtn:{
    position: "absolute",
    right: 5
  },
  iconSearch: {
    marginLeft: WIDTH(10)
  }
})
