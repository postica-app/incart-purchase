import { Hexile } from '@haechi/flexile'
import { Divider, ShippingMethodType, Text2 } from 'incart-fe-common'
import { shippingMethod } from './styles'

export default {
    ShippingMethod(props: {
        shippingMethod: ShippingMethodType
        onClick?: () => void
    }) {
        return (
            <shippingMethod.Wrapper padding={6} gap={4} onClick={props.onClick}>
                <Hexile x="space" gap={2}>
                    <Text2>{props.shippingMethod.name}</Text2>
                    <Text2 grey5>
                        {props.shippingMethod.price.toLocaleString()}원
                    </Text2>
                </Hexile>
                {props.shippingMethod.info && (
                    <>
                        <Divider grey1 />
                        <Text2 grey5>{props.shippingMethod.info}</Text2>
                    </>
                )}
            </shippingMethod.Wrapper>
        )
    },
}
