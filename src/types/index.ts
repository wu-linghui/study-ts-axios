export type Method =
    | 'get'
    | 'GET'
    | 'delete'
    | 'DELETE'
    | 'HEAD'
    | 'head'
    | 'options'
    | 'OPTIOnS'
    | 'put'
    | 'PUT'
    | 'patch'
    | 'PATCH'
    | 'post'
    | 'POST'

export interface AxiosRequestConfig {
    url?: string
    method?: string
    data?: any
    params?: any
    headers?: any
    responseType?: XMLHttpRequestResponseType
    timeout?: number
}

export interface AxiosResponse {
    data: any
    status: number
    statusText: string
    headers: any
    config: AxiosRequestConfig
    request: any
}

export interface AxiosPromise extends Promise<AxiosResponse> {}

export interface AxiosError extends Error {
    config: AxiosRequestConfig
    code?: string | null | undefined
    request?: any
    response?: AxiosResponse | undefined
    isAxiosError: boolean
}

export interface Axios {
    request(config: AxiosRequestConfig): AxiosPromise

    get(url: string, congif?: AxiosRequestConfig): AxiosPromise
    delete(url: string, config?: AxiosRequestConfig): AxiosRequestConfig
    head(url: string, config?: AxiosRequestConfig): AxiosPromise
    options(url: string, congif?: AxiosRequestConfig): AxiosPromise
    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
    put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
    patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
}

export interface AxiosInstance extends Axios {
    (config: AxiosRequestConfig): AxiosPromise

    (url: string, config?: AxiosRequestConfig): AxiosPromise
}
