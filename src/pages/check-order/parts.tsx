import { ReactComponent as Arrow } from 'incart-fe-common/src/icons/Right Arrow.svg'
import { Button } from 'incart-fe-common'
import { Vexile } from '@haechi/flexile'

import { CartItemList } from '@/components'

export default {
    Cart(props: { onClose: () => void }) {
        return (
            <Vexile gap={6}>
                <CartItemList />
                <Button
                    onClick={props.onClose}
                    icon={(props) => <Arrow {...props} />}
                >
                    맞습니다
                </Button>
            </Vexile>
        )
    },
}
