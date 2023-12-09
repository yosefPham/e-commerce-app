import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import R from "../../assets/R";
import { ViewStyle } from "react-native";
import { getFont, HEIGHT, WIDTH } from "../../configs/functions";

type Props = {
    headerText?: string;
    nameIcon?: string;
    colorIcon?: string;
    sizeIcon?: number;
    placeholder?: string;
    customStyle?: ViewStyle;
    customInputStyle?: ViewStyle;
    isPassword?: boolean;
    value?: string;
    onChangeValue?: (value: any) => void
    disabled?: boolean;
    defaultValue?: string;
    isNumber?: boolean;
    required?: boolean;
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
const InputText = ({ nameIcon, isNumber, required, colorIcon, sizeIcon, placeholder, customStyle, customInputStyle, isPassword, onChangeValue, value, headerText, disabled, defaultValue } : Props) => {
    const onChangeText = (value: string) => {
        onChangeValue && onChangeValue(value)
    }
    return (
        <View style={[headerText ? HEADER_TEXT : {}, customStyle]}>
            {headerText && <Text style={{minWidth: WIDTH(110), fontSize: getFont(16)}}>{headerText} {required && <Text style={{color: R.colors.red500}}>*</Text>}</Text>}
            <View style={[styles.formInput]}>
                <View style={styles.icon}>
                    <Icon name={nameIcon ?? ''} color={colorIcon ?? R.colors.primary} size={sizeIcon ?? 20}/>
                </View>
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