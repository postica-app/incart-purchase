import {
    bottomSheetAtom,
    cartAtom,
    ordererInfoAtom,
    receiverInfoAtom,
    wholePriceAtom,
} from '@/jotai'
import { ReactComponent as Arrow } from 'incart-fe-common/src/icons/Right Arrow.svg'
import { Button, Header2, Text1, Text2 } from 'incart-fe-common'
import { useCallback, useEffect, useState } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { Vexile } from '@haechi/flexile'
import immer from 'immer'

import { OrdererPanel, ReceiverPanel } from '@/components'
import Style from './style'
import Parts from './parts'
import { toast } from '@/functions'

export default () => {
    const setBottomSheetContent = useSetAtom(bottomSheetAtom)
    const receiver = useAtomValue(receiverInfoAtom)
    const orderer = useAtomValue(ordererInfoAtom)
    const price = useAtomValue(wholePriceAtom)
    const cart = useAtomValue(cartAtom)
    const goto = useNavigate()

    useEffect(() => {
        if (cart.length === 0) {
            alert('장바구니가 비어있습니다')
            goto('/')
        }

        if (!orderer) {
            alert('주문자 정보가 없습니다')
            goto('/orderer')
        }
    }, [cart, price, orderer])

    const clearBottomSheet = useCallback(() => {
        setBottomSheetContent(null)
    }, [])

    const checkItems = [
        {
            name: '상품',
            value:
                cart.map((p) => p.amount).reduce((a, b) => a + b, 0) +
                '개, ' +
                price +
                '원',
            Modal: () => <Parts.Cart onClose={clearBottomSheet} />,
        },
        {
            name: '주문한 사람',
            value: orderer?.name + ' 님',
            Modal: () => (
                <OrdererPanel
                    button={{
                        text: '맞습니다',
                        onClick: clearBottomSheet,
                    }}
                />
            ),
        },
        {
            name: '받는 사람',
            value: receiver?.name + ' 님',
            Modal: () => (
                <ReceiverPanel
                    button={{
                        text: '맞습니다',
                        onClick: clearBottomSheet,
                    }}
                />
            ),
        },
    ]

    const [hasChecked, setHasChecked] = useState(
        [...Array(checkItems.length)].map(() => false)
    )

    const onChecklistClicked = useCallback((index: number) => {
        setHasChecked((prev) =>
            immer(prev, (draft) => {
                draft[index] = true
            })
        )
        setBottomSheetContent(checkItems[index].Modal)
    }, [])

    console.log(hasChecked)

    return (
        <Vexile gap={6} filly>
            <Header2>주문 정보를 확인해주세요</Header2>
            <Vexile gap={3} filly>
                {checkItems.map((item, index) => (
                    <Style.CheckItem
                        x="space"
                        padding={6}
                        key={item.name}
                        checked={hasChecked[index]}
                        onClick={() => onChecklistClicked(index)}
                    >
                        <Text1>{item.name}</Text1>
                        <Text1 grey5>{item.value}</Text1>
                    </Style.CheckItem>
                ))}
            </Vexile>
            <Text2 center>
                각 주문 정보를 모두 눌러서 <br />
                틀린 정보가 없는지 확인해주세요
            </Text2>
            <Button
                active={hasChecked.every(Boolean)}
                icon={(style) => <Arrow style={style} />}
                onDisabledClick={() =>
                    toast('모든 정보를 눌러서 확인해주세요', '⚠️')
                }
                onClick={() => goto('/check-agreement')}
            >
                다음
            </Button>
        </Vexile>
    )
}
