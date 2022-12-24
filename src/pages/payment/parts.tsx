import { PaymentReceiveAccountType, Text2, useSwitch } from 'incart-fe-common'
import { useNavigate } from 'react-router-dom'
import { Vexile } from '@haechi/flexile'
import { useMemo } from 'react'
import QR from 'react-qr-code'

import Styles from './styles'
import providers from './providers'

export default {
    QRPayment(props: {
        paymentReceiveAccount: PaymentReceiveAccountType
        amount: number
    }) {
        const goto = useNavigate()

        const [value, setValue, setErrorMessage, Switch] = useSwitch({
            items: props.paymentReceiveAccount.other.map((provider) => ({
                name: providers[provider.type].name,
                key: provider.type,
            })),
        })

        const selectedProvider = useMemo(() => {
            const provider = props.paymentReceiveAccount.other.find(
                (provider) => provider.type === value
            )

            if (!provider) {
                goto('/cart')
                throw new Error('Provider not found')
            }

            return provider
        }, [value, props.paymentReceiveAccount])

        return (
            <>
                {Switch}
                <Vexile
                    gap={1}
                    x="center"
                    onClick={() => {
                        prompt(
                            '다음 계좌번호로 송금해주세요',
                            props.paymentReceiveAccount.bankAccount.bank +
                                ' ' +
                                props.paymentReceiveAccount.bankAccount
                                    .accountNumber
                        )
                    }}
                >
                    <Text2 grey5>간편송금을 사용하지 않으신다면?</Text2>
                    <Text2 underline purple>
                        계좌번호로 직접 부치기
                    </Text2>
                </Vexile>
                <Vexile filly x="center" y="center" gap={4}>
                    <Vexile x="center" gap={2}>
                        <QR
                            value={providers[
                                selectedProvider.type
                            ].createPaymentURL(
                                selectedProvider.key,
                                props.amount
                            )}
                            style={{ width: '40rem', height: '40rem' }}
                        />
                        <Styles.QRProviderIcon
                            src={providers[selectedProvider.type].image}
                        />
                    </Vexile>
                    <Text2 center spatial purple>
                        토스아이디 <b>새하얗게웃던날을</b>를
                        <br /> 꼭 확인해주세요
                    </Text2>
                </Vexile>
            </>
        )
    },
}
