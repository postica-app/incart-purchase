import { cfetch } from '@/functions'
import { Doc, ProductType } from 'incart-fe-common'

export default {
    getProductInfoFromQuery() {
        const params = new URLSearchParams(location.search)

        const productId = params.get('product_id')
        const optionName = params.get('option_name')

        if (!productId) {
            alert('상품 구매 정보가 올바르지 않습니다')
            throw ''
        }

        return { productId, optionName }
    },
    async fetchProductFromQuery() {
        const productInfo = this.getProductInfoFromQuery()

        const result = await (
            await cfetch('product/' + productInfo.productId)
        ).json()

        return {
            product: result as Doc<ProductType>,
            option: productInfo.optionName,
        }
    },
}
