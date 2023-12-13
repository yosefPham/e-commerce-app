import React, { useEffect, useRef, useState } from "react";
import { Platform, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { List } from "@ui-kitten/components";

import { Header } from "../../../../components/Headers/Header";
import R from "../../../../assets/R";
import ScreenName from "../../../../navigation/screen-name";
import ItemFunction from "../../../../components/Item/ItemFunction";
import { getListAddress, getListDistrict, getListWards, postAddress } from "../../../../apis/functions/user";
import { getFont, getWidth, HEIGHT, WIDTH } from "../../../../configs/functions";
import InputText from "../../../../components/Input/InputText";
import ButtonText from "../../../../components/Button/ButtonText";
import { E_TYPE_BUTTON } from "../../../../types/emuns";
import ItemEmpty from "../../../../components/Item/ItemEmpty";
import LoadingComponent from "../../../../common/Loading/LoadingComponent";

const NewAddress = ({navigation, route}: any) => {
    const { onRefresh } = route.params;
    const item = route?.params?.item
    const recipientName = useRef<string>("")
    const phoneNumber = useRef<string>("")
    const detail = useRef<string>("")
    const [listCity, setListCity] = useState<any[]>([])
    const [nameDistrict, setNameDistrict] = useState<string | undefined>(item?.nameDistrict)
    const [nameWards, setNameWards] = useState<string>()
    const [nameCity, setNameCity] = useState<string | undefined>(item?.province)
    const [current, setCurrent] = useState<number>(0)
    const [id, setId] = useState<number>(1)
    const [disable, setDisable] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingSend, setLoadingSend] = useState<boolean>(false)

    const notifyMessage = (msg: string) => {
        if (Platform.OS === 'android') {
          ToastAndroid.show(msg, ToastAndroid.TOP)
        }
    }

    const getData = async () => {
        setLoading(true)
        let res: any = [];
        if (current === 0 ) {
            const response1 = await getListAddress()
            res = response1?.data
        } else if (current === 1) {
            const response2 = await getListDistrict(id)
            res = response2?.data?.districts
        } else if (current === 2) {
            const response3 = await getListWards(id)
            res = response3?.data?.wards
        }
        setListCity(res ?? [])
        setLoading(false)
    }
    useEffect(() => {
        getData()
    }, [current])

    useEffect(() => {
        if (recipientName.current.trim() === "" &&
        phoneNumber.current.trim() === "" &&
        detail.current.trim() === "" &&
        nameCity && nameWards && nameDistrict) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }, [listCity, id, nameDistrict, nameWards, nameCity])
    
    const handleChange = async (id: number, name: string) => {
        setListCity([])
        if (current === 0) {
            setNameCity(name)
        } else if (current === 1) {
            setNameDistrict(name)
        } else if (current === 2) {
            setNameWards(name)
        }
        setCurrent(current + 1)
        setId(id)
    }
    const handleRestore = () => {
        setCurrent(0)
        setNameCity(undefined)
        setNameDistrict(undefined)
        setNameWards(undefined)
    }
    const onChangeValue = (value: string, index: number) => {
        switch (index) {
            case 0: {
                recipientName.current = value
              break
            }
            case 1: {
                phoneNumber.current = value
              break
            }
            case 2: {
                detail.current = value
              break
            }
            default:
              break
        }
        if (recipientName.current.trim() !== "" &&
        phoneNumber.current.trim() !== "" &&
        detail.current.trim() !== "" &&
        nameCity && nameWards && nameDistrict) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }
    const handleSubmit = async() => {
        try {
            setLoadingSend(true)
            const body: any = {
                phone: phoneNumber.current,
                recipientName: recipientName.current,
                detail: detail.current,
                ward: nameWards,
                district: nameDistrict,
                province: nameCity
            }
            const res = await postAddress(body)
            if (res.status === "OK") {
                notifyMessage("Thêm địa chỉ mới thành công!")
                navigation.goBack()
                onRefresh && onRefresh()
            }
            console.log('res', res, body)
        } catch (err) {
            notifyMessage("Có lỗi xảy ra!")
        } finally {
            setLoadingSend(false)
        }
    }
    return (
        <View style={{alignItems: 'center'}}>
            <Header
                isBack={true}
                isSearch={false}
                headerText={'Thêm địa chỉ mới'}
            />
            <InputText
                customStyle={{paddingHorizontal: WIDTH(10)}}
                placeholder="Tên người nhận" 
                onChangeValue={(value) => onChangeValue(value, 0)}
                required
            />
            <InputText
                customStyle={{paddingHorizontal: WIDTH(10)}}
                placeholder="Số điện thoại" 
                isNumber={true}
                required
                onChangeValue={(value) => onChangeValue(value, 1)}
            />
            <View 
                style={{
                    flexDirection: 'row', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start', 
                    backgroundColor: R.colors.white, 
                    paddingHorizontal: WIDTH(10),
                    width: "100%"
                    }}
                >
                <View style={{alignItems: 'flex-start'}}>
                    <Text style={styles.text}><Icon name="location-outline" size={15} color={R.colors.gray50}/> {nameCity ?? "Địa chỉ:"}</Text>
                    {nameDistrict && <Text style={styles.text}><Icon name="location-outline" size={15} color={R.colors.gray50}/> {nameDistrict}</Text>}
                    {nameWards && <Text style={styles.text}><Icon name="location-outline" size={15} color={R.colors.gray50}/> {nameWards}</Text>}
                </View>
                <TouchableOpacity onPress={handleRestore}>
                    <Text style={{color: R.colors.primary, fontSize: getFont(15), marginVertical: HEIGHT(8)}}>Thiết lập lại</Text>
                </TouchableOpacity>
            </View>
            {nameWards && 
            <InputText 
                customStyle={{paddingHorizontal: WIDTH(10)}}
                placeholder="Số nhà, tên đường"
                onChangeValue={(value) => onChangeValue(value, 2)}
                disabled={!nameWards}
                required
            />}
            <View>
            {loading ? <LoadingComponent isLoading={loading} style={{position: 'absolute', top: 200}}/> : (
                <List
                    data={listCity}
                    extraData={listCity}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }: any) => {
                        return (
                            <ItemFunction 
                                customStyles={{backgroundColor: R.colors.white}} 
                                item={item} 
                                onPress={() => handleChange(item?.code, item?.name)}
                            />
                        )
                    }}
                    numColumns={1}
                    onEndReachedThreshold={0.1}
                    maxToRenderPerBatch={6}
                    initialNumToRender={6}
                    style={styles.list}
                    columnWrapperStyle={undefined}
                    ListFooterComponent={<View style={R.themes.gap} />}
                    // ListEmptyComponent={<ItemEmpty/>}
                />
            )}
            </View>

            {nameWards &&
            <ButtonText
              title="Thêm địa chỉ"
              type={E_TYPE_BUTTON.PRIMARY}
              onPress={handleSubmit}
              customStyle={styles.buttonText}
              customTitle={{fontSize: getFont(16), fontWeight: '600'}}
              disabled={disable}
              isLoading={loadingSend}
            />
            }
        </View>
    )
}

export default NewAddress


const styles = StyleSheet.create({
    list: {
      width: getWidth(),
      backgroundColor: R.colors.gray1,
      paddingHorizontal: WIDTH(5),
      paddingVertical: HEIGHT(10)
    },
    address: {
      backgroundColor: R.colors.white,
      paddingHorizontal: WIDTH(10),
      paddingVertical: HEIGHT(20),
      marginBottom: HEIGHT(10),
    },
    text: {
        fontSize: getFont(15),
        marginVertical: HEIGHT(8),
        backgroundColor: R.colors.white
    },
    buttonText: {
        position: 'absolute',
        width: '95%',
        height: HEIGHT(45),
        marginVertical: HEIGHT(2),
        bottom: -30,
        marginHorizontal: WIDTH(2)
    }
  })