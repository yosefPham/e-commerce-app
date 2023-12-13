import { delData, getData, postData, postFormData, putData } from "../helper"
import URL from "../url"


export const postProduct = (body: any) => {
  return postFormData<any, any>({
    endpoint: `${URL.POST_PRODUCT}`,
    params: body,
  }).then((res: any) => res)
}

export const getListProductOwner = (page?: number, limit?: number, sort?: string ) => {
  return getData<any, any>({
    endpoint: `${URL.GET_LIST_MY_PRODUCT}?pageNo=${page}&pageSize=${limit}&sortBy=${sort}&sortDir=des`,
  }).then((res: any) => res)
}

export const getOneProduct = (id?: string ) => {
  return getData<any, any>({
    endpoint: `${URL.GET_PRODUCT_BY_ID}/${id}`,
  }).then((res: any) => res)
}

export const getListProductOwnerOfCart = () => {
  return getData<any, any>({
    endpoint: `${URL.GET_CART}`,
  }).then((res: any) => res)
}

export const postToCart = (id: string, quantity: number) => {
  return postData<any, any>({
    endpoint: `${URL.ORDER_CART}/insert?productId=${id}&quantity=${quantity}`,
  }).then((res: any) => res)
}

export const getSizeOfCart = () => {
  return getData<any, any>({
    endpoint: `${URL.SIZE_OF_CART}`,
  }).then((res: any) => res)
}

export const getListProductClient = (page?: number, limit?: number, sort?: string, key?: string ) => {
  console.log(`${URL.GET_PRODUCT_BY_CLIENT}?pageNo=${page}&pageSize=${limit}&sortBy=${sort}&sortDir=des&key=${key}`)
  return getData<any, any>({
    endpoint: `${URL.GET_PRODUCT_BY_CLIENT}?pageNo=${page}&pageSize=${limit}&sortBy=${sort}&sortDir=des&key=${key}`,
  }).then((res: any) => res)
}

export const delProduct = (id: string ) => {
  return delData<any, any>({
    endpoint: `${URL.DEL_PRODUCT}/${id}`,
  }).then((res: any) => res)
}

export const delProductOfCart = (id: string ) => {
  return delData<any, any>({
    endpoint: `${URL.ORDER_CART}/delete/${id}`,
  }).then((res: any) => res)
}
