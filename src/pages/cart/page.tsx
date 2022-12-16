import { Vexile } from '@haechi/flexile'
import { Text1, Text2 } from 'incart-fe-common'
import emptyHandImage from 'incart-fe-common/src/images/empty-hand.png'
import { useAtom } from 'jotai'
import { cartAtom } from '../../jotai'

export default () => {
    const [cart, setCart] = useAtom(cartAtom)
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
        <h1>
            <Text2>{JSON.stringify(cart)}</Text2>
        </h1>
    )
}
