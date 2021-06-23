// import { isObject } from "./util";
import { isPlainObject } from './util'

export function transformRequest(data: any): any {
    if (isPlainObject(data)) {
        console.log(data, JSON.stringify(data))
        return JSON.stringify(data)
    }
    return data
}

export function transformResponse(data: any): any {
    if (typeof data === 'string') {
        try {
            console.log(data)
            data = JSON.parse(data)
        } catch (error) {
            console.log(error)
        }
    }
    return data
}
