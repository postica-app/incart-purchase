import { StoreType } from 'incart-fe-common'
import { cfetch } from './cfetch'

const storeMap = new Map<string, StoreType>([
    [
        'd14c2568-cca5-4d0b-91e7-89af116fec6e',
        {
            name: '흥길스토어',
            payment_receive_account: {
                other: [
                    {
                        key: '281006011119592290002412',
                        type: 'KakaopayQR',
                    },
                    {
                        key: '새하얗게웃던날을',
                        type: 'tossID',
                    },
                ],
                bankAccount: {
                    bank: '농협',
                    accountNumber: '3510736373173',
                },
            },
            shipping_method: [
                {
                    name: '택배',
                    price: 3000,
                    info: '도서산간 · 제주 지역 추가 비용시 연락드리겠습니다',
                    form: {
                        address: 'required',
                        message: 'optional',
                    },
                },
                {
                    name: '사장님이 직접 배달',
                    price: 1500,
                    info: '강원도 춘천 관내만 가능합니다',
                    form: {
                        address: 'required',
                        message: 'optional',
                    },
                },
                {
                    name: '방문수령',
                    price: 0,
                    info: '매장은 대구에 있습니다',
                    form: {
                        address: 'no',
                        message: 'required',
                        // extra: [
                        //     {
                        //         name: '방문 예정일',
                        //         type: 'text',
                        //     },
                        //     {
                        //         name: '수령 방법',
                        //         info: '비대면, 대면 중 선택해주세요. 비대면 수령은 회사 주차장의 우체통 안에 상품을 놓아둡니다.',
                        //         type: 'text',
                        //     },
                        // ],
                    },
                },
            ],
        },
    ],
])

export const getCachedStoreInfo = (storeUUID: string) => storeMap.get(storeUUID)

export async function fetchStoreInfo(storeUUID: string) {
    if (storeMap.has(storeUUID)) {
        return storeMap.get(storeUUID)!
    }

    const result: StoreType = await (await cfetch('store/' + storeUUID)).json()

    storeMap.set(storeUUID, result)
    return result
}
