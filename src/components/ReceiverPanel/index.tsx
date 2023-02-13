import { ReactComponent as Arrow } from 'incart-fe-common/src/icons/Right Arrow.svg'
import { FormField, FInput, Button, FormikContext } from 'incart-fe-common'
import { useAtom, useAtomValue } from 'jotai'
import { Vexile } from '@haechi/flexile'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { receiverInfoAtom, ordererInfoAtom } from '@/jotai'
import { Pform } from '../atom'

interface ReceiverPanelProps {
    button?: {
        text: string
        onClick: () => void
    }
}

export const ReceiverPanel: React.FC<ReceiverPanelProps> = (props) => {
    const [receiverinfo, setReceiverInfo] = useAtom(receiverInfoAtom)
    const ordererInfo = useAtomValue(ordererInfoAtom)

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
            props.button?.onClick()
        },
        validateOnChange: false,
        validateOnBlur: true,
    })
    return (
        <Pform onSubmit={(e) => formik.handleSubmit(e)} filly>
            <FormikContext.Provider value={formik}>
                <Vexile gap={6} filly>
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
                    </Vexile>
                    <Button
                        icon={(style) => <Arrow style={style} />}
                        type="submit"
                    >
                        {props.button?.text || '다음'}
                    </Button>
                </Vexile>
            </FormikContext.Provider>
        </Pform>
    )
}
