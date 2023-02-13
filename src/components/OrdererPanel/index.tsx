import { ReactComponent as Arrow } from 'incart-fe-common/src/icons/Right Arrow.svg'
import { FormField, FInput, Button, FormikContext } from 'incart-fe-common'
import { useFormik } from 'formik'
import { useAtom } from 'jotai'
import * as yup from 'yup'

import { ordererInfoAtom } from '@/jotai'
import { Vexile } from '@haechi/flexile'
import { Pform } from '../atom'

interface OrdererPanelProps {
    button?: {
        text: string
        onClick: () => void
    }
}

export const OrdererPanel: React.FC<OrdererPanelProps> = (props) => {
    const [ordererInfo, setOrdererInfo] = useAtom(ordererInfoAtom)

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
            props.button?.onClick?.()
        },
    })

    return (
        <Pform onSubmit={(e) => formik.handleSubmit(e)} filly>
            <Vexile gap={6} filly>
                <FormikContext.Provider value={formik}>
                    <Vexile gap={6} filly>
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
                        {props.button?.text || '다음'}
                    </Button>
                </FormikContext.Provider>
            </Vexile>
        </Pform>
    )
}
