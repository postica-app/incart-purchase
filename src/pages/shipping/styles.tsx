import { Vexile } from '@haechi/flexile'
import { styled } from 'incart-fe-common'

export const shippingMethod = {
    Wrapper: styled(Vexile, {
        borderRadius: '3rem',
        backgroundColor: 'white',
        clickAnimation: true,
        lightBorder: {
            withShadow: true,
            color: '$grey1',
        },
    }),
}
