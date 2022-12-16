import { Text2 } from 'incart-fe-common'
import { useAtom } from 'jotai'
import { cartAtom } from '../../jotai'

export default () => {
    const [cart, setCart] = useAtom(cartAtom)
    return (
        <h1>
            <Text2>{JSON.stringify(cart)}</Text2>
        </h1>
    )
}
