import { useAtom, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { channel, EVENTS } from '../channel'
// import { useNavigate } from 'react-router-dom'
import { cartAtom } from '../jotai'
import action from './action'

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
            channel.postMessage(
                JSON.stringify({
                    event: EVENTS.ADD_PRODUCT,
                    data: cartItem,
                })
            )
            setCart((prev) => [...prev, cartItem])

            goto('/cart')
        })
    }, [])
    return <></>
}
