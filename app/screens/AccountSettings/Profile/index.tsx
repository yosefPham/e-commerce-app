import { Header } from "../../../components/Headers/Header";
import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ItemFunction from "../../TabHome/Profile/Item/ItemFunction";

import R from "../../../assets/R";
import ScreenName from "../../../navigation/screen-name";
import InputText from "../../../components/Input/InputText";
import ButtonText from "../../../components/Button/ButtonText";
import { E_TYPE_BUTTON } from "../../../types/emuns";
import { getFont, HEIGHT, WIDTH } from "../../../configs/functions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { putAccount } from "../../../apis/functions/user";

const listFunction = [
    {
      name: 'Hồ sơ',
      iconName: '',
      color: R.colors.blue2A3478,
      screenNameMove: ScreenName.Order
    },
    {
      name: 'Địa chỉ',
      iconName: '',
      color: R.colors.primary,
      screenNameMove: ScreenName.Shop
    },
  ]
const Profile = ({ navigation }: any) => {
    const firstName = useRef<string>("")
    const lastName = useRef<string>("")
    const about = useRef<string>("")
    const gender = useRef<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [userInfo, setUserInfo] = useState<any>(false)

    const notifyMessage = (msg: string) => {
        if (Platform.OS === 'android') {
          ToastAndroid.show(msg, ToastAndroid.TOP)
        }
    }
    useEffect(() => {
        AsyncStorage.getItem('userInfo')
        .then(userInfoString => {
            if (userInfoString) {
            const userInfoObject = JSON.parse(userInfoString);
            firstName.current = userInfoObject?.firstName ?? ''
            lastName.current = userInfoObject?.lastName ?? ''
            about.current = userInfoObject?.about ?? ''
            gender.current = userInfoObject?.gender ?? ''
            setUserInfo(userInfoObject)
            } else {
            console.log('Không có dữ liệu cho khóa "userInfo" trong AsyncStorage.');
            }
        })
        .catch(error => {
        console.error('Lỗi khi lấy dữ liệu từ AsyncStorage:', error);
        });
    }, [])
    const onChangeValue = (value: string, index: number) => {
        switch (index) {
            case 0: {
                firstName.current = value
              break
            }
            case 1: {
                lastName.current = value
              break
            }
            case 2: {
                about.current = value
              break
            }
            case 3: {
                if (value === "Nam") {
                    gender.current = "MALE"
                } else if (value === "Nữ") {
                    gender.current = "FEMALE"
                } else {
                    gender.current = "UNDEFINED"
                }            
              break
            }
            default:
              break
        }
    }
    const handleEdit = async () => {
        try {
            setLoading(true)
            if (firstName.current.trim() === "" ||
            lastName.current.trim() === "" || 
            about.current.trim() === "" ||
            gender.current.trim() === "") {
                return notifyMessage('Vui lòng điền đầy đủ thông tin!')
            } else if (gender.current !== 'MALE' && gender.current !== 'FEMALE') {
                return notifyMessage("Giới tính không xác định vui lòng nhập lại")
            }
            const res = await putAccount({
                firstName: firstName.current,
                lastName: lastName.current,
                about: about.current,
                gender: gender.current
            })
            if (res?.status === "OK") {
                AsyncStorage.setItem('userInfo', JSON.stringify(res?.data))
                notifyMessage(res?.message ?? 'Cập nhật thành công!')
                navigation.navigate(ScreenName.AccountSettings)
            } else {
                console.assert(res.message)
            }

        } catch (err) {

        } finally {
            setLoading(false)
        }
    }
    return (
        <View>
            <Header
                isBack={true}
                isSearch={false}
                headerText={'Sửa hồ sơ'}
            />
            <TouchableOpacity activeOpacity={0.6}
                style={{
                    width: '100%', 
                    alignItems: 'center', 
                    height: HEIGHT(150), 
                    backgroundColor: R.colors.primary,
                    justifyContent: 'center'
                }}
            >
                <View style={styles.containerImage}>
                    {!userInfo?.avatarUrl ? 
                    <Image
                        style={styles.image} 
                        source={{uri: userInfo?.avatarUrl}}
                    /> : 
                    <View style={styles.noImage} >
                        <Icon name='person' color={R.colors.primary} size={40}/>
                    </View>}
                </View>
                <Text 
                    style={{
                        color: R.colors.white,
                        backgroundColor: R.colors.black30p,
                        width:'100%',
                        textAlign: 'center',
                        position: 'absolute',
                        bottom: 0,
                        fontSize: getFont(13)
                    }}
                >
                    Chạm để thay đổi
                </Text>
            </TouchableOpacity>
            <View style={{marginTop: HEIGHT(20), justifyContent: 'center'}}>
                <InputText
                    headerText="Họ:"
                    placeholder="Thiết lập ngay"
                    defaultValue={userInfo?.firstName}
                    onChangeValue={(value) => onChangeValue(value, 0)}
                />
                <InputText
                    headerText="Tên:"
                    defaultValue={userInfo?.lastName}
                    placeholder="Thiết lập ngay"
                    onChangeValue={(value) => onChangeValue(value, 1)}
                />
                <InputText 
                    headerText="Bio:"
                    placeholder="Thiết lập ngay" 
                    defaultValue={userInfo?.about}
                    onChangeValue={(value) => onChangeValue(value, 2)}
                />
                <InputText 
                    headerText="Giới tính:"
                    defaultValue={userInfo?.gender === 'UNDEFINE' ? '' : userInfo?.gender === "MALE" ? 'Nam' : userInfo?.gender === "FEMALE" ? 'Nữ' : ''}
                    placeholder="Thiết lập ngay" 
                    onChangeValue={(value) => onChangeValue(value, 3)}
                />
                <InputText 
                    headerText="Email:"
                    defaultValue={userInfo?.email}
                    placeholder="Thiết lập ngay" 
                    disabled={true}
                />
                <ButtonText
                    title="Lưu lại" 
                    onPress={handleEdit} 
                    type={E_TYPE_BUTTON.PRIMARY} 
                    customStyle={{width: '100%', height: HEIGHT(40), marginTop: HEIGHT(10)}}
                    customTitle={{fontSize: getFont(16)}}
                    isLoading={loading}
                />
            </View>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: R.colors.primary,
      // marginTop: HEIGHT(100),
      paddingHorizontal: WIDTH(20),
      paddingBottom: HEIGHT(6),
      marginBottom: HEIGHT(10)
    },
    containerImage: {
      width: WIDTH(60),
      height: HEIGHT(60),
      borderRadius: WIDTH(30),
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover', // Kiểu co dãn ảnh
    },
    info: {
      marginHorizontal: HEIGHT(10),
    },
    username: {
      color: R.colors.white,
      fontWeight: '600',
      fontSize: getFont(20)
    },
    follow: {
      color: R.colors.white,
      marginRight: WIDTH(10),
    },
    noImage: {
      width: '100%',
      height: '100%',
      borderRadius: WIDTH(100),
      overflow: 'hidden',
      backgroundColor: R.colors.white,
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      width: WIDTH(30),
      height: HEIGHT(30),
      borderRadius: WIDTH(30),
      overflow: 'hidden',
      backgroundColor: R.colors.white,
      alignItems: 'center',
      justifyContent: 'center',
    }
  })