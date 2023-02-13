import { useNavigate } from 'react-router-dom'
import { Header2 } from 'incart-fe-common'

import { ReceiverPanel } from '@/components'
import { Vexile } from '@haechi/flexile'

export default () => {
    const goto = useNavigate()

    return (
        <Vexile gap={6} filly>
            <Header2>상품을 받을 사람의 정보를 알려주세요</Header2>
            <ReceiverPanel
                button={{
                    text: '다음',
                    onClick: () => goto('/shipping'),
                }}
            />
        </Vexile>
    )
}
