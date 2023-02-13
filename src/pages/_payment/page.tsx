import { ReactComponent as Arrow } from 'incart-fe-common/src/icons/Right Arrow.svg'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button, Header1, Header2 } from 'incart-fe-common'
import { useCallback, useMemo } from 'react'
import { useAtomValue } from 'jotai'
import { Vexile } from '@haechi/flexile'

import {
    receiverInfoAtom,
    shippingInfoAtom,
    ordererInfoAtom,
    wholePriceAtom,
    cartAtom,
} from '@/jotai'
import { getCachedStoreInfo } from '@/functions'
import actions from './actions'
import Parts from './parts'

export default () => {
    const shippingMethodName = useSearchParams()[0].get('shippingMethod')

    const wholePrice = useAtomValue(wholePriceAtom)
    const cart = useAtomValue(cartAtom)
    const orderer = useAtomValue(ordererInfoAtom)
    const shipping = useAtomValue(shippingInfoAtom)
    const receiver = useAtomValue(receiverInfoAtom)

    const goto = useNavigate()

    const store = useMemo(() => {
        const _store = getCachedStoreInfo(cart[0].product.store_id)

        if (!_store) {
            goto('/cart')
            throw new Error('Store not found')
        }

        return _store
    }, [cart])

    const shippingPrice = useMemo(
        () =>
            store?.shipping_method.find(
                (method) => method.name === shippingMethodName
            )?.price || 0,
        [store, shippingMethodName]
    )

    const wholePriceWithShipping = useMemo(
        () => wholePrice + shippingPrice,
        [wholePrice, shippingPrice]
    )

    const onClick = useCallback(async () => {
        if (!orderer || !shipping || !receiver) {
            alert('정보를 모두 입력해주세요')
            return
        }

        await actions.createOrder({
            cart: cart.map((item) => ({
                ...item,
                product_id: item.product.id,
            })),
            orderer,
            shipping,
            receiver,
        })
    }, [cart, orderer, shipping, receiver])

    return (
        <>
            <Vexile gap={6} filly>
                <Vexile gap={3}>
                    <Header1 purple>
                        {wholePriceWithShipping.toLocaleString()}원
                    </Header1>
                    <Header2>판매자의 통장으로 입금해주세요</Header2>
                </Vexile>
                {store.payment_receive_account.other.length > 0 ? (
                    <Parts.QRPayment
                        paymentReceiveAccount={store.payment_receive_account}
                        amount={wholePriceWithShipping}
                    />
                ) : (
                    <h1>준비중</h1>
                )}
            </Vexile>
            <Button onClick={onClick} icon={(style) => <Arrow style={style} />}>
                다음
            </Button>
        </>
    )
}
