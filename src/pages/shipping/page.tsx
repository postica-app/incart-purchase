import { ReactComponent as RefreshIcon } from 'incart-fe-common/src/icons/Refresh.svg'
import { Button, Header2, Text2 } from 'incart-fe-common'
import { useNavigate } from 'react-router-dom'
import Rive from '@rive-app/react-canvas'
import { Vexile } from '@haechi/flexile'
import { useAtomValue } from 'jotai'
import { useCallback } from 'react'
import { storeAtom } from '@/jotai'

import { ErrorBoundary, Plink } from '@/components'
import GhostRive from '@/asset/ghost.riv?url'

import Parts from './parts'

const SelectShippingMethod = () => {
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

export default () => (
    <ErrorBoundary
        fallback={
            <Vexile gap={3} x="center" y="center" filly>
                <Header2 center>오류가 발생했습니다</Header2>
                <Rive
                    style={{
                        height: '40rem',
                    }}
                    src={GhostRive}
                />
                <Text2 grey5>이용에 불편을 드려 죄송합니다</Text2>
                <Plink to={'/cart'}>
                    <Button
                        size="small"
                        ghost
                        icon={(props) => <RefreshIcon {...props} />}
                    >
                        장바구니로 돌아가기
                    </Button>
                </Plink>
            </Vexile>
        }
    >
        <SelectShippingMethod />
    </ErrorBoundary>
)
