import React, { useEffect, useRef, useState } from "react";
import { Image, Platform, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';

import { Header } from "./../../../components/Headers/Header";
import InputText from "./../../../components/Input/InputText";
import { getFont, HEIGHT, notifyMessage, WIDTH } from "./../../../configs/functions";
import ButtonText from "./../../../components/Button/ButtonText";
import { E_TYPE_BUTTON } from "./../../../types/emuns";
import R from "./../../../assets/R";
import Icon from "react-native-vector-icons/Ionicons";
import { postProduct } from "./../../../apis/functions/product";

const AddNewProduct = ({navigation, route}: any) => {
    const { onRefresh } = route.params;
    const name = useRef<string>("")
    const description = useRef<string>("")
    const brand = useRef<string>("")
    const standardPrice = useRef<string>("")
    const remaining = useRef<string>("")
    const categoryIds = useRef<any[]>()
    const resources = useRef<any[]>()
    const [loading, setLoading] = useState<boolean>(false)
    const [image, setImage] = useState<any>([{ addImage: true}]);
    const [onSubmit, setOnSubmit] = useState<boolean>(false)

    useEffect(() => {
        if (name.current.trim() !== "" && description.current.trim() !== "" && 
        brand.current.trim() !== "" && standardPrice.current.trim() !== "" &&
        remaining.current.trim() !== "" && image.length > 1) {
            setOnSubmit(true)
        } else {
            setOnSubmit(false)
        }
    }, [image, onSubmit])
    const pickImage = async () => {
        let result: any = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,
          allowsMultipleSelection: true
        });
        if (!result.canceled) {
          setImage([...image, ...result.assets]);
        }
    };
    const imageToBase64 = async (uri: string) => {
        const response = await fetch(uri);
        const blob = await response.blob();
      
        return new Promise((resolve, reject) => {
            const reader: any = new FileReader();
            reader.onload = () => {
                const base64String = reader.result.split(',')[1];
                resolve(base64String);
            };
            reader.onerror = (error: any) => reject(error);
            reader.readAsDataURL(blob);
        });
    };
    const deleteImage = (uri: string) => {
        const list = [...image]
        const index = image.findIndex((assets: any) => assets.uri === uri);
        if (index !== -1) {
            list.splice(index, 1);
        }
        setImage(list)
    }
    const handleSubmit = async () => {
        try {
            setLoading(true)
            let listImage: any[] = [];
            await Promise.all(
                image?.map(async (img: any) => {
                    if (!img?.addImage) {
                        const base64String = await imageToBase64(img?.uri);
                        listImage.push({
                            imageValue: base64String,
                        });
                        return true;
                    }
                    return false;
                })
            );
            const body: any = {
                name: name.current,
                description: description.current,
                brand: brand.current,
                standardPrice: Number(+standardPrice.current),
                remaining: Number(+remaining.current),
                categoryIds: [
                    "65720f73207ff81b1b7ecf6d"
                ],
                resources: [
                    ...listImage
                ],
            };
            // console.log('body', body, listImage);
            const res = await postProduct(body);
            if (res?.status === "OK") {
                notifyMessage(`${res?.message}`)
                navigation.goBack()
                onRefresh()
            } else {
                notifyMessage(`Có lỗi xảy ra!`)
            }

        } catch (err) {

        } finally {
            setLoading(false)
        }
    }
    
    const onChangeValue = (value: any, index: number) => {
        switch (index) {
            case 0: {
                name.current = value
              break
            }
            case 1: {
                description.current = value
              break
            }
            case 2: {
                categoryIds.current = value
              break
            }
            case 3: {
                brand.current = value
              break
            }
            case 4: {
                standardPrice.current = value          
              break
            }
            case 5: {
                remaining.current = value          
              break
            }
            default:
              break
        }
        if (name.current.trim() !== "" && description.current.trim() !== "" && 
        brand.current.trim() !== "" && standardPrice.current.trim() !== "" &&
        remaining.current.trim() !== "" && image.length > 1) {
            setOnSubmit(true)
        } else {
            setOnSubmit(false)
        }
    }
    return (
        <View>
            <Header
                isBack={true}
                isSearch={false}
                headerText={'Thêm sản phẩm'}
            />
            <View 
                style={{
                    backgroundColor: R.colors.white, 
                    width: '100%', 
                    height: HEIGHT(100),
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    paddingHorizontal: WIDTH(10),
                    marginTop: HEIGHT(2),
                    flexDirection: 'row'
                }}
            >
                {image?.map((assets: any, index: number) => {
                    if (assets.addImage) {
                        return <TouchableOpacity activeOpacity={0.6} onPress={pickImage} style={styles.formImage}>
                            <Text style={{color: R.colors.primary, fontSize: getFont(14)}}>Thêm ảnh</Text>
                        </TouchableOpacity>
                    }
                    if (index <= 2) {
                        return (
                            <View>
                                <TouchableOpacity 
                                    activeOpacity={0.6} 
                                    style={styles.iconClose}
                                    onPress={() => deleteImage(assets?.uri)}
                                >
                                    <Icon name="close" color={R.colors.white} size={15}/>
                                </TouchableOpacity>
                                <Image source={{ uri: assets?.uri }} style={{ width: 80, height: 80, resizeMode: 'cover', marginRight: WIDTH(10) }}/>
                            </View>
                        )
                    } else if (index <= 3 && image.length > 3) {
                        return <View style={styles.formImage}>
                            <Text style={{color: R.colors.primary, fontSize: getFont(14)}}>+{image.length - 3}</Text>
                        </View>
                    } else {
                        return <View></View>
                    }
                })}
            </View>
            <View style={{marginTop: HEIGHT(10), justifyContent: 'center'}}>
                <InputText
                    headerText="Tên sản phẩm"
                    required={true}
                    placeholder="Nhập tên sản phẩm"
                    // defaultValue={userInfo?.firstName}
                    onChangeValue={(value) => onChangeValue(value, 0)}
                />
                <InputText
                    headerText="Mô tả sản phẩm"
                    required={true}
                    // defaultValue={userInfo?.lastName}
                    placeholder="Nhập mô tả sản phẩm"
                    onChangeValue={(value) => onChangeValue(value, 1)}
                    customStyle={{marginBottom: HEIGHT(10)}}
                />
                <InputText
                    headerText="Dạnh mục"
                    required={true}
                    // defaultValue={userInfo?.lastName}
                    placeholder="..."
                    onChangeValue={(value) => onChangeValue(value, 2)}
                />
                <InputText
                    headerText="Thương hiệu"
                    required={true}
                    // defaultValue={userInfo?.lastName}
                    placeholder="..."
                    onChangeValue={(value) => onChangeValue(value, 3)}
                    customStyle={{marginBottom: HEIGHT(5)}}
                />
                <InputText 
                    headerText="Giá"
                    required={true}
                    isNumber={true}
                    placeholder="Đặt" 
                    // defaultValue={userInfo?.about}
                    onChangeValue={(value) => onChangeValue(value, 4)}
                />
                <InputText 
                    headerText="Kho hàng"
                    required={true}
                    isNumber={true}
                    placeholder="Số lượng" 
                    onChangeValue={(value) => onChangeValue(value, 5)}
                />
                <View style={{flexDirection: 'row', marginHorizontal: WIDTH(10)}}>
                    <ButtonText
                        title="Lưu" 
                        onPress={handleSubmit} 
                        type={E_TYPE_BUTTON.PRIMARY} 
                        customStyle={{width: '49%', height: HEIGHT(40), marginTop: HEIGHT(10)}}
                        customTitle={{fontSize: getFont(16)}}
                        isLoading={loading}
                        disabled={!onSubmit}
                    />
                    <ButtonText
                        title="Thoát" 
                        onPress={() => navigation.goBack()} 
                        type={E_TYPE_BUTTON.OUTLINE} 
                        customStyle={{width: '49%', height: HEIGHT(40), marginTop: HEIGHT(10), marginLeft: WIDTH(5)}}
                        customTitle={{fontSize: getFont(16)}}
                    />
                </View>
            </View>
        </View>
    )
}

export default AddNewProduct

const styles = StyleSheet.create({
    formImage: {
        width: WIDTH(80),
        height: HEIGHT(80),
        borderColor: R.colors.primary,
        borderWidth: 0.9,
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'dashed',
        marginRight: WIDTH(10),
    },
    iconClose: {
        position: 'absolute',
        top: -7,
        zIndex: 1,
        right: 3,
        width: WIDTH(15),
        alignItems: 'center',
        justifyContent: 'center',
        height: HEIGHT(15),
        borderRadius: WIDTH(10),
        backgroundColor: R.colors.borderC
    }
})