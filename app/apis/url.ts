const ROOT = "http://192.168.41.2:8080"
// const ROOT = "http://192.168.3.108:8080"
// const ROOT = "http://192.168.117.182:8080"

console.log(ROOT)

const ROOT_API = ROOT

const URL = {
    ROOT_API,
    //Auth
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
    SIGN_UP: "/api/auth/sign-up",
    ACTIVE_ACCOUNT: "/api/auth/active-account",

    //User
    PUT_EDIT_ACCOUNT: "/api/auth/account/edit",
    GET_ACCOUNT: "/api/auth/account",
    PUT_AVATAR: "/api/auth/account/avatar",
    PUT_ROLE: "api/auth/assign",
    ADDRESS: "/api/auth/delivery",
    GET_ADDRESS: "/api/auth/delivery/list",

    //Wallet
    DEPOSITS: "/api/order/wallet/deposit",
    GET_DETAIL_WALLET: "/api/order/wallet/detail",

    //Transaction
    TRANSACTION: "/api/order/transaction",


    //Product
    POST_PRODUCT: "/api/product/create",
    PUT_PRODUCT: "/api/product/update",
    GET_LIST_MY_PRODUCT: "api/product/owner",
    DEL_PRODUCT: "/api/product/delete",
    GET_PRODUCT_BY_CLIENT: "/api/product/view/all",
    GET_PRODUCT_BY_ID: "/api/product/view",

    //Order
    ORDER_CART: "/api/order/cart",
    GET_CART: "/api/order/cart/owner",
    SIZE_OF_CART: "/api/order/cart/items/quantity",

    GET_ADDRESS_NAME: "https://provinces.open-api.vn/api",
    GET_LIST_BANK: "https://api.vietqr.io/v2/banks",
    GET_BIN_BANK: "https://api.vietqr.io/v2/android-app-deeplinks"


}

export default URL