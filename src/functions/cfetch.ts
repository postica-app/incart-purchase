import { getCaptcha } from './getCaptcha'

export const cfetch = (url: string, options?: RequestInit) => {
    if (options) {
        if (options.headers) {
            options.headers = new Headers(options.headers)
            options.headers.set('X-Captcha-Token', getCaptcha())
        } else {
            options.headers = new Headers({
                'X-Captcha-Token': getCaptcha(),
            })
        }
    } else {
        options = {
            headers: new Headers({
                'X-Captcha-Token': getCaptcha(),
            }),
        }
    }

    return fetch(import.meta.env.VITE_API_ENDPOINT + url, options)
}
