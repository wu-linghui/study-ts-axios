// import { isObject } from "./util";
import { isPlainObject } from './util'

export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    console.log(data, JSON.stringify(data))
    return JSON.stringify(data)
  }
  return data
}
