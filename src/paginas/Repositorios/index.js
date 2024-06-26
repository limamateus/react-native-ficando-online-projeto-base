import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import estilos from './estilos';
import { buscarRepositorioPorNome, buscarRepositorio} from '../../servicos/requisicoes/repositorio';
import { useIsFocused } from '@react-navigation/native';
export default function Repositorios({ route, navigation }) {
    const [repo, setRepo] = useState([]);
    const [nomeRepositorio,setNomeRepositorio] = useState('')

    const estaNaTela = useIsFocused();

   async function buscarRepositorioPeloNome(){
        if(nomeRepositorio === ''){
           Alert.alert('Por favor preecha o nome do repositorio')
        }else{
            console.log(route.params.id,nomeRepositorio)
            const resultado = await buscarRepositorioPorNome(route.params.id,nomeRepositorio)             
            setRepo(resultado)
            setNomeRepositorio('')

        }
     
   }


   useEffect(() => {
    async function fetchRepositorio() { // // função assíncrona diretamente no useEffect não é suportado nas versões mais recentes do React
        try {
            const resultado = await buscarRepositorio(route.params.id);
            console.log(resultado);
            setRepo(resultado);
        } catch (error) {
            console.error("Erro ao buscar repositório:", error);
            // Trate o erro de acordo com sua lógica, como exibir uma mensagem para o usuário
        }
    }

    fetchRepositorio();

}, [estaNaTela]);
    
    return (
        <View style={estilos.container}>
                <Text style={estilos.repositoriosTexto}>{repo.length} repositórios criados</Text>
                
                 <TextInput
                    placeholder="Busque pelo nome do Repositorio"
                    autoCapitalize="none"
                    style={estilos.entrada}
                    value={nomeRepositorio} // aqui estou definindo o valor do texto na variavel usuario
                    onChangeText={setNomeRepositorio} // aqui estou usando o onChangeText,pois ao mudar o texto, ele faz alguma coisa
                />
                    <TouchableOpacity 
                    style={estilos.botao}  
                    onPress={() => buscarRepositorioPeloNome()}                 
                >
                    <Text style={estilos.textoBotao}>Buscar Repositorio</Text>
                </TouchableOpacity>

                
                <TouchableOpacity 
                    style={estilos.botao}
                    onPress={() => navigation.navigate('CriarRepositorio',{id: route.params.id})}
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
