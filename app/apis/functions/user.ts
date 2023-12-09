import { delData, getData, postData, postFormData, putData } from "../helper"
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


export const putAccount = (body: any) => {
  return putData<any, any>({
    endpoint: `${URL.PUT_EDIT_ACCOUNT}`,
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