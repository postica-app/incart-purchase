import { StoreType } from 'incart-fe-common'
import { cfetch } from './cfetch'

const storeMap = new Map<number, StoreType>([])

export const getCachedStoreInfo = (storeRid: number) => storeMap.get(storeRid)

export async function fetchStoreInfo(storeRid: number) {
    if (storeMap.has(storeRid)) {
        return storeMap.get(storeRid)!
    }

    const result: StoreType = await (await cfetch('store/' + storeRid)).json()

    storeMap.set(storeRid, result)
    return result
}
