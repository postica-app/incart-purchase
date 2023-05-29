import Postcode from '@actbase/react-daum-postcode'
import { css } from '@stitches/react'
import { useMemo, useState } from 'react'

export default {
    usePostcode(initialVisibility: boolean = false) {
        const [visible, setVisible] = useState(initialVisibility)
        const [address, setAddress] = useState<{
            address: string
            zonecode: number
        }>()

        const postcodeModal = useMemo(
            () => (
                <div
                    className={
                        css({
                            '&>div>div': {
                                height: '100% !important',
                            },
                        })().className
                    }
                >
                    <Postcode
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: '100%',
                            height: '100%',
                        }}
                        jsOptions={{ hideMapBtn: true }}
                        onSelected={(data) => {
                            setAddress({
                                address: data.address,
                                zonecode: data.zonecode,
                            })
                            setVisible(false)
                        }}
                        onError={(e) => {
                            console.error(e)
                            alert(
                                '주소 검색기를 불러오지 못했습니다. 다시 시도해주세요.'
                            )

                            setVisible(false)
                        }}
                    />
                </div>
            ),
            []
        )

        return [address, setVisible, visible && postcodeModal] as const
    },
}
