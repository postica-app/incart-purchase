import { styled } from 'incart-fe-common'
import QRCode from 'react-qr-code'

export const TossImg = styled('img', {
    width: '30rem',
})

export const SizedQR = styled(QRCode, {
    width: '48rem',
    height: '48rem',
    maxWidth: '100%',
})
