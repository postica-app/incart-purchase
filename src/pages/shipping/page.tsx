import { useNavigate } from 'react-router-dom'
import { Header2, ShippingMethodType } from 'incart-fe-common'
import { Vexile } from '@haechi/flexile'
import { useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'

import { cartAtom } from '@/jotai'
import action from './action'
import Parts from './parts'

export default () => {
    const [shippingMethods, setShippingMethod] =
        useState<ShippingMethodType[]>()
    const cart = useAtomValue(cartAtom)
    const goto = useNavigate()

    useEffect(() => {
        ;(async () => {
            try {
                const { shipping_method } = await action.getStoreFromCart(cart)
                setShippingMethod(shipping_method)
            } catch (e) {
                goto('/cart')
            }
        })()
    }, [cart])

    return (
        <Vexile gap={6} filly>
            <Header2>상품을 받을 방법을 골라주세요</Header2>
            <Vexile gap={3}>
                {shippingMethods &&
                    shippingMethods.map((method) => (
                        <Parts.ShippingMethod
                            shippingMethod={method}
                            key={method.name}
                        />
                    ))}
            </Vexile>
        </Vexile>
    )
}
