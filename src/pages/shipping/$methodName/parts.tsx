import { useField } from 'incart-fe-common'
import { useEffect } from 'react'
import action from './action'

export default {
    FPostcode({
        children: Children,
        ...props
    }: {
        name: string
        children: (_props: { onClick(): void }) => JSX.Element
    }) {
        const [postcode, setPostcodeVisibility, postcodeModal] =
            action.usePostcode()
        const set = useField(props.name)[2]

        useEffect(() => {
            if (postcode) {
                set.setValue(postcode.address)
            }
        }, [postcode])

        return (
            <>
                {postcodeModal}
                <Children
                    onClick={() => {
                        console.log('네?')
                        setPostcodeVisibility(true)
                        set.setTouched(true)
                    }}
                />
            </>
        )
    },
}
