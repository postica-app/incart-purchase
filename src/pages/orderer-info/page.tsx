import {
    Header2,
    FormikContext,
    FormField,
    FInput,
    Button,
} from 'incart-fe-common'
import { ReactComponent as Arrow } from 'incart-fe-common/src/icons/Right Arrow.svg'
import { Vexile } from '@haechi/flexile'
import { useFormik } from 'formik'
import { useAtom } from 'jotai'
import * as yup from 'yup'

import { ordererInfoAtom } from '@/jotai'
import { Pform } from '@/components'
import { useNavigate } from 'react-router-dom'

export default () => {
    const [ordererInfo, setOrdererInfo] = useAtom(ordererInfoAtom)
    const goto = useNavigate()

    const formik = useFormik({
        initialValues: ordererInfo || {
            name: '',
            phoneNumber: '',
            email: '',
        },
        validateOnBlur: true,
        validateOnChange: false,
        validationSchema: yup.object().shape({
            name: yup.string().required('이름을 입력해주세요'),
            phoneNumber: yup.string().required('전화번호를 입력해주세요'),
            email: yup
                .string()
                .required('이메일을 입력해주세요')
                .email('입력하신 이메일 정보를 다시 한번 확인해주세요'),
        }),
        onSubmit(values) {
            setOrdererInfo(values)
            goto('/receiver-info')
        },
    })
    return (
        <Pform onSubmit={(e) => formik.handleSubmit(e)} filly>
            <FormikContext.Provider value={formik}>
                <Vexile gap={6} filly>
                    <Vexile gap={6} filly>
                        <Header2>주문자 정보를 알려주세요</Header2>
                        <FormField name="이름" required>
                            <FInput name="name" placeholder="홍길동" />
                        </FormField>
                        <FormField name="전화번호" required>
                            <FInput
                                name="phoneNumber"
                                placeholder="010-1234-5678"
                            />
                        </FormField>
                        <FormField
                            name="이메일"
                            required
                            info="주문 관련 안내를 보내드립니다. 실제로 사용하는 주소를 적어주세요."
                        >
                            <FInput
                                name="email"
                                placeholder="gildong@example.com"
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
