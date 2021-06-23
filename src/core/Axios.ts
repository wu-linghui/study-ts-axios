import {
    AxiosPromise,
    AxiosRequestConfig,
    AxiosResponse,
    Method,
    RejectedFn,
    ResolvedFn
} from '../types'
import dispatchRequest from './dispatchRequest'
import InterceceptorManager from './InterceptorManager'

interface Interceptors {
    request: InterceceptorManager<AxiosRequestConfig>
    response: InterceceptorManager<AxiosResponse>
}

interface PromiseChain<T> {
    resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)
    rejected?: RejectedFn
}

export default class Axios {
    interceptors: Interceptors

    constructor() {
        this.interceptors = {
            request: new InterceceptorManager<AxiosRequestConfig>(),
            response: new InterceceptorManager<AxiosResponse>()
        }
    }
    request(url: any, config?: any): AxiosPromise {
        if (typeof url === 'string') {
            if (!config) {
                config = {}
            }
            config.url = url
        } else {
            config = url
        }

        const chain: PromiseChain<any>[] = [
            {
                resolved: dispatchRequest,
                rejected: undefined
            }
        ]

        this.interceptors.request.forEach(interceptor => {
            chain.unshift(interceptor)
        })

        this.interceptors.response.forEach(interceptor => {
            chain.push(interceptor)
        })

        let promise = Promise.resolve(config)
        while (chain.length) {
            const { resolved, rejected } = chain.shift()!
            promise = promise.then(resolved, rejected)
        }

        return promise
        // return dispatchRequest(config);
    }

    get(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('get', url, config)
    }

    delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('delete', url, config)
    }

    head(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('head', url, config)
    }

    options(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('options', url, config)
    }

    _requestMethodWithoutData(
        method: Method,
        url: string,
        config?: AxiosRequestConfig
    ): AxiosPromise {
        return this.request(
            Object.assign(config || {}, {
                method,
                url
            })
        )
    }

    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('post', url, data, config)
    }

    put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('put', url, data, config)
    }

    patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('patch', url, data, config)
    }

    _requestMethodWithData(
        method: Method,
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): AxiosPromise {
        return this.request(
            Object.assign(config || {}, {
                method,
                data,
                url
            })
        )
    }
}
