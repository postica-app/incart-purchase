import { ProductType } from 'incart-fe-common'
import { atom } from 'jotai'
import { Doc } from './type'

export const cartAtom = atom<
    {
        product: Doc<ProductType>
        amount: number
        optionComponation: string[]
    }[]
>([])
