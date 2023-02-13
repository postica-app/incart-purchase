import emptyHandImage from 'incart-fe-common/src/images/empty-hand.png'
import { useCallback, useEffect, useRef } from 'react'
import { CartItemType, Text1 } from 'incart-fe-common'
import autoAnimate from '@formkit/auto-animate'
import { Vexile } from '@haechi/flexile'
import { useAtom } from 'jotai'
import immer from 'immer'

import { cartAtom } from '@/jotai'
import { CartItem } from '../CartItem'
import Style from './style'

const CartItemListView: React.FC<{
    cart: CartItemType[]
    setAmount: (index: number, amount: number) => void
    removeItem: (index: number) => void
}> = (props) => {
    const parent = useRef(null)

    useEffect(() => {
        parent.current && autoAnimate(parent.current)
    }, [parent])

    return (
        <Style.CartListWrapper ref={parent}>
            {props.cart.map((item, index) => (
                <CartItem
                    key={item.product.id + item.selectedOptions.join('/')}
                    setAmount={(amount) => props.setAmount(index, amount)}
                    item={item}
                    onRemoveItem={() => props.removeItem(index)}
                />
            ))}
        </Style.CartListWrapper>
    )
}

export const CartItemList = () => {
    const [cart, setCart] = useAtom(cartAtom)

    const removeItem = useCallback((index: number) => {
        setCart((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)])
    }, [])

    const setAmount = useCallback((index: number, amount: number) => {
        setCart((prev) =>
            immer(prev, (_prev) => {
                _prev[index].amount = amount
            })
        )
    }, [])

    if (cart.length === 0) {
        return (
            <Vexile x="center" y="center" gap={12} filly>
                <Text1 center grey5>
                    장바구니가 비어있습니다
                    <br />
                    상품을 추가해보세요
                </Text1>
                <img src={emptyHandImage} />
            </Vexile>
        )
    }

    return (
        <CartItemListView
            cart={cart}
            setAmount={setAmount}
            removeItem={removeItem}
        />
    )
}
