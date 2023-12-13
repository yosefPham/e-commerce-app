import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, Platform, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import Swiper from "react-native-swiper";

import { E_TYPE_BUTTON, E_TYPE_INPUT } from "../../types/emuns";
import { Header } from "../../components/Headers/Header";
import R from "../../assets/R";
import { getOneProduct, postToCart } from "../../apis/functions/product";
import { formatCurrency, getFont, getHeight, getWidth, HEIGHT, WIDTH } from "../../configs/functions";
import ButtonText from "../../components/Button/ButtonText";
import ScreenName from "../../navigation/screen-name";
import { Modal } from "@ui-kitten/components";

const Detail = ({navigation, route}: any) => {
    const [product, setProduct] = useState<any>(route?.params?.item ?? {})
    const [index, setIndex] = useState<number>(1)
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const [quanity, setQuanity] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)
    const [sizeCart, setSizeCart] = useState<number>()
    const notifyMessage = (msg: string) => {
        if (Platform.OS === 'android') {
          ToastAndroid.show(msg, ToastAndroid.TOP)
        }
    }
    useEffect(() => {
    }, [sizeCart])

    const handleAddToCart = async () => {
        setLoading(true)
        const res = await postToCart(product?.id, quanity)
        if (res?.status === "OK") {
            setSizeCart(res?.data?.items.length)
            setVisibleModal(false)
            notifyMessage("Thêm vào giỏ hàng thành công!")
        }
        setLoading(false)
    }
    return (
        <View style={styles.container}>
            <Header
                headerText={undefined} 
                isBack
                isIconCart
                isIconMessage
                style={{borderColor: R.colors.white}}
                // onChangeText={(value: string) => setTextSearch(value)}
                // onSubmit={onRefresh}
                quantityOfCart={sizeCart}
            />
            <View style={{height: HEIGHT(300), backgroundColor: R.colors.border}}>
                <Swiper 
                    autoplay
                    loadMinimal
                    // showsPagination
                    showsButtons={false}
                    onIndexChanged={(index) => setIndex(index + 1)}
                    style={styles.wrapper}
                >
                    {product?.resources?.map((item: any, index: number) => {
                        return (
                            <View key={index} style={styles.slide}>
                                <Image 
                                    source={{ uri: item?.imageUrl }}
                                    style={styles.image}
                                    resizeMode="cover"
                                />
                            </View>
                        )
                    })}
                </Swiper>
                <View style={styles.num}>
                    <Text>{index}/{product?.resources?.length}</Text>
                </View>
            </View>
            <View style={styles.title}>
                <Text 
                    style={{fontSize: getFont(18), marginHorizontal: WIDTH(2), height: HEIGHT(25)}}
                    numberOfLines={2}
                    ellipsizeMode='tail'
                >
                    {product?.name ?? " "}
                </Text>
                <Text style={{color: R.colors.primary, fontSize: getFont(20), fontWeight: '500'}}>{formatCurrency(product?.standardPrice ?? 250000) ?? "đ250.000"}</Text>
                {/* {isLocation && (
                <View style={styles.location}>
                    <Icon name='location-outline' size={14} color={R.colors.gray6B}/>
                    <Text style={{fontSize: getFont(12), color: R.colors.gray6B}}>{item?.location ?? 'Nước ngoài'}</Text>
                </View>
                )} */}
            </View>
            <View style={styles.footer}>
                <ButtonText
                    title="Thêm vào giỏ"
                    icon="cart"
                    colorIcon={R.colors.white}
                    type={E_TYPE_BUTTON.PRIMARY}
                    onPress={() => setVisibleModal(true)}
                    customStyle={styles.button}
                    customTitle={{fontSize: getFont(16), marginLeft: WIDTH(5)}}
                    disabled={quanity === 0}
                />
                <ButtonText
                    title="Mua hàng"
                    type={E_TYPE_BUTTON.PRIMARY}
                    onPress={() => {
                        setVisibleModal(true)
                        navigation.navigate(ScreenName.OrderProcessing, {item: product})
                    }}
                    customStyle={styles.buttonText}
                    customTitle={{fontSize: getFont(16)}}
                />
            </View>
            {visibleModal &&
            <View style={styles.modal}>
                <View style={styles.quanity}>
                    <Text>Số lượng:</Text>
                    <View style={styles.incDecQuanity}>
                        <TouchableOpacity disabled={quanity === 1} onPress={() => setQuanity(quanity - 1)} style={[styles.incDec, {borderRightColor: R.colors.gray50, borderRightWidth: 0.5}, quanity===1 && {backgroundColor: R.colors.gray2}]}>
                            <Text style={{fontSize: getFont(20), fontWeight: '500'}}>-</Text>
                        </TouchableOpacity>
                        <Text style={{fontSize: getFont(18), color: R.colors.primary, lineHeight: HEIGHT(30)}}>{quanity}</Text>
                        <TouchableOpacity onPress={() => setQuanity(quanity + 1)} style={[styles.incDec, {borderLeftColor: R.colors.gray50, borderLeftWidth: 0.5}]}>
                            <Text style={{fontSize: getFont(20), fontWeight: '500'}}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ButtonText
                    title="Thêm vào Giỏ hàng"
                    type={E_TYPE_BUTTON.PRIMARY}
                    onPress={handleAddToCart}
                    customStyle={{width: '98%', height: HEIGHT(40)}}
                    customTitle={{fontSize: getFont(16), marginLeft: WIDTH(5)}}
                    isLoading={loading}
                />
            </View>}
        </View>
    )
}

export default Detail

const styles = StyleSheet.create({
    container: {
        width: getWidth(),
        height: getHeight(),
    },
    wrapper: {
    },
    slide: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: "100%",
        margin: 0,
        padding: 0
    },
    image: {
        width: '100%',
        height: '100%',
    },
    modal: {
        position: 'absolute',
        height: HEIGHT(120),
        width: "100%",
        backgroundColor: R.colors.white,
        justifyContent: 'flex-end',
        alignItems: 'center',
        bottom: -33
    },
    num: {
        position: 'absolute',
        bottom: 5,
        backgroundColor: R.colors.gray80,
        right: 20,
        width: WIDTH(40),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: WIDTH(40)
    },
    product: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        paddingHorizontal: WIDTH(10),
        marginVertical: HEIGHT(10),
        paddingVertical: WIDTH(15),
        alignItems: 'flex-start', 
        width: '100%',
        backgroundColor: R.colors.white,
    },
    buttonText: {
        width: '50%',
        height: HEIGHT(50),
    },
    button: {
        width: '50%',
        height: HEIGHT(50),
        backgroundColor: R.colors.blueBg,
        marginRight: WIDTH(2)
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'absolute',
        bottom: -33,
        width: '100%',
    },
    incDecQuanity: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: WIDTH(100),
         borderColor: R.colors.gray50,
        borderWidth: 0.5,
    },
    quanity: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: WIDTH(10),
        height: HEIGHT(50),
        marginBottom: HEIGHT(10),
        borderBottomColor: R.colors.gray50,
        borderBottomWidth: 0.5,
        alignItems: "center",
    },
    incDec: {
        width: WIDTH(30),
        height: HEIGHT(30),
        justifyContent: 'center',
        alignItems: 'center',
    }
  });