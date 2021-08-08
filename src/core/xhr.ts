import CancelToken from '../cancel/CancelToken'
import { createError } from '../helpers/eroor'
import { handleResponseFail } from '../helpers/fail'
import { parseHeaders } from '../helpers/headers'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
    return new Promise((resolve, reject) => {
        const {
            data = null,
            url,
            method = 'get',
            headers,
            responseType,
            timeout,
            cancelToken
        } = config

        const request = new XMLHttpRequest()
        if (responseType) {
            request.responseType = responseType
        }
        if (timeout) {
            request.timeout = timeout
        }

        request.open(method.toUpperCase(), url!, true)

        request.onreadystatechange = function handleLoad() {
            if (request.readyState !== 4) {
                return
            }

            if (request.status === 0) {
                return
            }

            const reponseHeaders = parseHeaders(request.getAllResponseHeaders())
            const responseData = responseType !== 'text' ? request.response : request.responseText
            const response: AxiosResponse = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: reponseHeaders,
                config,
                request
            }
            // handleResponseFail(response)
            handleResponse(response)
        }

        request.onerror = function handelError() {
            reject(createError('Network Error', config, null, request))
        }

        request.ontimeout = function handelTimeount() {
            reject(
                createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request)
            )
        }

        function handleResponse(response: AxiosResponse) {
            if (response.status >= 200 && response.status < 300) {
                resolve(response)
            } else {
                reject(
                    createError(
                        `Request failed with status code ${response.status}`,
                        config,
                        null,
                        request,
                        response
                    )
                )
            }
        }

        Object.keys(headers).forEach(name => {
            if (data === null && name.toLowerCase() === 'content-type') {
                delete headers[name]
            } else {
                request.setRequestHeader(name, headers[name])
            }
        })
        console.log(data)

        if (cancelToken) {
            cancelToken.promise.then(reason => {
                request.abort()
                reject(reason)
            })
        }

        request.send(data)
    })
}
