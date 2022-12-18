import { ComponentProps, CSS } from '@stitches/react'
import { styled } from 'incart-fe-common'
import { useState } from 'react'

const InputView = styled('input', {
    border: 'none',
    fontSize: '4.5rem',
    backgroundColor: 'transparent',
})

export const useInlineInput = ({
    init,
    ...props
}: { init: string } & ComponentProps<typeof InputView>) => {
    const [value, setValue] = useState(init)

    return [
        value,
        <InputView
            defaultValue={init}
            onChange={(event) => setValue(event.currentTarget.value)}
            {...props}
        />,
    ] as const
}
