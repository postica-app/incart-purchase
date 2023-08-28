import { Vexile } from '@haechi/flexile'
import {
    BankAccount,
    TossId,
    Text1,
    Text2,
    Header1,
    PaymentReceiveAccountType,
} from 'incart-fe-common'
import QRCode from 'react-qr-code'
import TossLogo from '@/asset/toss_logo.png'
import { SizedQR, TossImg } from './style'

const PaymentProvider = {
    BANK_ACCOUNT(props: {
        account: PaymentReceiveAccountType
        amount: number
    }) {
        const account = props.account as BankAccount
        return (
            <Vexile x="center" y="center" filly gap={6}>
                <Vexile x="center" gap={1}>
                    <Text1>
                        {account.data.bank} | {account.data.name}
                    </Text1>
                    <Header1>{account.data.account}</Header1>
                </Vexile>
                <Text2 grey5>위 계좌로 송금해주세요</Text2>
            </Vexile>
        )
    },
    TOSS_ID(props: { account: PaymentReceiveAccountType; amount: number }) {
        const account = props.account as TossId

        return (
            <Vexile x="center" y="center" filly gap={6}>
                <Vexile x="center" gap={0}>
                    <SizedQR
                        value={encodeURI(
                            'https://toss.me/' +
                                account.data.id +
                                '/' +
                                props.amount
                        )}
                    />
                    <TossImg src={TossLogo} />
                </Vexile>
                <Vexile x="center" gap={2}>
                    <Text1 center>
                        위 QR코드로 결제(토스 송금)를 완료해주세요
                    </Text1>
                    <Text2 center grey5>
                        토스아이디: {account.data.id}
                    </Text2>
                </Vexile>
            </Vexile>
        )
    },
}

export default {
    PaymentProvider,
}
