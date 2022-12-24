import kakaopay from 'incart-fe-common/src/images/kakaopay.png'
import toss from 'incart-fe-common/src/images/toss.png'

export default {
    tossID: {
        createPaymentURL: (key: string, amount: number) =>
            `https://toss.me/${encodeURIComponent(key)}/${amount}`,
        name: '토스 송금',
        image: toss,
    },
    KakaopayQR: {
        createPaymentURL: (key: string, amount: number) =>
            'kakaotalk://kakaopay/money/to/qr?qr_code=' +
            key +
            (amount * 2 ** 19).toString(16),
        name: '카카오페이 송금',
        image: kakaopay,
    },
}
