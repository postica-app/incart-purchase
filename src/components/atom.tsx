import { styled } from 'incart-fe-common'
import { Link } from 'react-router-dom'

export const Plink = styled(Link, {
    color: 'unset',
    textDecoration: 'none',
    variants: {
        animation: {
            true: {
                clickAnimation: true,
            },
        },
        block: {
            true: {
                flexDirection: 'column',
                display: 'flex',
                alignItems: 'stretch',
                justifyContent: 'stretch',
            },
        },
    },
})

export const Pform = styled('form', {
    variants: {
        filly: {
            true: { flex: 1 },
        },
    },
})
