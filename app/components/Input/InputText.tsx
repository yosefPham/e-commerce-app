import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import R from "../../assets/R";
import { ViewStyle } from "react-native";
import { getFont, HEIGHT, WIDTH } from "../../configs/functions";
import { TextStyle } from "react-native";
import Clipboard from '@react-native-clipboard/clipboard';
type Props = {
    headerText?: string;
    nameIcon?: string;
    colorIcon?: string;
    sizeIcon?: number;
    placeholder?: string;
    customStyle?: ViewStyle;
    customInputStyle?: TextStyle;
    isPassword?: boolean;
    value?: string;
    onChangeValue?: (value: any) => void
    disabled?: boolean;
    defaultValue?: string;
    isNumber?: boolean;
    required?: boolean;
    isCopyText?: boolean;
}
const HEADER_TEXT: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: HEIGHT(50),
    // borderColor: R.colors.border,
    // borderBottomWidth: WIDTH(1),
    backgroundColor: R.colors.white,
    paddingHorizontal: WIDTH(10),
};
const InputText = ({ nameIcon, isNumber, required, colorIcon, sizeIcon, placeholder, customStyle, customInputStyle, isPassword, onChangeValue, value, headerText, disabled, defaultValue, isCopyText } : Props) => {
    const [valueInput, setValue] = useState<string>('')
    const onChangeText = (value: string) => {
        setValue(value)
        onChangeValue && onChangeValue(value)
    }
    const handleCopyToClipboard = () => {
        alert('Đã sao chép vào clipboard');
        // Clipboard.setString('hello world');
        // alert('Đã sao chép vào clipboard');
      };
    return (
        <View style={[headerText ? HEADER_TEXT : {backgroundColor: R.colors.white}, customStyle]}>
            {headerText && <Text style={{minWidth: WIDTH(110), fontSize: getFont(16)}}>{headerText} {required && <Text style={{color: R.colors.red500}}>*</Text>}</Text>}
            <View style={[styles.formInput]}>
                <View style={styles.icon}>
                    <Icon name={nameIcon ?? ''} color={colorIcon ?? R.colors.primary} size={sizeIcon ?? 20}/>
                </View>
                {isCopyText && 
                <TouchableOpacity onPress={handleCopyToClipboard} style={{marginRight: WIDTH(5)}}>
                    <Icon name='copy' color={R.colors.black50p} size={25}/>
                </TouchableOpacity>}
                {disabled ? <Text style={[styles.disable, customInputStyle]}>{defaultValue}</Text> :
                <TextInput
                    keyboardType={isNumber ? "numeric" : "default"}
                    value={value}
                    secureTextEntry={isPassword} 
                    placeholder={placeholder ?? 'Nhập vào'} 
                    style={[styles.input, customInputStyle]}
                    onChangeText={(text) => onChangeText(text)}
                    defaultValue={defaultValue}
                />}
            </View>
        </View>
    )
}

export default InputText

const styles = StyleSheet.create({
    formInput: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: HEIGHT(50),
        borderColor: R.colors.border,
        borderBottomWidth: WIDTH(0.5),
    },
    input: {
        width: '100%',
    },
    icon: {
        marginRight: WIDTH(10),
    },
    disable: {
        width: '100%',
    }
})