import { Hexile, Vexile } from '@haechi/flexile'
import { styled, colors } from 'incart-fe-common'
import { ReactComponent as _TextLogo } from 'incart-fe-common/src/brand/TextLogo.svg'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { channel, EVENTS } from './channel'
import { cartAtom } from './jotai'
import { CartItemType } from './type'

export default () => {
    // const [cart, setCart] = useAtom(cartAtom)

    useEffect(() => {
        const handler = (message: MessageEvent<string>) => {
            const payload = JSON.parse(message.data) as {
                type: string
                data: unknown
            }

            if (payload.type === EVENTS.CLOSE_POPUP) {
                window.close()
            }
        }

        channel.addEventListener('message', handler)
        return () => channel.removeEventListener('message', handler)
    }, [])

    return (
        <styles.Wrapper>
            <styles.ContentWrapper gap={6} filly>
                <Outlet />
            </styles.ContentWrapper>
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
        paddingBottom: '3rem',
        padding: '6rem',

        boxSizing: 'border-box',
        minHeight: '100vh',

        flexDirection: 'column',
        display: 'flex',
        gap: '3rem',
    }),
    ContentWrapper: styled(Vexile, {
        flex: 1,
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
