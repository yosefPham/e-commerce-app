import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { List } from "@ui-kitten/components";

import { getFont, getHeight, getWidth, HEIGHT, notifyMessage, WIDTH } from "./../../../../configs/functions";
import R from "./../../../../assets/R";
import { Header } from "./../../../../components/Headers/Header";
import ButtonText from "./../../../../components/Button/ButtonText";
import { E_TYPE_BUTTON } from "./../../../../types/emuns";
import InputText from "./../../../../components/Input/InputText";
import ScreenName from "./../../../../navigation/screen-name";
import LoadingComponent from "./../../../../common/Loading/LoadingComponent";
import ItemFunction from "./../../../../components/Item/ItemFunction";
import { getListBank, getListBinBank, postCheckBankAccount, putAccount } from "./../../../../apis/functions/user";

const BankAccount = ({navigation, route}: any) => {
    const bin = useRef<string>("")
    const { userInfo, onRefresh } = route.params
    const [bank, setBank] = useState<any>()
    const [name, setName] = useState<any>()
    const [number, setNumber] = useState<any>()
    const [disable, setDisable] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingSend, setLoadingSend] = useState<boolean>(false)
    const [listBank, setListBank] = useState<any[]>([])
    const getData = async () => {
        setLoading(true)
        const res = await getListBank()
        if (res?.data?.length > 0) {
            setListBank(res?.data)
        }
        setLoading(false)
    }
    // const checkAccount = async (numberAccount: number) => {
    //     const formData: any = {
    //         bin: bin, 
    //         accountNumber: numberAccount
    //     }
    //     const res = await postCheckBankAccount(formData)
    //     console.log("res", res)
    // }
    const handleChange = async (value: any, index: number) => {
        switch (index) {
            case 0:
                setBank(value)
                bin.current = value?.bin
                break
            case 1:
                // setTimeout(async() => {
                //     await checkAccount(value)
                // }, 1000)
                setNumber(value)
                break
            case 2: 
                setName(value)
                break

        }
    }
    const handleSubmit = async() => {
        setLoadingSend(true)
        const formData: any = {
            bin: bin.current,
            bankNameL: bank?.shortName,
            number: number,
            name: name,
            firstName: userInfo?.firstName,
            lastName: userInfo?.lastName
        }
        const res = await putAccount(formData)
        if (res?.status === "OK") {
            notifyMessage("Cập nhật thông tin ngân hàng thành công")
            navigation.goBack()
            onRefresh && onRefresh()
        } else {
            notifyMessage(res?.firstName ?? res?.lastName ?? "Có lỗi xảy ra!")
        }
        setLoadingSend(false)
        console.log('res' , res, userInfo)
    }
    useEffect(() => {
        getData()
    }, [])
    useEffect(() => {
        if (bank && number !== "" && number && name !== "" && name) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }, [bank, name, number])
    return (
        <View style={{alignItems: 'center', backgroundColor: R.colors.white, height: getHeight()}}>
            <Header
                isBack={true}
                isSearch={false}
                headerText={'Tài khoản ngân hàng'}
            />
            <View>
            {loading ? <LoadingComponent isLoading={loading} style={{position: 'absolute', top: 200}}/> : (
                <>
                    {!bank &&
                    <>
                    <Text style={{marginHorizontal: WIDTH(15), paddingVertical: HEIGHT(10)}}>Chọn ngân hàng:</Text>
                    <List
                        data={listBank}
                        extraData={listBank}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }: any) => {
                            return (
                                <ItemFunction
                                    noNext
                                    customStyles={{backgroundColor: R.colors.white}} 
                                    item={{
                                        name: item?.shortName,
                                        color: R.colors.white,
                                        iconName: '',
                                        logo: item?.logo
                                    }} 
                                    onPress={() => handleChange(item, 0)}
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
                    
                    </>
                    }
                </>

            )}
            </View>
            <ItemFunction
                noNext
                customStyles={{backgroundColor: R.colors.white}} 
                item={{
                    name: bank?.shortName,
                    color: R.colors.white,
                    iconName: '',
                    logo: bank?.logo
                }} 
                onPress={() => {}}
            />
            <InputText
                headerText="Số tài khoản:"
                customStyle={{paddingHorizontal: WIDTH(10)}}
                defaultValue={number}
                required
                onChangeValue={(value) => handleChange(value, 1)}
            />
            <InputText
                headerText="Chủ tài khoản:"
                customStyle={{paddingHorizontal: WIDTH(10)}}
                defaultValue={name}
                required
                onChangeValue={(value) => handleChange(value, 2)}
            />
            <View style={{width: '100%', alignItems: 'flex-start', paddingHorizontal: WIDTH(10), marginTop: HEIGHT(10)}}>
                <ButtonText
                    title="Thiết lập lại"
                    type={E_TYPE_BUTTON.OUTLINE}
                    onPress={() => {
                        setBank(null)
                        setName(null)
                        setNumber(null)
                    }}
                    isLoading={loadingSend}
                />
            </View>
            <View style={styles.buttonText}>
                <ButtonText
                    title="Gửi yêu cầu thiết lập"
                    type={E_TYPE_BUTTON.PRIMARY}
                    onPress={handleSubmit}
                    customStyle={{height: HEIGHT(45), width: '95%'}}
                    customTitle={{fontSize: getFont(16), fontWeight: '600'}}
                    disabled={disable}
                    isLoading={loadingSend}
                />
            </View>
        </View>
    )
}

export default BankAccount

const styles = StyleSheet.create({
    logo: {
        width: '70%',
        height: WIDTH(250),
        resizeMode: 'cover',
    },
    footer: {
        flexDirection: 'row', 
        width: '100%', 
        justifyContent: 'center',
        position: 'absolute',
        bottom: -20
    },
    list: {
        width: getWidth(),
        backgroundColor: R.colors.gray1,
        paddingHorizontal: WIDTH(5),
        paddingVertical: HEIGHT(10)
    },
    buttonText: {
        position: 'absolute',
        width: '100%',
        marginVertical: HEIGHT(2),
        bottom: -37,
        marginHorizontal: WIDTH(2),
        backgroundColor: R.colors.white,
        paddingBottom: HEIGHT(5),
        justifyContent: 'center',
        flexDirection: 'row'
    }
})