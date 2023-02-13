import { ReactComponent as Cart } from 'incart-fe-common/src/icons/Cart.svg'
import { ReactComponent as Bag } from 'incart-fe-common/src/icons/Bag.svg'
import { Button, Callout } from 'incart-fe-common'
import { useAtomValue } from 'jotai'

import { CartItemList, Plink } from '@/components'
import { wholePriceAtom } from '@/jotai'

export default () => {
    const wholePrice = useAtomValue(wholePriceAtom)

    return (
        <>
            <Callout icon={(style) => <Cart style={style} />}>
                장바구니에 다른 상품을 추가할 수 있습니다
            </Callout>
            <CartItemList />
            <Plink to="/orderer-info" block>
                <Button icon={(style) => <Bag style={style} />}>
                    <span style={{ fontWeight: 'initial' }}>
                        {wholePrice.toLocaleString()}원
                    </span>{' '}
                    구매하기
                </Button>
            </Plink>
        </>
    )
}
