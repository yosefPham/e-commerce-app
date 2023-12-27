// const ROOT = "http://192.168.41.2:8080"
const ROOT = "http://192.168.3.103:8080"
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
    GET_ACCOUNT_BY_ADMIN: "/api/auth/moderator/account-list",
    PUT_AVATAR: "/api/auth/account/avatar",
    PUT_ROLE: "api/auth/assign",
    ADDRESS: "/api/auth/delivery",
    GET_ADDRESS: "/api/auth/delivery/list",

    //Wallet
    WALLET: "/api/order/wallet",
    DEPOSITS: "/api/order/wallet/deposit",
    GET_DETAIL_WALLET: "/api/order/wallet/detail",

    //Transaction 
    TRANSACTION: "/api/order/transaction",


    //Product
    POST_PRODUCT: "/api/product/create",
    PUT_PRODUCT: "/api/product/update",
    GET_LIST_MY_PRODUCT: "api/product/owner",
    GET_LIST_PRODUCT_BY_ADMIN: "api/product/moderator/all",
    GET_PRODUCT_IN_SHOP: "/api/product/shop/view",
    DEL_PRODUCT: "/api/product/delete",
    GET_PRODUCT_BY_CLIENT: "/api/product/view/all",
    GET_PRODUCT_BY_ID: "/api/product/view",

    //Order
    ORDER: "/api/order",
    ORDER_CART: "/api/order/cart",
    GET_CART: "/api/order/cart/owner",
    SIZE_OF_CART: "/api/order/cart/items/quantity",

    GET_ADDRESS_NAME: "https://provinces.open-api.vn/api",
    GET_LIST_BANK: "https://api.vietqr.io/v2/banks",
    GET_BIN_BANK: "https://api.vietqr.io/v2/android-app-deeplinks",
    CHECK_BANK_ACCOUNT: "https://api.vietqr.io/v2/lookup",

    //Notification
    NOTIFICATION: "/api/notification",
}

export default URL