import APISauce, { ApiResponse } from "apisauce"
import { ErrorCode } from "./errorType"
import URL from "./url"
import AsyncStorage from "@react-native-async-storage/async-storage";

export type IRequest<P> = {
  endpoint: string
  params?: P
  query?: P
  showToast?: boolean
}

export type IResponse<R> = ApiResponse<R & ErrorCode> & {
  showToast?: boolean
}

export const rootServerInstance = APISauce.create({
  baseURL: URL.ROOT_API,
})
rootServerInstance.axiosInstance.interceptors.response.use(
  (response) => {
    console.log("response intercep", response)
    return response
  },
  async (error) => {
    // if (
    //   error.toString() === "Error: Request failed with status code 401" &&
    //   getActiveRouteState() !== ScreenName.Login &&
    //   getActiveRouteState() !== ScreenName.Register &&
    //   getActiveRouteState() !== ScreenName.Launching
    // ) {
    //   await logout()
    //   AsyncStorageUtils.remove(AsyncStorageUtils.KEY.USER_DATA)
    //   AsyncStorageUtils.remove(AsyncStorageUtils.KEY.PASSWORD)
    //   popupOk("Thông báo", "Phiên đăng nhập của bạn đã hết hạn, vui lòng đăng nhập lại!", () =>
    //     reset(ScreenName.Login),
    //   )
    // }
    return Promise.reject(error)
  },
)

const formdataConfig = {
  headers: {
    "Content-Type": "application/json",
  },
}

export async function getData<P, R>(request: IRequest<P>): Promise<IResponse<R>> {
  return await rootServerInstance
    .get<R & ErrorCode>(request.endpoint, request.params)
    .then((response: any) => {
      return response
    })
}
export async function postData<P, R>(request: IRequest<P>): Promise<IResponse<R>> {
  return await rootServerInstance
    .post<R & ErrorCode>(request.endpoint, request.params)
    .then((response: any) => {
      return response?.data
    })
}
export async function putData<P, R>(request: IRequest<P>): Promise<IResponse<R>> {
  return await rootServerInstance
    .put<R & ErrorCode>(request.endpoint, request.params, request.query)
    .then((response: any) => {
      return response?.data
    })
}
export async function delData<P, R>(request: IRequest<P>): Promise<IResponse<R>> {
  return await rootServerInstance
    .delete<R & ErrorCode>(request.endpoint, request.params)
    .then((response: any) => {
      return response?.data
    })
}

export async function postFormData<P, R>(request: IRequest<P>): Promise<IResponse<R>> {
  return await rootServerInstance
    .post<R & ErrorCode>(request.endpoint, request.params, formdataConfig)
    .then((response: any) => {
      return response?.data
    })
}

export async function putFormData<P, R>(request: IRequest<P>): Promise<IResponse<R>> {
  return await rootServerInstance
    .put<R & ErrorCode>(request.endpoint, request.params, { headers: { 'Content-Type': 'multipart/form-data'}})
    .then((response: any) => {
      return response?.data
    })
}
