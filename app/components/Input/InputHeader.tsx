import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TextStyle, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import R from "../../assets/R";
import { ViewStyle } from "react-native";
import { getFont, HEIGHT, WIDTH } from "../../configs/functions";

type Props = {
    headerText: string;
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
    customHeader?: ViewStyle;
    isMoney?: boolean;
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
const InputHeader = ({ 
    nameIcon, 
    isNumber, 
    required, 
    colorIcon, 
    sizeIcon, 
    placeholder, 
    customStyle, 
    customInputStyle, 
    isPassword, 
    onChangeValue, 
    value, 
    headerText, 
    disabled, 
    defaultValue,
    customHeader,
    isMoney
} : Props) => {
    const [valueInput, setValue] = useState<string>(value ?? '');
    const onChangeText = (value: string) => {
        if (isMoney) {
            if (value.length <= 2) {
                const formattedValue = formatCurrency("0");
                setValue(formattedValue);
            } else {
                const formattedValue = formatCurrency(value);
                setValue(formattedValue);
            }
            let val = value
            if (value.length <= 2) {
                val = "0"
            }
            const numericValue = val.replace(/[đ.]/g, '');
            const numberValue = parseInt(numericValue, 10);
            onChangeValue && onChangeValue(numberValue)
        } else {
            setValue(value)
            onChangeValue && onChangeValue(value)
        }
    }

    const formatCurrency = (inputValue: string) => {
        const numericValue = inputValue.replace(/[^0-9]/g, '');

    
        const numberValue = parseInt(numericValue ?? 0, 10);
        const formattedValue = `\u0111 ${numberValue.toLocaleString('vi-VN')}`;
    
        return formattedValue;
    };
    return (
        <View style={[{paddingHorizontal: WIDTH(10),borderColor: R.colors.border,borderBottomWidth: WIDTH(0.5), paddingVertical: HEIGHT(20)}, customStyle]}>
            <Text style={[{minWidth: WIDTH(110), fontSize: getFont(16)}, customHeader]}>{headerText} {required && <Text style={{color: R.colors.red500}}>*</Text>}</Text>
            <View style={[styles.formInput]}>
                {/* <View style={styles.icon}>
                    <Icon name={nameIcon ?? ''} color={colorIcon ?? R.colors.primary} size={sizeIcon ?? 20}/>
                </View> */}
                <TextInput
                    keyboardType={isNumber ? "numeric" : "default"}
                    value={valueInput}
                    secureTextEntry={isPassword} 
                    placeholder={placeholder ?? 'Nhập vào'} 
                    style={[styles.input, customInputStyle]}
                    onChangeText={(text) => onChangeText(text)}
                    defaultValue={defaultValue}
                    
                />
            </View>
        </View>
    )
}

export default InputHeader

const styles = StyleSheet.create({
    formInput: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: HEIGHT(50),
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