import {
    CartItemType,
    OrdererInfoType,
    ReceiverInfoType,
    ShippingInfoType,
} from 'incart-fe-common'
import { atomWithStorage } from 'jotai/utils'
import { atom } from 'jotai'

import { getCartItemPrice } from './functions'

export const cartAtom = atomWithStorage<CartItemType[]>(
    'CART',
    import.meta.env.DEV
        ? [
              {
                  product: {
                      id: 'b928a2e1-bde1-4563-9c5e-9feb653317fd',
                      name: '봉이워터 그레이트!',
                      store_id: 'ABABABB',
                      price: 1000,
                      options: [
                          {
                              name: '용량',
                              items: [
                                  {
                                      name: '기본',
                                      priceDelta: 0,
                                      info: '1인용입니다. 작습니다.',
                                  },
                                  {
                                      name: '라지',
                                      priceDelta: 1000,
                                  },
                              ],
                          },
                      ],
                      info: '봉이워터가 맛있대요',
                  },
                  amount: 1,
                  selectedOptions: ['기본'],
              },
          ]
        : []
)

export const ordererInfoAtom = atomWithStorage<OrdererInfoType | null>(
    'ORDERER_INFO',
    null
)

export const shippingInfoAtom = atomWithStorage<ShippingInfoType | null>(
    'SHIPPING_INFO',
    null
)

export const receiverInfoAtom = atom<ReceiverInfoType | null>(null)

export const wholePriceAtom = atom((get) => {
    const cart = get(cartAtom)
    const prices = cart.map((item) => getCartItemPrice(item))

    return prices.reduce((a, b) => a + b)
})
