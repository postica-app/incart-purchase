declare global {
    interface Window {
        turnstile: {
            getResponse: () => string
            reset: () => void
        }
    }
}

export const getCaptcha = () => {
    window.turnstile.reset()
    const res = window.turnstile.getResponse()
    return res
}
