import {extend} from "umi-request";
import Cookies from 'js-cookie'


const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/** 异常处理程序 */

const errorHandler = (error) => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    console.error(`请求错误 ${status}: ${url}`)
    console.error(`请求错误 ${errorText}`)
  } else if (!response) {
    console.error('您的网络发生异常，无法连接服务器')
  }

  return response;
};

/** 配置request请求时的默认参数 */

const request = extend({
  prefix: "/api/1.0",
  errorHandler,
  // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});


request.interceptors.request.use(async (url, options) => {
  let _token = Cookies.get("token");

  if (_token) {
    console.log(`请求拦截，对\n${url}\n进行处理,有token`);
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': _token
    };
    return (
      {
        url: url,
        options: { ...options, headers: headers },
      }
    );
  } else {
    console.log(`请求拦截，对\n${url}\n进行处理,无token`);
    return (
      {
        url: url,
        options: { ...options },
      }
    );
  }

})

// response拦截器, 处理response
request.interceptors.response.use((response, options) => {
  const _token = response.headers.get('token')
  if(_token){
    // console.log(`获取到Token了${_token}`);
    const millisecond = new Date().getTime();
    const expiresTime = new Date(millisecond + 60 * 1000 * 60 * 3);
    Cookies.set("token", _token,{expires: expiresTime});
  }
  return response;
});

export default request;
