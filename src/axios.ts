import Cancel, { isCancel } from './cancel/Cancel'
import CancelToken from './cancel/CancelToken'
import Axios from './core/Axios'
import defaults from './defaults'
import { extend } from './helpers/util'
import { AxiosInstance, AxiosRequestConfig, AxiosStatic } from './types'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
    const content = new Axios(config)
    const instance = Axios.prototype.request.bind(content)
    extend(instance, content)

    return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel
export default axios