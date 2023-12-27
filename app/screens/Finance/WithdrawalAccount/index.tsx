import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Header } from "./../../../components/Headers/Header";
import R from "./../../../assets/R";
import { E_TYPE_BUTTON } from "./../../../types/emuns";
import { HEIGHT, WIDTH } from "./../../../configs/functions";
import ScreenName from "./../../../navigation/screen-name";
import ButtonText from "./../../../components/Button/ButtonText";
import ItemFunction from "./../../../components/Item/ItemFunction";
import { getAccount } from "./../../../apis/functions/user";
import ItemEmpty from "./../../../components/Item/ItemEmpty";

const WithdrawalAccount = ({navigation}: any) => {
    const [userInfo, setUserInfo] = useState<any>()
    const getDataUser = async() => {
        const user: any = await AsyncStorage.getItem('userInfo')
        const userInfoObject = JSON.parse(user);
        const res = await getAccount(userInfoObject?.id)
        if (res?.data?.status === "OK") {
          setUserInfo(res?.data?.data)
        }
    }
    useEffect(() => {
        getDataUser()
    }, [])
    useEffect(() => {
    }, [userInfo])
    return (
        <View style={{alignItems: 'center'}}>
            <Header
                isBack={true}
                isSearch={false}
                headerText={'Tài khoản rút tiền'}
            />
            {userInfo?.bankAccount ?
            <ItemFunction
                noNext
                item={{
                    iconName: 'card',
                    name: 'Địa chỉ nhận hàng',
                    color: R.colors.primary
                }}
                onPress={() => {}}
                customStyles={{backgroundColor: R.colors.white, paddingHorizontal: WIDTH(20)}}
                // body={
                //     <View style={styles.address}>
                //         {item?.destinationInfo ? (
                //         <>
                //             <Text style={{paddingRight: HEIGHT(5)}}>
                //                 {item?.destinationInfo?.recipientName ?? "Phạm Văn Hoàn"} | {item?.destinationInfo?.phone ?? "0395 474 001"}
                //             </Text>
                //             <Text style={{fontSize: getFont(14), marginBottom: HEIGHT(10)}}>
                //                 {`${item?.destinationInfo?.detail ?? ''}\n${item?.destinationInfo?.ward ?? ''} ${item?.destinationInfo?.district ?? ''} ${item?.destinationInfo?.province ?? ''}`}
                //             </Text>
                //         </>

                //         ) : <Text style={{color: R.colors.primary}}>Thiết lập ngay</Text>}
                //     </View>
                // }
            /> :  <ItemEmpty customStyle={{paddingVertical: HEIGHT(20)}}/>}
            <ButtonText
                onPress={() => navigation.navigate(ScreenName.BankAccount, {userInfo: userInfo, onRefresh: getDataUser})}
                title={userInfo?.bankAccount ? " Thay đổi tài khoản ngân hàng" : " Thêm tài khoản ngân hàng"}
                icon="add-circle-outline"
                colorIcon={R.colors.primary}
                type={E_TYPE_BUTTON.OUTLINE}
                customStyle={{width: '98%', height: HEIGHT(45)}}
            />
        </View>
    )
}

export default WithdrawalAccount