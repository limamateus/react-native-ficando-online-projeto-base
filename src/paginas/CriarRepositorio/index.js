import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import estilos from './estilos';
import { criarRepositorio } from '../../servicos/requisicoes/repositorio';

export default function CriarRepositorio({ route, navigation }) {
    const [nome, setNome] = useState('');
    const [data, setData] = useState('');

    async function novoRepositorio(){
        try {
            const resultado = await criarRepositorio(nome,data,route.params.id)
            if(resultado === 'Sucesso'){
             Alert.alert('Repositorio criado com sucesso!')             

              navigation.goBack();
            }else{
                Alert.alert('Ouve um erro ao enviar o repostiorio')
            }

            

            
            
        } catch (error) {
            return Alert.alert('Erro ao criar o repositorio.')
        }
    }

    return (
        <View style={estilos.container}>
            <TextInput
                placeholder="Nome do repositório"
                autoCapitalize="none"
                style={estilos.entrada}
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                placeholder="Data de criação"
                autoCapitalize="none"
                style={estilos.entrada}
                value={data}
                onChangeText={setData}
            />
            <TouchableOpacity style={estilos.botao}
                onPress={() => novoRepositorio()}
            >
                <Text style={estilos.textoBotao}>
                    Criar
                </Text>
            </TouchableOpacity>
        </View>
    );
}
