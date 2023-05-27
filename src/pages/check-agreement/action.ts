import { CreateOrderType } from 'incart-fe-common'
import { cfetch, toast } from '@/functions'

export default {
    async createOrder(orderInfo: CreateOrderType) {
        const result:
            | {
                  success: boolean
              }
            | {
                  code: string
                  message: string
              } = await (
            await cfetch('order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderInfo),
            })
        ).json()

        if ('code' in result) {
            toast(result.message)
            throw new Error()
        }

        if (!result.success) {
            toast('오류가 발생했습니다. 다시 시도해주세요.')
            throw new Error()
        }
    },
}
