import { css } from 'incart-fe-common'
import _toast from 'react-hot-toast'

const style = css({
    fontSize: '4rem',
    border: '0.5rem solid $purpleLight',
    padding: '1rem',
    borderRadius: '12rem !important',
    '& :first-child': {
        color: '$purple',
        transform: 'scale(1) !important',
    },
    '& :nth-child(2)': {
        color: '$purple',
        margin: '0',
        fontWeight: 500,
    },
})()

export const toast = (content: string, emoji?: string) =>
    _toast(content, {
        icon: emoji,
        className: style.className,
    })
