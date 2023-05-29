import { useNavigate } from 'react-router-dom'
import { Header2 } from 'incart-fe-common'
import { Vexile } from '@haechi/flexile'
import { useAtomValue } from 'jotai'
import { useCallback } from 'react'
import { storeAtom } from '@/jotai'

import Parts from './parts'

export default () => {
    const store = useAtomValue(storeAtom)
    const goto = useNavigate()

    const onClick = useCallback((methodName: string) => {
        goto('/shipping/' + methodName)
    }, [])

    return (
        <>
            <Header2>상품을 받을 방법을 골라주세요</Header2>
            <Vexile gap={3}>
                {store &&
                    store.shipping_method.map((method) => (
                        <Parts.ShippingMethod
                            onClick={() => onClick(method.name)}
                            shippingMethod={method}
                            key={method.name}
                        />
                    ))}
            </Vexile>
        </>
    )
}
