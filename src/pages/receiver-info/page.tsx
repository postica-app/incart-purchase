import {
    FormikContext,
    Header2,
    FormField,
    FInput,
    Button,
} from 'incart-fe-common'
import { ReactComponent as Arrow } from 'incart-fe-common/src/icons/Right Arrow.svg'
import { Vexile } from '@haechi/flexile'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { Pform } from '@/components'
import { useAtom, useAtomValue } from 'jotai'
import { ordererInfoAtom, receiverInfoAtom } from '@/jotai'
import { useNavigate } from 'react-router-dom'

export default () => {
    const [receiverinfo, setReceiverInfo] = useAtom(receiverInfoAtom)
    const ordererInfo = useAtomValue(ordererInfoAtom)

    const goto = useNavigate()

    const formik = useFormik({
        initialValues:
            receiverinfo ||
            (ordererInfo
                ? {
                      name: ordererInfo.name,
                      phoneNumber: ordererInfo.phoneNumber,
                  }
                : {
                      name: '',
                      phoneNumber: '',
                  }),
        validationSchema: yup.object().shape({
            name: yup.string().required('이름을 입력해주세요'),
            phoneNumber: yup.string().required('전화번호를 입력해주세요'),
        }),
        onSubmit(values) {
            setReceiverInfo(values)
            goto('/shipping')
        },
        validateOnChange: false,
        validateOnBlur: true,
    })

    return (
        <Pform onSubmit={(e) => formik.handleSubmit(e)} filly>
            <FormikContext.Provider value={formik}>
                <Vexile gap={6} filly>
                    <Vexile gap={6} filly>
                        <Header2>상품을 받을 사람의 정보를 알려주세요</Header2>
                        <FormField name="이름" required>
                            <FInput name="name" placeholder="홍길동" />
                        </FormField>
                        <FormField name="전화번호" required>
                            <FInput
                                name="phoneNumber"
                                placeholder="010-1234-5678"
                            />
                        </FormField>
                    </Vexile>
                    <Button
                        icon={(style) => <Arrow style={style} />}
                        type="submit"
                    >
                        다음
                    </Button>
                </Vexile>
            </FormikContext.Provider>
        </Pform>
    )
}
