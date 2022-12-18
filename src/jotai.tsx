import { ProductType } from 'incart-fe-common'
import { atomWithStorage } from 'jotai/utils'
import { atom } from 'jotai'
import { CartItemType, Doc } from './type'

export const cartAtom = atomWithStorage<CartItemType[]>('CART', [])
