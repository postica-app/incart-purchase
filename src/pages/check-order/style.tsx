import { Hexile } from '@haechi/flexile'
import { styled } from 'incart-fe-common'

export default {
    CheckItem: styled(Hexile, {
        borderRadius: '3rem',
        variants: {
            checked: {
                true: {
                    lightBorder: {
                        color: '$purple',
                    },
                },
                false: {
                    lightBorder: {
                        color: '$grey1',
                    },
                },
            },
        },
    }),
}
