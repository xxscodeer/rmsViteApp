import { Interceptors } from './interceptors';
import { ElMessage } from "element-plus";

export class HttpService {
    public axios: any;
    public modal: any;

    constructor() {
        // 获取axios实例
        this.axios = new Interceptors().getInterceptors();
    }


    /**
     * get请求
     * @param params  参数
     * @param jwt   是否token校验
     * @param modulename    模块
     * @param operation     接口
     * @param flag          标记
     * @param verson       版本,默认1.0.0
     * @param service      服务,默认services
     */
    public getData(params: object,url:string ) {
        return new Promise((resolve, reject) => {
            this.axios.get(url,params
            ).then((res: any) => {
                this.resultHandle(res, resolve);
            }).catch((err: any) => {
                reject(err);
            });
        });

    }


    /**
     * post请求
     * @param params  参数
     * @param url 地址
     */
    public postData(params: object, url: string,) {
        return new Promise((resolve, reject) => {
            this.axios.post(url, params
            ).then((res: any) => {
                this.resultHandle(res, resolve);
            }).catch((err: any) => {
                reject(err);
            });
        });

    }


    /**
     *
     * @param res
     * @param resolve
     */
    public resultHandle(res: any, resolve: any) {
        if (res.status > 0) {
            resolve(res.data);
        } else {
            this.errorHandle(res);
        }
    }


    /**
     * 服务端状态处理,例如中断性异常,退出异常等等(与拦截器http握手状态注意区分,一般都能分清楚吧)
     * @param res
     */
    public errorHandle(res: any) {
        ElMessage({
            showClose: true,
            message: "连接异常",
            type: "warning",
            offset: 300,
            center: true,
            iconClass: "el-icon-success",
        });  // 统一谈服务端提示,我们提示统一由服务端提供
        // 状态码判断
        switch (res.status) {
            case 404:
                break;
            case -152:
                break;
            default:
        }
    }

}