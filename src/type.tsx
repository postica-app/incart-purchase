import { ProductType } from 'incart-fe-common'

export type Doc<T> = T & { id: string }
export interface CartItemType {
    product: Doc<ProductType>
    amount: number
    selectedOptions: string[]
}
