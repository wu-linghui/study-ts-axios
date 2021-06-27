import Axios from './core/Axios'
import defaults from './defaults'
import { extend } from './helpers/util'
import { AxiosInstance, AxiosRequestConfig } from './types'

function createInstance(config: AxiosRequestConfig): AxiosInstance {
    const content = new Axios(config)
    const instance = Axios.prototype.request.bind(content)
    extend(instance, content)

    return instance as AxiosInstance
}

const axios = createInstance(defaults)

export default axios
