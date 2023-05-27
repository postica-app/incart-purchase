import { ReactComponent as InfoIcon } from 'incart-fe-common/src/icons/Info.svg'
import { Button, Header1, Text1 } from 'incart-fe-common'
import Rive from '@rive-app/react-canvas'
import { Vexile } from '@haechi/flexile'
import { useAtomValue } from 'jotai'

import { ordererInfoAtom } from '@/jotai'

export default () => {
    const ordererInfo = useAtomValue(ordererInfoAtom)
    return (
        <Vexile gap={6} filly x="center" y="center">
            <Rive
                style={{
                    height: '40rem',
                }}
                animations="Unnamed"
                src="https://public.rive.app/hosted/134058/35182/6_e4ansJhUCyuWK6pbxVdA.riv"
            />
            <Vexile gap={3} x="center" y="center">
                <Header1>주문서가 전달되었습니다</Header1>
                <Text1 purple center>
                    리코닉스에서 상품을 주문해주셔서 <br /> 고맙습니다
                </Text1>
            </Vexile>
            <Text1 grey5 center>
                주문 취소, 배송 등 구매에 관련된 내용을 <br /> 이메일 (
                {ordererInfo?.email})로 보내드렸습니다.
            </Text1>
            <Button
                size="small"
                ghost
                icon={(props) => <InfoIcon {...props} />}
            >
                이메일을 받지 못했나요?
            </Button>
        </Vexile>
    )
}
