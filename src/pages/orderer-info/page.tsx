import { useNavigate } from 'react-router-dom'
import { Header2 } from 'incart-fe-common'
import { Vexile } from '@haechi/flexile'

import { OrdererPanel } from '@/components'

export default () => {
    const goto = useNavigate()

    return (
        <Vexile gap={6} filly>
            <Header2>주문하는 사람의 정보를 알려주세요</Header2>
            <OrdererPanel
                button={{
                    text: '다음',
                    onClick: () => {
                        goto('/receiver-info')
                    },
                }}
            />
        </Vexile>
    )
}
