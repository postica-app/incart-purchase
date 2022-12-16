import { Hexile, Vexile } from '@haechi/flexile'
import { styled, colors } from 'incart-fe-common'
import { ReactComponent as _TextLogo } from 'incart-fe-common/src/brand/TextLogo.svg'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { channel, EVENTS } from './channel'
import { cartAtom } from './jotai'

export default () => {
    const [cart, setCart] = useAtom(cartAtom)

    useEffect(() => {
        const handler = (message: MessageEvent<string>) => {
            const payload = JSON.parse(message.data) as {
                event: string
                data: unknown
            }
            if (payload.event === EVENTS.CLOSE_POPUP) {
                alert('열려있던 장바구니 팝업에 새 상품이 추가되었습니다')
                window.close()
            }
            if (payload.event === EVENTS.ADD_PRODUCT) {
                setCart((prev) => [
                    ...prev,
                    payload.data as typeof cart[number],
                ])
                channel.postMessage(
                    JSON.stringify({ event: EVENTS.CLOSE_POPUP })
                )
            }
        }

        channel.addEventListener('message', handler)
        return () => channel.removeEventListener('message', handler)
    }, [])

    return (
        <styles.Wrapper>
            <Vexile gap={6} filly>
                <Outlet />
            </Vexile>
            <Hexile x="center" y="center">
                <styles.TextLogo />
                <styles.BrandInfoText>
                    로 만든 쇼핑몰 입니다
                </styles.BrandInfoText>
            </Hexile>
        </styles.Wrapper>
    )
}

const styles = {
    Wrapper: styled('div', {
        padding: '9rem',
        paddingBottom: '3rem',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
    }),
    TextLogo: styled(_TextLogo, {
        width: '15rem',
        height: '4rem',
        color: '$grey3',
    }),
    BrandInfoText: styled('span', {
        fontSize: '4rem',
        color: '$grey3',
    }),
}
