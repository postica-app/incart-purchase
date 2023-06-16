import { ReactComponent as Arrow } from 'incart-fe-common/src/icons/Right Arrow.svg'
import { Checkbox, Header2, RecheckButton, Text1 } from 'incart-fe-common'
import { useCallback, useMemo, useState } from 'react'
import { Hexile, Vexile } from '@haechi/flexile'
import { useNavigate } from 'react-router-dom'
import { useAtomValue } from 'jotai'
import immer from 'immer'

import {
    cartAtom,
    ordererInfoAtom,
    receiverInfoAtom,
    shippingInfoAtom,
} from '@/jotai'
import { toast } from '@/functions'
import action from './action'

export default () => {
    const receiver = useAtomValue(receiverInfoAtom)
    const shipping = useAtomValue(shippingInfoAtom)
    const orderer = useAtomValue(ordererInfoAtom)
    const cart = useAtomValue(cartAtom)
    const goto = useNavigate()

    const agreements = useMemo(
        () => [
            `사장님이 주문서를 확인하시면, 이메일(${orderer?.email})이나 휴대전화(${orderer?.phoneNumber})로 결제 관련 메일을 보내드려요`,
            `주문자님의 연락처가 올바르게 입력됐는지 다시 한번 확인해주세요`,
        ],
        [orderer]
    )
    const [hasChecked, setHasChecked] = useState(
        [...Array(agreements.length)].map(() => false)
    )

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
            <Header2>주문 관련 내용을 읽어주세요</Header2>
            <Vexile gap={6} filly y="bottom">
                {agreements.map((aggrement, i) => (
                    <Hexile gap={6}>
                        <Checkbox
                            onClick={() =>
                                setHasChecked((prev) =>
                                    immer(prev, (draft) => {
                                        draft[i] = !draft[i]
                                    })
                                )
                            }
                        >
                            <Text1>{aggrement}</Text1>
                        </Checkbox>
                    </Hexile>
                ))}
            </Vexile>
            <Vexile>
                <RecheckButton
                    icon={(props) => <Arrow {...props} />}
                    active={hasChecked.every(Boolean)}
                    onClick={createOrder}
                    onDisabledClick={() => {
                        toast('모든 항목에 동의해주세요')
                    }}
                >
                    주문서 접수하기
                </RecheckButton>
            </Vexile>
        </>
    )
}
