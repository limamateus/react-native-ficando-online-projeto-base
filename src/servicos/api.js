import axios from "axios"; // pacote que devo usar sempre kkk


const api = axios.create({ // creando ao instacia da api
    baseURL:'http://192.168.0.12:3000/' // defino a url base
})


export default api;