import { Header2, ShippingMethodType } from 'incart-fe-common'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Vexile } from '@haechi/flexile'
import { useAtomValue } from 'jotai'

import { toast } from '@/functions'
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
                toast('🚨', '상점 정보를 불러오는데 실패했습니다')
                console.log(e)
                goto('/cart')
            }
        })()
    }, [cart])

    const onClick = useCallback((methodName: string) => {
        goto('/shipping/' + methodName)
    }, [])

    return (
        // <Vexile gap={6} filly>
        <>
            <Header2>상품을 받을 방법을 골라주세요</Header2>
            <Vexile gap={3}>
                {shippingMethods &&
                    shippingMethods.map((method) => (
                        <Parts.ShippingMethod
                            onClick={() => onClick(method.name)}
                            shippingMethod={method}
                            key={method.name}
                        />
                    ))}
            </Vexile>
        </>
        // </Vexile>
    )
}
