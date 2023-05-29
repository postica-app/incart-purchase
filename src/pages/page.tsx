import { CartItemType } from 'incart-fe-common'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAtom, useSetAtom } from 'jotai'

import { channel, EVENTS } from '../channel'
import { isEqualArray } from '@/functions'
import { cartAtom } from '../jotai'
import action from './action'

export default () => {
    const setCart = useSetAtom(cartAtom)
    const goto = useNavigate()

    useEffect(() => {
        action
            .fetchProductFromQuery()
            .then((productInfo) => {
                const cartItem: CartItemType = {
                    product: productInfo.product,
                    amount: 1,
                    selectedOptions: productInfo.option
                        ? [productInfo.option]
                        : [],
                }
                channel.postMessage(
                    JSON.stringify({ type: EVENTS.CLOSE_POPUP })
                )

                setCart((prev) => {
                    if (
                        prev.find(
                            (p) =>
                                p.product.id === productInfo.product.id &&
                                isEqualArray(
                                    cartItem.selectedOptions,
                                    p.selectedOptions
                                )
                        )
                    ) {
                        alert('이미 장바구니에 담겨있는 상품입니다')
                        return prev
                    }

                    return [...prev, cartItem]
                })
            })
            .finally(() => {
                goto('/cart')
            })
    }, [])
    return <></>
}
