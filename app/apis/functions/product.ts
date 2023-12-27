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

export const getProductsByAdmin = (page?: number, limit?: number, sort?: string ) => {
  return getData<any, any>({
    endpoint: `${URL.GET_LIST_PRODUCT_BY_ADMIN}?pageNo=${page}&pageSize=${limit}&sortBy=${sort}&sortDir=des`,
  }).then((res: any) => res)
}

export const getOneProduct = (id?: string ) => {
  return getData<any, any>({
    endpoint: `${URL.GET_PRODUCT_BY_ID}/${id}`,
  }).then((res: any) => res)
}

export const getProductSearch = (text?: string ) => {
  return getData<any, any>({
    endpoint: `${URL.GET_PRODUCT_BY_ID}/search?keyword=${text}`,
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

export const postOrder = (formData: number) => {
  return postData<any, any>({
    endpoint: `${URL.ORDER}/create`,
    params: formData
  }).then((res: any) => res)
}

export const putStatusDoneOrderByBuy = (id: string) => {
  return putData<any, any>({
    endpoint: `${URL.ORDER}/done/${id}`,
  }).then((res: any) => res)
}

export const putStatusCancelOrderByBuy = (id: string) => {
  return putData<any, any>({
    endpoint: `${URL.ORDER}/cancel/${id}`,
  }).then((res: any) => res)
}

export const putStatusOrderBySell = (id: string, status: string) => {
  return putData<any, any>({
    endpoint: `${URL.ORDER}/${status}/${id}`,
  }).then((res: any) => res)
}


export const getListOrder = (status: string, type: string) => {
  return getData<any, any>({
    endpoint: `${URL.ORDER}/owner/list?status=${status}&type=${type}`,
  }).then((res: any) => res)
}

export const getSizeOfCart = () => {
  return getData<any, any>({
    endpoint: `${URL.SIZE_OF_CART}`,
  }).then((res: any) => res)
}

export const getListProductClient = (page?: number, limit?: number, sort?: string, key?: string ) => {
  return getData<any, any>({
    endpoint: `${URL.GET_PRODUCT_BY_CLIENT}?pageNo=${page}&pageSize=${limit}&sortBy=${sort}&sortDir=des&key=${key}`,
  }).then((res: any) => res)
}

export const getListProductInShop = (id: string, page?: number, limit?: number) => {
  return getData<any, any>({
    endpoint: `${URL.GET_PRODUCT_IN_SHOP}/${id}?pageNo=${page}&pageSize=${limit}`,
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
