import { ComponentProps, CSS } from '@stitches/react'
import { styled } from 'incart-fe-common'
import { useState } from 'react'

const InputView = styled('input', {
    border: 'none',
    fontSize: '4.5rem',
    backgroundColor: 'transparent',
})

export const useInlineInput = <T extends number | string>({
    init,
    ...props
}: { init: T } & ComponentProps<typeof InputView>) => {
    const [value, setValue] = useState<T>(init)

    return [
        value,
        <InputView
            defaultValue={init}
            onChange={(event) => {
                if (props.type === 'number')
                    setValue(event.currentTarget.valueAsNumber as T)
                else setValue(event.currentTarget.value as T)
            }}
            {...props}
        />,
    ] as const
}
