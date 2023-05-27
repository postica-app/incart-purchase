import { CartItemType } from 'incart-fe-common'
import { fetchStoreInfo } from '@/functions'

export default {
    async getStoreFromCart(cartItems: CartItemType[]) {
        if (cartItems.length === 0) {
            alert('장바구니가 비어있습니다')
            throw new Error('Empty cart')
        }

        const isAllSameStore = cartItems.every(
            (item) => item.product.store_rid === cartItems[0].product.store_rid
        )

        if (!isAllSameStore) {
            alert(
                '한 번에 한 상점의 상품만 주문할 수 있습니다. 다른 상점의 상품을 삭제해주세요.'
            )
            throw new Error('Different store')
        }

        const storeId = cartItems[0].product.store_rid
        const store = await fetchStoreInfo(storeId)

        return store
    },
}
