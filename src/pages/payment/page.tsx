import { ReactComponent as Arrow } from 'incart-fe-common/src/icons/Right Arrow.svg'
import { useNavigate } from 'react-router-dom'
import { Vexile } from '@haechi/flexile'
import { useAtomValue } from 'jotai'
import { useCallback } from 'react'
import toast from 'react-hot-toast'
import {
    PaymentReceiveAccountType,
    PAYMENT_PROVIDER_MAP,
    RecheckButton,
    useSwitch,
    Header1,
    Header2,
} from 'incart-fe-common'

import {
    receiverInfoAtom,
    shippingInfoAtom,
    ordererInfoAtom,
    wholePriceAtom,
    storeAtom,
    cartAtom,
} from '@/jotai'

import action from '../check-agreement/action'
import parts from './parts'

export default () => {
    const price = useAtomValue(wholePriceAtom)
    const store = useAtomValue(storeAtom)
    const receiver = useAtomValue(receiverInfoAtom)
    const shipping = useAtomValue(shippingInfoAtom)
    const orderer = useAtomValue(ordererInfoAtom)
    const cart = useAtomValue(cartAtom)

    const goto = useNavigate()

    const [_value, _, __, Switch] = useSwitch({
        items:
            store?.payment_receive_account?.map((account) => ({
                name: PAYMENT_PROVIDER_MAP[account.provider],
                key: account.provider,
            })) || [],
    })

    const value = _value as PaymentReceiveAccountType['provider']

    const accounts = new Map(
        store?.payment_receive_account?.map((account) => [
            account.provider,
            account,
        ])
    )

    const PaymentProvider = parts.PaymentProvider[value]

    const createOrder = useCallback(async () => {
        if (!receiver || !shipping || !orderer || !cart) {
            toast('주문서에 필요한 정보가 부족합니다')
            goto('/cart')

            return
        }

        try {
            await action.createOrder({
                orderer,
                receiver,
                shipping,
                cart: cart.map((item) => ({
                    ...item,
                    product_id: item.product.id,
                })),
            })

            goto('/order-complete')
        } catch (e) {
            toast('주문서를 전달하는데 실패했습니다')
            goto('/cart')
        }
    }, [receiver, shipping, orderer, cart])

    return (
        <>
            <Vexile gap={3}>
                <Header1 purple>{price}원</Header1>
                <Header2>판매자의 통장으로 입금해주세요</Header2>
                {Switch}
            </Vexile>
            {PaymentProvider && (
                <PaymentProvider
                    account={accounts.get(value) as PaymentReceiveAccountType}
                    amount={price}
                />
            )}
            <Vexile>
                <RecheckButton
                    icon={(props) => <Arrow {...props} />}
                    onClick={createOrder}
                >
                    결제 완료
                </RecheckButton>
            </Vexile>
        </>
    )
}
