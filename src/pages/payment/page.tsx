import { ReactComponent as Arrow } from 'incart-fe-common/src/icons/Right Arrow.svg'
import { Vexile } from '@haechi/flexile'
import { useAtomValue } from 'jotai'
import {
    PaymentReceiveAccountType,
    PAYMENT_PROVIDER_MAP,
    useSwitch,
    Header1,
    Header2,
    Button,
} from 'incart-fe-common'

import { storeAtom, wholePriceAtom } from '@/jotai'
import { Plink } from '@/components'

import parts from './parts'

export default () => {
    const price = useAtomValue(wholePriceAtom)
    const store = useAtomValue(storeAtom)

    const [_value, _, __, Switch] = useSwitch({
        items:
            store?.payment_receive_account?.map((account) => ({
                name: PAYMENT_PROVIDER_MAP[account.provider],
                key: account.provider,
            })) || [],
    })

    const value = _value as PaymentReceiveAccountType['provider']

    const accounts = new Map(
        store?.payment_receive_account?.map((account) => [
            account.provider,
            account,
        ])
    )

    const PaymentProvider = parts.PaymentProvider[value]

    return (
        <>
            <Vexile gap={3}>
                <Header1 purple>{price}원</Header1>
                <Header2>판매자의 통장으로 입금해주세요</Header2>
                {Switch}
            </Vexile>
            {PaymentProvider && (
                <PaymentProvider
                    account={accounts.get(value) as PaymentReceiveAccountType}
                    amount={price}
                />
            )}
            <Plink to="/order-complete" block>
                <Button icon={(props) => <Arrow {...props} />}>다음</Button>
            </Plink>
        </>
    )
}
