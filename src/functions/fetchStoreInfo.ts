import { StoreType } from 'incart-fe-common'
import { cfetch } from './cfetch'

const storeMap = new Map<number, StoreType>([])

export const getCachedStoreInfo = (storeUUID: number) => storeMap.get(storeUUID)

export async function fetchStoreInfo(storeUUID: number) {
    if (storeMap.has(storeUUID)) {
        return storeMap.get(storeUUID)!
    }

    const result: StoreType = await (await cfetch('store/' + storeUUID)).json()

    storeMap.set(storeUUID, result)
    return result
}
