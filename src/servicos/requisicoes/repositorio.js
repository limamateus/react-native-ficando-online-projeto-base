import api from "../api"

export async function buscarRepositorio(id){
    try {
        const resultado = await api.get(`/repos?postId=${id}`)
        return resultado.data
    } catch (error) {
        console.log(error)
        return {}
    }
}

export async function atualizarRepositorio(nome,data,postId,id){
    try {
        console.log(nome, data, postId, id)
            await api.put(`repos/${id}`,{
                name: nome,
                postId: postId,
                data: data,
                id: id
            });
    
       return 'Sucesso'
    } catch (error) {
        console.log(error)
        return 'Erro na atualização do Repositorio'
    }
}