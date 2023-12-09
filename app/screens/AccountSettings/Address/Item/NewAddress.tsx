import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { List } from "@ui-kitten/components";

import { Header } from "../../../../components/Headers/Header";
import R from "../../../../assets/R";
import ScreenName from "../../../../navigation/screen-name";
import ItemFunction from "../../../../components/Item/ItemFunction";
import { getListAddress, getListDistrict, getListWards } from "../../../../apis/functions/user";
import { getFont, getWidth, HEIGHT, WIDTH } from "../../../../configs/functions";
import InputText from "../../../../components/Input/InputText";
const NewAddress = () => {
    const name = useRef<string>("")
    const phoneNumber = useRef<string>("")
    const [listCity, setListCity] = useState<any[]>([])
    const [nameDistrict, setNameDistrict] = useState<string>()
    const [nameWards, setNameWards] = useState<string>()
    const [nameCity, setNameCity] = useState<string>()
    const [current, setCurrent] = useState<number>(0)
    const [id, setId] = useState<number>(1)
    const getData = async () => {
        let res: any = [];
        if (current === 0 ) {
            const response1 = await getListAddress()
            console.log("res2", response1)
            res = response1?.data
        } else if (current === 1) {
            const response2 = await getListDistrict(id)
            res = response2?.data?.districts
        } else if (current === 2) {
            const response3 = await getListWards(id)
            res = response3?.data?.wards
        }
        
        console.log("res", res)
        
        setListCity(res ?? [])
    }
    useEffect(() => {
        getData()
        console.log("listCity", listCity, current)
    }, [current])

    useEffect(() => {
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
                name.current = value
              break
            }
            case 1: {
                phoneNumber.current = value
              break
            }
            default:
              break
        }
    }
    return (
        <View>
            <Header
                isBack={true}
                isSearch={false}
                headerText={'Thêm địa chỉ mới'}
            />
            <InputText
                headerText="Tên người nhận"
                placeholder="Điền thông tin" 
                onChangeValue={(value) => onChangeValue(value, 0)}
                required
            />
            <InputText 
                headerText="Số điện thoại"
                placeholder="Điền thông tin" 
                isNumber={true}
                required
                onChangeValue={(value) => onChangeValue(value, 1)}
            />
            <InputText 
                headerText="Địa chỉ"
                disabled
                required
            />
            {nameWards && 
            <InputText 
                placeholder="Số nhà, tên đường cụ thể..." 
                required
                onChangeValue={(value) => onChangeValue(value, 3)}
                customStyle={{backgroundColor: R.colors.white}}
            />}
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', backgroundColor: R.colors.white, paddingHorizontal: WIDTH(10)}}>
                <View style={{alignItems: 'flex-start'}}>
                    <Text style={styles.text}><Icon name="location-outline" size={15} color={R.colors.gray50}/> {nameCity}</Text>
                    {nameDistrict && <Text style={styles.text}><Icon name="location-outline" size={15} color={R.colors.gray50}/> {nameDistrict}</Text>}
                    {nameWards && <Text style={styles.text}><Icon name="location-outline" size={15} color={R.colors.gray50}/> {nameWards}</Text>}
                </View>
                <TouchableOpacity onPress={handleRestore}>
                    <Text style={{color: R.colors.primary, fontSize: getFont(15), marginVertical: HEIGHT(8)}}>Thiết lập lại</Text>
                </TouchableOpacity>
            </View>
            
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
            />
            
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
    }
  })