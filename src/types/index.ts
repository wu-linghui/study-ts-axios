
export type Mthod = 'get' | 'GET' 
    | 'delete' | 'DELETE'
    | 'HEAD' | 'head'
    | 'optios' | 'OPTIOS'
    | 'put' | 'PUT'
    | 'patch' | 'PATCH'
    | 'post' | 'POST'

export interface AxiosRequestConfig {
    url: string,
    method?: string,
    data?: any,
    params?: any
}