import { AxiosPromise, AxiosResponse } from '../types'
import { createError } from './eroor'

export function handleResponseFail(response: AxiosResponse): AxiosPromise {
    return new Promise((resolve, reject) => {
        if (response.status >= 200 && response.status < 300) {
            resolve(response)
        } else {
            reject(
                createError(
                    `Request failed with status code ${response.status}`,
                    response.config,
                    null,
                    response.request,
                    response
                )
            )
        }
    })
}
