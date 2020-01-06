import axios from 'axios';
import store from '../store/index';

const service = axios.create({
    timeout:60000  //响应时间1分钟
})
service.interceptors.request.use(
    config =>{
       // console.log("执行service")
       // console.log(config)
        if(store.state.Authorization){
            console.log(store.state.Authorization)
        }
        return config;
    }
    
)
export default service