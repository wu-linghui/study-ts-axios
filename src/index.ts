import { AxiosRequestConfig } from "./types";
import xhr from "./xhr";
import { bulidURL } from './helpers/url';

function axios(config: AxiosRequestConfig):void {
    xhr(config);
}

function processConfig (config: AxiosRequestConfig): void {
    config.url = transformURL(config);
}

function transformURL (config: AxiosRequestConfig): string {
    const {url, params} = config;
    return bulidURL(url, params)
}

export default axios;



