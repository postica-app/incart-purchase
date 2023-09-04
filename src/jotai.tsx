import {
    CartItemType,
    OrdererInfoType,
    ReceiverInfoType,
    ShippingInfoType,
    getCartItemPrice,
} from 'incart-fe-common'
import { atomWithStorage } from 'jotai/utils'
import { atom } from 'jotai'
import { fetchStoreInfo } from './functions'

export const cartAtom = atomWithStorage<CartItemType[]>('CART', [])

export const ordererInfoAtom = atomWithStorage<OrdererInfoType | null>(
    'ORDERER_INFO',
    null
)

export const shippingInfoAtom = atomWithStorage<ShippingInfoType | null>(
    'SHIPPING_INFO',
    null
)

export const receiverInfoAtom = atomWithStorage<ReceiverInfoType | null>(
    'RECEIVER_INFO',
    null
)

export const bottomSheetAtom = atom<React.ReactNode | null>(null)

export const shippingFeeAtom = atomWithStorage('SHIPPING_FEE', 0)

export const wholePriceAtom = atom((get) => {
    const cart = get(cartAtom)
    if (cart.length === 0) return 0

    const prices = cart.map((item) => getCartItemPrice(item))
    return prices.reduce((a, b) => a + b) + get(shippingFeeAtom)
})

export const storeAtom = atom(async (get) => {
    const cart = get(cartAtom)
    if (cart.length === 0) return null

    return await fetchStoreInfo(cart[0].product.store_rid)
})
