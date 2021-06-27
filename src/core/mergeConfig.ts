import { deepMerge, isPlainObject } from '../helpers/util'
import { AxiosRequestConfig } from '../types'

const starts = Object.create(null)

function defaultStart(val1: any, val2: any): any {
    return typeof val2 !== 'undefined' ? val2 : val1
}

function fromVal2Start(val1: any, val2: any): any {
    if (typeof val2 !== 'undefined') {
        return val2
    }
}

function deepMergeStart(val1: any, val2: any): any {
    if (isPlainObject(val2)) {
        return deepMerge(val1, val2)
    } else if (typeof val2 !== 'undefined') {
        return val2
    } else if (isPlainObject(val1)) {
        return deepMerge(val1)
    } else {
        return val1
    }
}

const startKeysDeepMerge = ['headers']

startKeysDeepMerge.forEach(key => {
    starts[key] = deepMergeStart
})

const startKeyFromVal2 = ['url', 'params', 'data']

startKeyFromVal2.forEach(key => {
    starts[key] = fromVal2Start
})

export default function mergeConfig(
    config1: AxiosRequestConfig,
    config2?: AxiosRequestConfig
): AxiosRequestConfig {
    if (!config2) {
        config2 = {}
    }

    const config = Object.create(null)

    for (let key in config2) {
        mergeField(key)
    }

    for (let key in config1) {
        if (!config2[key]) {
            mergeField(key)
        }
    }

    function mergeField(key: string): void {
        const strat = starts[key] || defaultStart
        config[key] = strat(config1[key], config2![key])
    }

    return config
}
