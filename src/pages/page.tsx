import { useAtom, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { channel, EVENTS } from '../channel'
// import { useNavigate } from 'react-router-dom'
import { cartAtom } from '../jotai'
import action from './action'

const isEqualArray = <T extends unknown = unknown>(a: T[], b: T[]) =>
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])

export default () => {
    const [cart, setCart] = useAtom(cartAtom)
    const goto = useNavigate()

    useEffect(() => {
        action.fetchProduct().then((productInfo) => {
            const cartItem = {
                product: productInfo.product,
                amount: 1,
                optionComponation: productInfo.option
                    ? [productInfo.option]
                    : [],
            }
            channel.postMessage(JSON.stringify({ type: EVENTS.CLOSE_POPUP }))
            setCart((prev) => {
                if (
                    prev.find(
                        (p) =>
                            p.product.id === productInfo.product.id &&
                            isEqualArray(
                                cartItem.optionComponation,
                                p.optionComponation
                            )
                    )
                ) {
                    alert('이미 장바구니에 담겨있는 상품입니다')
                    return prev
                }

                return [...prev, cartItem]
            })

            goto('/cart')
        })
    }, [])
    return <></>
}
