import axios from 'axios';
import { getToken } from '@/utils/constant';
import { useUserStore } from '@/store/user';
import { ElMessage } from 'element-plus';

const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 3000 * 60 // request timeout
});

// Request interceptors
service.interceptors.request.use(
    function (config) {
        const token = getToken();
        // 设置token
        if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token.accessToken}`;
        }
        return config;
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

let isFlush = false;

// Response interceptors
service.interceptors.response.use(
    async function (response) {
        const status = response.status;
        const code = response.data?.code || null;
        const token = getToken();
        const store = useUserStore();
        if (status < 500) {
            switch (code) {
                //正常处理
                case 200:
                    break;
                case 401:
                    if (token && token.accessToken) {
                    }
                //token过期处理
                case 20003:
                    if (token && token.accessToken) {
                        if (!isFlush) {
                            isFlush = true;
                            //获取新的token 是否成功
                            const isTrue = await store.refreshToken();
                            if (isTrue) {
                                isFlush = false;
                                //重新发起请求调用
                                return service.request(response.config);
                            } else {
                                store.logout();
                            }
                            isFlush = false;
                        }
                        break;
                    }
                    break;
                default:
                    ElMessage.error(response.data.msg);
                    break;
            }
        }
        // 设置 responseType 返回数据类型
        return response.data || {};
    },
    function (error: any) {
        // error.message = '请求超时或服务器异常，请检查网络或联系管理员！';
        // do something
        console.log(error);
        const data = error.response.data;
        ElMessage.error(data.msg);
        return Promise.reject(data);
    }
);

export default service;
