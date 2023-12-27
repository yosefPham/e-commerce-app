import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, Platform, ToastAndroid } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import Swiper from "react-native-swiper";
import { List, Modal } from "@ui-kitten/components";
import Icon from "react-native-vector-icons/Ionicons";

import { ESystemRoles, E_TYPE_BUTTON, E_TYPE_INPUT } from "../../types/emuns";
import { Header } from "../../components/Headers/Header";
import R from "../../assets/R";
import { getListProductClient, getOneProduct, postToCart } from "../../apis/functions/product";
import { formatCurrency, getFont, getHeight, getWidth, HEIGHT, notifyMessage, WIDTH } from "../../configs/functions";
import ButtonText from "../../components/Button/ButtonText";
import ScreenName from "../../navigation/screen-name";
import ItemShop from "../../components/Item/ItemShop";
import ItemProduct from "../../components/Item/ItemProduct";
import ItemEmpty from "../../components/Item/ItemEmpty";
import { AuthContext } from "../../context/AuthContext";

const Detail = ({navigation, route}: any) => {
    const { token, role } = useContext(AuthContext)
    const [product, setProduct] = useState<any>(route?.params?.item ?? {})
    const [index, setIndex] = useState<number>(1)
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const [listProduct, setListProduct] = useState<any[]>([])
    const [quantity, setQuantity] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingSend, setLoadingSend] = useState<boolean>(false)
    const [sizeCart, setSizeCart] = useState<number>()
    const [totalPages, setTotalPages] = useState<number>(0)
    const [type, setType] = useState<string>()
    const currentPage = useRef<number>(0)
  
    useEffect(() => {
    }, [sizeCart])
    const getData = async () => {
        try {
          setLoading(true)
          const res = await getListProductClient(currentPage.current, 6, "id")
          setListProduct(res?.data?.data.content)
          setTotalPages(res?.data?.data.totalPages)
        } catch (err) {
          console.log(err)
        } finally {
          setLoading(false)
        }
    }
    const getMoreData = async () => {
        try {
            setLoading(true)
            // currentPage.current = 2
            const res = await getListProductClient(currentPage.current, 6, "id")
            setListProduct([...listProduct, ...res?.data?.data.content])
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }
    const onLoadMore = () => {
        if (currentPage.current < totalPages) {
            currentPage.current = currentPage.current + 1
        }
        getMoreData()
    }
    const onRefresh = () => {
        currentPage.current = 0;
        getData()
    }
    useEffect(() => {
        getData()
    }, [])
    useEffect(() => {
    }, [listProduct])
    const handleAddToCart = async () => {
        setLoadingSend(true)
        const res = await postToCart(product?.id, quantity)
        console.log('res?.data', res)

        if (res?.status === "OK") {
            setSizeCart(res?.data?.items.length)
            setVisibleModal(false)
            if (type === "Mua hàng") {
                navigation.navigate(ScreenName.OrderProcessing, {
                        item: {
                            product: product,
                            quantity: quantity
                        },
                        cartId: res?.data?.id
                    })
            } else {
                notifyMessage("Thêm vào giỏ hàng thành công!")
            }
        } else {
            console.log('response', res)
            notifyMessage(res?.message ?? "Có lỗi xảy ra")
        }
        setLoadingSend(false)
    }
    return (
        <View style={styles.container}>
            <Header
                headerText={undefined} 
                isBack
                isIconCart
                isIconMessage
                style={{borderColor: R.colors.white}}
                onPressInputSearch={() => navigation.navigate(ScreenName.Search)}
                quantityOfCart={sizeCart}
            />
            <List
                data={listProduct}
                extraData={listProduct}
                showsVerticalScrollIndicator={false}
                ListHeaderComponentStyle={{width: '100%'}}
                ListHeaderComponent={
                    <>
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
                        <ItemShop 
                            item={product?.user}
                            onPress={() => {}}
                            isLocation
                        />
                        <View style={styles.description}>
                            <Text style={{fontWeight: '500', marginBottom: HEIGHT(10)}}>Mô tả sản phẩm</Text>
                            <Text>{product?.description}</Text>
                        </View>
                    </>
                }
                renderItem={({ item, index }: any) => {
                    if (listProduct.length === index + 1 && listProduct.length % 2 !== 0) {
                        return <View/>
                    }
                    return (
                        <ItemProduct key={index} item={item ?? {}} isLocation={true}/>
                    )
                }}
                numColumns={getWidth() >= 300 ? 2 : 1}
                onEndReachedThreshold={0.1}
                maxToRenderPerBatch={6}
                initialNumToRender={6}
                style={styles.list}
                columnWrapperStyle={getWidth() >= 300 ? styles.columnWrapperStyle : undefined}
                onRefresh={onRefresh}
                refreshing={loading}
                ListFooterComponent={<View style={R.themes.gap} />}
                onEndReached={onLoadMore}
                ListEmptyComponent={<ItemEmpty/>}
                // ListFooterComponent={loadMore && <LoadMore />}
            />
            {role !== ESystemRoles.ADMIN && (
                <View style={styles.footer}>
                    <ButtonText
                        title="Thêm vào giỏ"
                        icon="cart"
                        colorIcon={R.colors.white}
                        type={E_TYPE_BUTTON.PRIMARY}
                        onPress={() => {
                            if (token) {
                                setVisibleModal(true)
                            } else {
                                navigation.navigate(ScreenName.Login)
                            }
                        }}
                        customStyle={styles.button}
                        customTitle={{fontSize: getFont(16), marginLeft: WIDTH(5)}}
                        disabled={quantity === 0}
                    />
                    <ButtonText
                        title="Mua hàng"
                        type={E_TYPE_BUTTON.PRIMARY}
                        onPress={() => {
                            if (token) {
                                setType("Mua hàng")
                                setVisibleModal(true)
                            } else {
                                navigation.navigate(ScreenName.Login)
                            }
                        }}
                        customStyle={styles.buttonText}
                        customTitle={{fontSize: getFont(16)}}
                    />
                </View>
            )}       
            {visibleModal &&
            <View style={styles.modal}>
                <View
                    style={{
                        width: "100%",
                        height: HEIGHT(100),
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        borderBottomColor: R.colors.gray50,
                        borderBottomWidth: 0.5,
                        paddingVertical: HEIGHT(10),
                        paddingHorizontal: WIDTH(10),
                    }}
                >
                    <View style={{width: "30%", height: "100%"}}>
                        <Image 
                            source={{ uri: product?.resources[0]?.imageUrl }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    </View>
                    <View style={{marginLeft: WIDTH(10)}}>
                        <Text style={{color: R.colors.primary, fontSize: getFont(16), fontWeight: '500'}}>
                            {formatCurrency(product?.standardPrice ?? 0)}
                        </Text>
                        <Text>Kho: {product?.remaining ?? 0}</Text>
                    </View>
                    <TouchableOpacity onPress={() => setVisibleModal(false)} style={styles.iconClose}>
                        <Icon name="close" color={R.colors.gray50} size={20}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.quanity}>
                    <Text>Số lượng:</Text>
                    <View style={styles.incDecQuanity}>
                        <TouchableOpacity
                            disabled={quantity === 1}
                            onPress={() => setQuantity(quantity - 1)}
                            style={[
                                styles.incDec, 
                                {borderRightColor: R.colors.gray50, borderRightWidth: 0.5},
                                quantity===1 && {backgroundColor: R.colors.gray2}
                            ]}
                        >
                            <Text style={{fontSize: getFont(20), fontWeight: '500'}}>-</Text>
                        </TouchableOpacity>
                        <Text style={{fontSize: getFont(18), color: R.colors.primary, lineHeight: HEIGHT(30)}}>{quantity}</Text>
                        <TouchableOpacity
                            disabled={quantity === product.remaining}
                            onPress={() => setQuantity(quantity + 1)}
                            style={[
                                styles.incDec,
                                {borderLeftColor: R.colors.gray50, borderLeftWidth: 0.5},
                                quantity===product?.remaining && {backgroundColor: R.colors.gray2}
                            ]}
                        >
                            <Text style={{fontSize: getFont(20), fontWeight: '500'}}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ButtonText
                    title="Thêm vào Giỏ hàng"
                    type={E_TYPE_BUTTON.PRIMARY}
                    onPress={handleAddToCart}
                    customStyle={{width: '100%', height: HEIGHT(40)}}
                    customTitle={{fontSize: getFont(16), marginLeft: WIDTH(5)}}
                    isLoading={loadingSend}
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
        height: HEIGHT(200),
        width: "100%",
        backgroundColor: R.colors.white,
        justifyContent: 'flex-end',
        alignItems: 'center',
        bottom: -35,
        paddingBottom: HEIGHT(3),
        ...R.themes.shadow,
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
        height: HEIGHT(45),
    },
    button: {
        width: '50%',
        height: HEIGHT(45),
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
        backgroundColor: R.colors.white,
        paddingTop: HEIGHT(5),
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
        height: HEIGHT(50),
        marginBottom: HEIGHT(10),
        borderBottomColor: R.colors.gray50,
        borderBottomWidth: 0.5,
        alignItems: "center",
        paddingHorizontal: WIDTH(10),
    },
    incDec: {
        width: WIDTH(30),
        height: HEIGHT(30),
        justifyContent: 'center',
        alignItems: 'center',
    },
    description: {
        paddingHorizontal: WIDTH(15),
        backgroundColor: R.colors.white,
        marginVertical: HEIGHT(5),
        paddingVertical: HEIGHT(10),
    },
    columnWrapperStyle: { justifyContent: "flex-start"},
    list: {
        backgroundColor: R.colors.gray1,
    },
    iconClose: {
        position: 'absolute',
        top: 10,
        right: 10,
    }
  });