import { Hexile } from '@haechi/flexile'
import { styled } from 'incart-fe-common'
import { ReactComponent as Trash } from 'incart-fe-common/src/icons/Trash.svg'

export default {
    AmountWrapper: styled(Hexile, {
        border: '0.5rem solid transparent',
        borderBottomColor: 'black',
        backgroundColor: '$grey1',
        '&:focus-within': {
            borderColor: 'black',
        },
    }),
    Trash: styled(Trash, {
        width: '6rem',
        height: '6rem',
        color: '$grey4',
        animated: true,
        cursor: 'pointer',
        '&:hover': {
            color: '$purple',
            transform: 'scale(1.1)',
        },
        '&:active': {
            transform: 'scale(0.9)',
            filter: 'blur(1px)',
        },
    }),
}
