
import api from "../api"

export async function buscarUsuario(nomeUsuario){ // Função a sincrona que irá realizar  a requisição na api passando nome do usuario
    try {
        const resultado = await api.get(`users?login=${nomeUsuario}`) // Aqui estou passando para uma veriavel resultado retorno da api
        return resultado.data[0]
    } catch (error) { // caso de algum erro faço um trantamento que no caso não fiz, só retorno no console, mas quando eu aprender usar firebase eu implemento para ter o log
        console.log(error)
        return[]
    }
}