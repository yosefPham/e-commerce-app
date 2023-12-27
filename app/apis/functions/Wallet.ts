import { delData, getData, postData, postFormData, putData } from "../helper"
import URL from "../url"


export const postDepositMoney = (amount: number) => {
  return postData<any, any>({
    endpoint: `${URL.DEPOSITS}/request?amount=${amount}`,
    params: {},
  }).then((res: any) => res)
}

export const postWithDrawRequest = (amount: number) => {
  return postData<any, any>({
    endpoint: `${URL.WALLET}/withdraw/request?amount=${amount}`,
    params: {},
  }).then((res: any) => res)
}

export const putWithDrawSubmit = (id: string) => {
  return putData<any, any>({
    endpoint: `${URL.WALLET}/withdraw/submit/${id}`,
  }).then((res: any) => res)
}

export const putWithDrawConfirm = () => {
  return putData<any, any>({
    endpoint: `${URL.WALLET}/withdraw/confirm`,
  }).then((res: any) => res)
}

export const getDepositPending = () => {
  return getData<any, any>({
    endpoint: `${URL.WALLET}/pending`,
  }).then((res: any) => res)
}

export const getDetailWallet = () => {
  return getData<any, any>({
    endpoint: `${URL.GET_DETAIL_WALLET}`,
  }).then((res: any) => res)
}

export const getTrasactionHistoryMy = () => {
  return getData<any, any>({
    endpoint: `${URL.TRANSACTION}/owner`,
  }).then((res: any) => res)
}

export const getTrasactionByAdmin = (status: string) => {
  return getData<any, any>({
    endpoint: `${URL.WALLET}/manage?status=${status}`,
  }).then((res: any) => res)
}

export const putDepositManual = (id: string) => {
  return putData<any, any>({
    endpoint: `${URL.DEPOSITS}/manual_submit/${id}`,
  }).then((res: any) => res)
}

export const getTrasactionHistoryById = (id: string) => {
  return getData<any, any>({
    endpoint: `${URL.TRANSACTION}/detail/${id}`,
  }).then((res: any) => res)
}

export const getTrasactionHistoryAdmin = () => {
  return getData<any, any>({
    endpoint: `${URL.TRANSACTION}/owner`,
  }).then((res: any) => res)
}

