import { delData, getData, postData, postFormData, putData, putFormData } from "../helper"
import URL from "../url"


export const login = (body: any) => {
  return postData<any, any>({
    endpoint: URL.LOGIN,
    params: body,
  }).then((res: any) => res)
}

export const logout = (body: any) => {
  return postData<any, any>({
    endpoint: URL.LOGOUT,
    params: body,
  }).then((res: any) => res)
}

export const signup = (body: any) => {
  return postData<any, any>({
    endpoint: URL.SIGN_UP,
    params: body,
  }).then((res: any) => res)
}

export const activeAccount = (body: any, codes: string) => {
  return postData<any, any>({
    endpoint: `${URL.ACTIVE_ACCOUNT}?active_key=${codes}`,
    params: body,
  }).then((res: any) => res)
}

export const getListAddressUser = () => {
  return getData<any, any>({
    endpoint: `${URL.ADDRESS}/list`,
    params: {},
  }).then((res: any) => res)
}

export const getAccountByAmdin = (page?: number, limit?: number, sort?: string ) => {
  return getData<any, any>({
    endpoint: `${URL.GET_ACCOUNT_BY_ADMIN}?pageNo=${page}&pageSize=${limit}&sortBy=${sort}&sortDir=des`,
  }).then((res: any) => res)
}

export const postAddress = (body: any) => {
  return postData<any, any>({
    endpoint: `${URL.ADDRESS}/create`,
    params: body,
  }).then((res: any) => res)
}

export const putDefaultAddress = (id: string) => {
  return putData<any, any>({
    endpoint: `${URL.ADDRESS}/default-set/${id}`,
  }).then((res: any) => res)
}

export const putAddress = (id: string, body: any) => {
  return putData<any, any>({
    endpoint: `${URL.ADDRESS}/update/${id}`,
    params: body,
  }).then((res: any) => res)
}

export const delAddress = (id: string) => {
  return delData<any, any>({
    endpoint: `${URL.ADDRESS}/delete/${id}`,
  }).then((res: any) => res)
}

export const putAccount = (body: any) => {
  return putData<any, any>({
    endpoint: `${URL.PUT_EDIT_ACCOUNT}`,
    params: body,
  }).then((res: any) => res)
}

export const putAvatar = (body: any) => {
  return putFormData<any, any>({
    endpoint: `${URL.PUT_AVATAR}`,
    params: body,
  }).then((res: any) => res)
}

export const getAccount = (id: string) => {
  return getData<any, any>({
    endpoint: `${URL.GET_ACCOUNT}/${id}`
  }).then((res: any) => res)
}

export const getListAddress = () => {
  return getData<any, any>({
    endpoint: `${URL.GET_ADDRESS_NAME}/p`
  }).then((res: any) => res)
}

export const getListDistrict = (id: number) => {
  return getData<any, any>({
    endpoint: `${URL.GET_ADDRESS_NAME}/p/${id}?depth=2`
  }).then((res: any) => res)
}

export const getListWards = (id: number) => {
  return getData<any, any>({
    endpoint: `${URL.GET_ADDRESS_NAME}/d/${id}?depth=2`
  }).then((res: any) => res)
}

export const getListBank = () =>
  getData<any, any>({
    endpoint: `${URL.GET_LIST_BANK}`,
    params: {},
  }).then((res) => res.data)

export const getListBinBank = () =>
  getData<any, any>({
    endpoint: `${URL.GET_BIN_BANK}`,
    params: {}
  }).then((res) => res.data)

export const postCheckBankAccount = (body: any) => {
  return postData<any, any>({
    endpoint: `${URL.CHECK_BANK_ACCOUNT}`,
    params: body,
  }).then((res: any) => res)
}

export const getNotifications = () => {
  return getData<any, any>({
    endpoint: `${URL.NOTIFICATION}/all`,
  }).then((res) => res.data)
}

export const putNoti = (id: string) => {
  return putData<any, any>({
    endpoint: `${URL.NOTIFICATION}/seen/${id}`,
  }).then((res) => res.data)
}
