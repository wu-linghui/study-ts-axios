import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import xhr from './xhr'
import { bulidURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
    processConfig(config)
    return xhr(config).then(
        res => {
            return transformResponseData(res)
        },
        e => {
            if (e && e.response) {
                e.response = transformResponseData(e.response)
            }
            return Promise.reject(e)
        }
    )
}

function processConfig(config: AxiosRequestConfig): void {
    config.url = transformURL(config)
    config.headers = transformHeaders(config)
    config.data = transformRequestData(config)
}

function transformURL(config: AxiosRequestConfig): string {
    const { url, params } = config
    return bulidURL(url!, params)
}

function transformRequestData(config: AxiosRequestConfig): any {
    return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig): any {
    const { headers = {}, data } = config
    return processHeaders(headers, data)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
    res.data = transformResponse(res.data)
    return res
}

// export default axios
