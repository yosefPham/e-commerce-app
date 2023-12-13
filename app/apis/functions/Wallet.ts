import { delData, getData, postData, postFormData, putData } from "../helper"
import URL from "../url"


export const postDepositMoney = (amount: number) => {
  return postData<any, any>({
    endpoint: `${URL.DEPOSITS}/request?amount=${amount}`,
    params: {},
  }).then((res: any) => res)
}

export const getDepositPending = () => {
  return getData<any, any>({
    endpoint: `${URL.DEPOSITS}/pending`,
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

