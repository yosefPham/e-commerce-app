const ROOT = "http://192.168.41.4:8080"
// const ROOT = "http://192.168.3.108:8080"

console.log(ROOT)

const ROOT_API = ROOT

const URL = {
    ROOT_API,
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
    SIGN_UP: "/api/auth/sign-up",
    ACTIVE_ACCOUNT: "/api/auth/active-account",

    PUT_EDIT_ACCOUNT: "/api/auth/account/edit",
    GET_ACCOUNT: "api/auth/account",
    PUT_AVATAR: "/api/auth/account/avatar",
    PUT_ROLE: "api/auth/assign",

    POST_PRODUCT: "/api/product/create",
    PUT_PRODUCT: "/api/product/update",
    GET_LIST_MY_PRODUCT: "api/product/owner",
    DEL_PRODUCT: "/api/product/delete",
    GET_PRODUCT_BY_CLIENT: "/api/product/view/all",

    GET_ADDRESS_NAME: "https://provinces.open-api.vn/api"
}

export default URL