import { StoreType } from 'incart-fe-common'

const storeMap = new Map<string, StoreType>()

export async function fetchStoreInfo(storeUUID: string) {
    if (storeMap.has(storeUUID)) {
        return storeMap.get(storeUUID)!
    }

    const result: StoreType = await (
        await fetch(import.meta.env.VITE_API_ENDPOINT + 'store/' + storeUUID)
    ).json()

    storeMap.set(storeUUID, result)
    return result
}
