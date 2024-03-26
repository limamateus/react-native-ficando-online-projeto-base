import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import estilos from './estilos';
import { buscarRepositorio } from '../../servicos/requisicoes/repositorio';
export default function Repositorios({ route, navigation }) {
    const [repo, setRepo] = useState([]);

    useEffect( async () => { // Aqui estou usando o hook useEfect para toca vez que o componente for rederizado ele realizar a requisição na api
        const resultado = await buscarRepositorio(route.params.id) // aqui estou passando para função o id 
        console.log(resultado)
        setRepo(resultado) // Mudo o estado padrão com os dados da api
    },[])
    return (
        <View style={estilos.container}>
                <Text style={estilos.repositoriosTexto}>{repo.length} repositórios criados</Text>
                <TouchableOpacity 
                    style={estilos.botao}
                    onPress={() => navigation.navigate('CriarRepositorio')}
                >
                    <Text style={estilos.textoBotao}>Adicionar novo repositório</Text>
                </TouchableOpacity>

                <FlatList 
              
                data={repo} // dados da api
                style={{width:'100%'}} // estilo
                keyExtractor={repo => repo.id} // definindo o id 
                renderItem={({item}) => ( // renderizo as informações com os dados da api 
                    <TouchableOpacity
                    style={estilos.repositorio}
                    onPress={() => navigation.navigate('InfoRepositorio',{item})}  // vou para proxima tela passando os dados do item
                    >
                        <Text style={estilos.repositorioNome}>{item.name}</Text>
                        <Text style={estilos.repositorioData}>{item.data}</Text>
                    </TouchableOpacity>
                )}
                
                />
        </View>
    );
}
