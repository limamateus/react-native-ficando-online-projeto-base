import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import estilos from './estilos';
import {atualizarRepositorio,deletarRepositorio} from '../../servicos/requisicoes/repositorio'
export default function InfoRepositorio({ route, navigation }) {
    const [nome, setNome] = useState(route.params.item.name); // Aqui estou definindo um stato padrão com o que vem da rota
    const [data, setData] = useState(route.params.item.data);
    
    async function atualizar(){
        const resultado = await atualizarRepositorio(
            nome,
            data,
            route.params.item.postId,
            route.params.item.id
           
        )
            console.log(resultado)
        if(resultado === 'Sucesso'){
            Alert.alert('Repositorio Atualizado com sucesso')
            navigation.goBack()
        }else{
            Alert.alert('Erro!')
        }            
        
    }


    async function excluirRepositorio(){
        const resultado = await deletarRepositorio(route.params.item.id)
        if(resultado === 'Sucesso'){
            Alert.alert('Repositorio deletado com sucesso!')
            navigation.goBack()
        }else{
            Alert.alert('Erro ao deletar o repositorio!')
        }
    }
    return (
        <View style={estilos.container}>
            <TextInput
                placeholder="Nome do repositório"
                autoCapitalize="none"
                style={estilos.entrada}
                value={nome} // 
                onChangeText={setNome}
            />
            <TextInput
                placeholder="Data de criação"
                autoCapitalize="none"
                style={estilos.entrada}
                value={data}
                onChangeText={setData}
            />
            <TouchableOpacity 
                style={estilos.botao} 
                onPress={atualizar}
            >
                <Text style={estilos.textoBotao}>
                    Salvar
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[estilos.botao, {backgroundColor: '#DD2B2B', marginTop: 10}]} 
                onPress={() => excluirRepositorio()}
            >
                <Text style={estilos.textoBotao}>
                    Deletar
                </Text>
            </TouchableOpacity>
        </View>
    );
}
