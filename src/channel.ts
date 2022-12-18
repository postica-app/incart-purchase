export const channel = new BroadcastChannel('INCART_OPENED_CART')

export const EVENTS = {
    CLOSE_POPUP: 'CLOSE_POPUP',
    ADD_PRODUCT: 'ADD_PRODUCT',
    NEW_POPUP: 'NEW_POPUP',
    PREV_PRODUCTS: 'PREV_PRODUCTS',
} as const
