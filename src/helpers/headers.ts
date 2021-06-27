import { Method } from '../types'
import { deepMerge, isPlainObject } from './util'

function normalizeHeaderName(headers: any, normalizedName: string): void {
    if (!headers) {
        return
    }
    Object.keys(headers).forEach(name => {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
            headers[normalizedName] = headers[name]
            delete headers[name]
        }
    })
}

export function processHeaders(headers: any, data: any): any {
    normalizeHeaderName(headers, 'Content-Type')
    if (isPlainObject(data)) {
        if (headers && !headers['Content-Type']) {
            console.log('test')
            headers['Content-Type'] = 'application/json;charset=utf-8'
        }
    }
    console.log('2', headers)
    return headers
}

export function parseHeaders(headers: string): any {
    let parsed = Object.create(null)
    if (!headers) {
        return parsed
    }

    headers.split('\r\n').forEach(item => {
        let [key, val] = item.split(':')
        key = key.trim().toLowerCase()
        if (!key) {
            return
        }
        if (val) {
            val = val.trim()
        }
        parsed[key] = val
    })

    return parsed
}

export function flattenHeaders(headers: any, method: Method): any {
    if (!headers) {
        return headers
    }
    console.log('headers', headers)

    headers = deepMerge(headers.common || {}, headers[method] || {}, headers)

    const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']
    console.log('headers', headers)
    methodsToDelete.forEach(method => {
        delete headers[method]
    })

    return headers
}
