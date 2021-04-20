import dva from 'dva';

// 引入antd-mobile样式文件
import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.less'
import './index.css';
import Order from './models/order'

// 1. Initialize
import {createBrowserHistory as createHistory} from 'history';
const app = dva({
  history: createHistory(),
});
// const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/user').default)
app.model(Order)
// ;

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
