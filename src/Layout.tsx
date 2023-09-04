import { ReactComponent as _TextLogo } from 'incart-fe-common/src/brand/TextLogo.svg'
import { Hexile, Vexile } from '@haechi/flexile'
import { Toaster } from 'react-hot-toast'
import { styled } from 'incart-fe-common'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'

import { channel, EVENTS } from './channel'
import { BottomSheet } from './components'

export default () => {
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
        <styles.Wrapper padding={6} gap={3}>
            <styles.BrandInfoText>
                인카트 및 포스티카는 상품 판매의 당사자가 아닙니다
            </styles.BrandInfoText>
            <Toaster />
            <BottomSheet />
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
    Wrapper: styled(Vexile, {
        height: '100vh',
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
