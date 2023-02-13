import { BottomSheet as BottomSheetView } from 'react-spring-bottom-sheet'
import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'

import { bottomSheetAtom } from '@/jotai'
import { Vexile } from '@haechi/flexile'

export const BottomSheet = () => {
    const [bottomSheetContent, setBottomSheetContent] = useAtom(bottomSheetAtom)
    const [contentBuffer, setContentBuffer] =
        useState<typeof bottomSheetContent>(null)

    useEffect(() => {
        if (bottomSheetContent) {
            setContentBuffer(bottomSheetContent)
        } else {
            setTimeout(() => {
                setContentBuffer(null)
            }, 150)
        }
    }, [bottomSheetContent])

    if (!contentBuffer) return <></>

    return (
        <BottomSheetView
            onDismiss={() => setBottomSheetContent(null)}
            open={!!bottomSheetContent}
        >
            <Vexile padding={6} gap={6}>
                {contentBuffer}
            </Vexile>
        </BottomSheetView>
    )
}
