import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import xhr from './xhr'
import { bulidURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { flattenHeaders, processHeaders } from '../helpers/headers'
import transform from './transform'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
    processConfig(config)
    throwIfCancellationRequested(config)
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
    // console.log('config', config)
    config.url = transformURL(config)
    // console.log('config',config)
    // config.headers = transformHeaders(config)
    // console.log('config',config)
    // config.data = transformRequestData(config)
    config.data = transform(config.data, config.headers, config.transformRequest)

    config.headers = flattenHeaders(config.headers, config.method!)
}

function transformURL(config: AxiosRequestConfig): string {
    const { url, params } = config
    return bulidURL(url!, params)
}

// function transformRequestData(config: AxiosRequestConfig): any {
//     return transformRequest(config.data)
// }

// function transformHeaders(config: AxiosRequestConfig): any {
//     const { headers = {}, data } = config
//     return processHeaders(headers, data)
// }

function transformResponseData(res: AxiosResponse): AxiosResponse {
    res.data = transform(res.data, res.headers, res.config.transformResponse)
    // res.data = transformResponse(res.data)
    return res
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
    config.cancelToken && config.cancelToken.throwIfRequested()
}

// export default axios
