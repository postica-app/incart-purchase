import emptyHandImage from 'incart-fe-common/src/images/empty-hand.png'
import { useCallback, useEffect, useRef } from 'react'
import { Text1, Text2 } from 'incart-fe-common'
import autoAnimate from '@formkit/auto-animate'
import { Vexile } from '@haechi/flexile'
import { useAtom } from 'jotai'

import { CartItem } from '../../components'
import { cartAtom } from '../../jotai'
import Styles from './styles'

export default () => {
    const [cart, setCart] = useAtom(cartAtom)
    const parent = useRef(null)

    useEffect(() => {
        parent.current && autoAnimate(parent.current)
    }, [parent])

    const removeItem = useCallback((index: number) => {
        setCart((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)])
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
        <Vexile filly>
            <Styles.CartListWrapper ref={parent}>
                {cart.map((item, index) => (
                    <CartItem
                        key={item.product.id + item.optionComponation.join('/')}
                        setAmount={console.log}
                        item={item}
                        onRemoveItem={() => removeItem(index)}
                    />
                ))}
            </Styles.CartListWrapper>
        </Vexile>
    )
}
