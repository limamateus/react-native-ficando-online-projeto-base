import api from "../api"
 // Get By Id
export async function buscarRepositorio(id){
    try {
        const resultado = await api.get(`/repos?postId=${id}`)
        return resultado.data
    } catch (error) {
        console.log(error)
        return {}
    }
}

// Get By Name
export async function buscarRepositorioPorNome(postId, name){
    try {
        const resultado = await api.get(`/repos?postId=${postId}&name=${name}`).then(response => {
            console.log(response.data)
            return response.data;
            
        }).catch(error => {
            console.log(error);
            return [];
        })
        return resultado;
    } catch (error) {
        console.log(error)
        return {}
    }
}

// Put
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


// Post
export async function criarRepositorio(nome,data,postId){
    try {
        console.log(nome, data, postId)
            await api.post(`repos/`,{
                name: nome,
                postId: postId,
                data: data                
            });
    
       return 'Sucesso'
    } catch (error) {
        console.log(error)
        return 'Erro na criar do Repositorio'
    }
}

// delete
export async function deletarRepositorio(id){
    try {       
        console.log(id)
            await api.delete(`repos/${id}`);    
       return 'Sucesso'
    } catch (error) {
        console.log(error)
        return 'Erro na deletar do Repositorio'
    }
}