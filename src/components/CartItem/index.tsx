import {
    CartItemType,
    getCartItemPrice,
    Header2,
    Text2,
} from 'incart-fe-common'
import { Hexile, Vexile } from '@haechi/flexile'
import { useEffect, useMemo } from 'react'

import { useInlineInput } from '../InlineInput'
import Styles from './styles'

export const CartItem: React.FC<{
    item: CartItemType
    setAmount: (amount: number) => void
    onRemoveItem: () => void
}> = (props) => {
    const [changedAmount, input] = useInlineInput({
        init: props.item.amount,
        type: 'number',
        min: 0,
        step: 1,
        css: {
            textAlign: 'right',
            width: '10rem',
            'moz-appearance': 'none',
            outline: 'none',
            '&::-webkit-inner-spin-button': {
                appearance: 'none',
            },
        },
    })

    useEffect(() => {
        props.setAmount(changedAmount)
    }, [changedAmount])

    const price = useMemo(() => getCartItemPrice(props.item), [props.item])

    return (
        <Vexile gap={1}>
            <Header2>{props.item.product.name}</Header2>
            <Hexile x="space" y="bottom">
                <Text2 grey5>
                    {props.item.product.options
                        ?.map(
                            (option, index) =>
                                `${option.name}: ${props.item.selectedOptions[index]}`
                        )
                        .join('\n')}
                </Text2>
                <Hexile gap={2} y="center">
                    <Styles.AmountWrapper padding={1}>
                        {input}
                        <Text2>개</Text2>
                    </Styles.AmountWrapper>
                    <Text2>￦{price.toLocaleString()}</Text2>
                    <Styles.Trash onClick={props.onRemoveItem} />
                </Hexile>
            </Hexile>
        </Vexile>
    )
}
