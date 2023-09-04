import { ReactComponent as Arrow } from 'incart-fe-common/src/icons/Right Arrow.svg'
import { ReactComponent as Home } from 'incart-fe-common/src/icons/Home.svg'
import {
    ShippingInfoType,
    FormikContext,
    FormField,
    Callout,
    Header2,
    Button,
    FInput,
    Text1,
} from 'incart-fe-common'
import { useNavigate, useParams } from 'react-router-dom'
import { Hexile, Vexile } from '@haechi/flexile'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useEffect, useMemo } from 'react'
import { useFormik } from 'formik'

import { cartAtom, shippingFeeAtom, shippingInfoAtom } from '@/jotai'
import { getCachedStoreInfo } from '@/functions'
import { Pform } from '@/components'
import Parts from './parts'

export default () => {
    const [shippingInfo, setShippingInfo] = useAtom(shippingInfoAtom)
    const setShippingFee = useSetAtom(shippingFeeAtom)
    const shippingMethodName = useParams().methodName!
    const cart = useAtomValue(cartAtom)
    const goto = useNavigate()

    const shippingMethod = useMemo(
        () =>
            getCachedStoreInfo(cart[0].product.store_rid)?.shipping_method.find(
                (method) => method.name === shippingMethodName
            ),
        [shippingMethodName]
    )

    useEffect(() => {
        if (shippingMethod && shippingMethodName) return

        alert('올바르지 않은 접근입니다')
        goto('/shipping')
    }, [shippingMethod, shippingMethodName])

    const formik = useFormik<ShippingInfoType>({
        initialValues: shippingInfo || {
            address: {
                roadname: '',
                detail: '',
            },
            message: '',
            method: shippingMethodName,
        },
        validate(values) {
            const errors: Record<string, string> = {}

            if (shippingMethod!.form.address === 'required') {
                if (!values.address?.roadname) {
                    errors['address.roadname'] = '주소를 입력해주세요'
                }
            }

            if (shippingMethod!.form.message === 'required') {
                if (!values.message) {
                    errors['message'] = '요청사항을 입력해주세요'
                }
            }

            return errors
        },
        onSubmit(values) {
            if (!shippingMethod) return
            setShippingFee(shippingMethod.price)

            if (shippingMethod?.form.address === 'no') {
                setShippingInfo({
                    message: values.message,
                    method: shippingMethodName,
                })
            } else {
                setShippingInfo(values)
            }

            goto('/check-order')
        },
    })

    return (
        <Pform onSubmit={formik.handleSubmit} filly>
            <FormikContext.Provider value={formik}>
                <Vexile gap={6} filly>
                    <Vexile gap={6} filly>
                        <Header2>상품을 어디로 받을지 알려주세요</Header2>
                        {shippingMethod?.form.address !== 'no' && (
                            <>
                                <Vexile gap={3}>
                                    <Hexile y="center" x="space">
                                        <Text1>
                                            주소{' '}
                                            {shippingMethod?.form.address ===
                                                'required' && '*'}
                                        </Text1>
                                        <Parts.FPostcode name="address.roadname">
                                            {({ onClick }) => (
                                                <Button
                                                    size="small"
                                                    ghost
                                                    icon={(props) => (
                                                        <Home {...props} />
                                                    )}
                                                    onClick={onClick}
                                                >
                                                    주소 찾기
                                                </Button>
                                            )}
                                        </Parts.FPostcode>
                                    </Hexile>
                                    {formik.values.address?.roadname && (
                                        <Callout>
                                            {formik.values.address?.roadname}
                                        </Callout>
                                    )}
                                </Vexile>
                                <FormField name="상세 주소">
                                    <FInput
                                        name="address.detail"
                                        placeholder="100동 2000호"
                                    />
                                </FormField>
                            </>
                        )}

                        <FormField
                            name="요청사항"
                            required={
                                shippingMethod?.form.message === 'required'
                            }
                        >
                            <FInput
                                name="message"
                                placeholder="예) 안전하게 보내주세요"
                                // @ts-ignore
                                as="textarea"
                                rows={10}
                            />
                        </FormField>
                    </Vexile>

                    <Button
                        type="submit"
                        icon={(props) => <Arrow {...props} />}
                        disabled={formik.isSubmitting}
                    >
                        다음
                    </Button>
                </Vexile>
            </FormikContext.Provider>
        </Pform>
    )
}
