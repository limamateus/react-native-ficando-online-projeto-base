import apiAlura from "../apiAlura";


export async function buscarUsuarioAluraPorNome(nomeUsuario){
    try {
       
        const resultado = await apiAlura.get(`/users/${nomeUsuario}`).then(response => {
            console.log(response.data)
            return response.data;
            
        }).catch(error => {
            console.log(error);
            return [];
        })
        return resultado;
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function buscarRepositorioDoUsuarioAlura(nomeUsuario){
    try {
       
        const resultado = await apiAlura.get(`/users/${nomeUsuario}/repos`).then(response => {
            console.log(response.data)
            return response.data;
            
        }).catch(error => {
            console.log(error);
            return [];
        })
        return resultado;
    } catch (error) {
        console.log(error)
        return []
    }
}