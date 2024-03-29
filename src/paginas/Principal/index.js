import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import estilos from './estilos';
import { buscarUsuario } from '../../servicos/requisicoes/usuarios';
import { buscarUsuarioAluraPorNome } from '../../servicos/requisicoes/usuariosAlura';

export default function Principal({ navigation }) {
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [usuario, setUsuario] = useState({});

   async function buscar(){ // função assincrona que irá espera resultado da api

    const resultado = await buscarUsuarioAluraPorNome(nomeUsuario) // realizado  a busca na api
    
    console.log(resultado) 

    if(resultado){ // caso eu encontre, retorno o resultado
        setUsuario('')
        setUsuario(resultado)
        

    } else{ // caso não encontrei retorno um alertar
 
        Alert.alert('Usuario não encontrado');
        return setUsuario({}) // Retorno um objeto vazio para limpar as informações
    }
   }
    return (
        <ScrollView>
            <View style={estilos.container}>
                { // Aqui eu irei realizar uma verificação
                    usuario?.login && // Caso encontre o login ele irá rederizar os componentes abaixo
                <>
                    <View style={estilos.fundo} />
                    <View style={estilos.imagemArea}>
                        <Image source={{ uri: usuario.avatar_url}} style={estilos.imagem} />
                    </View>
                    <Text style={estilos.textoNome}>{usuario.name}</Text>
                    <Text style={estilos.textoEmail}>{usuario.email}</Text>
                    <View style={estilos.seguidoresArea}>
                        <View style={estilos.seguidores}>
                            <Text style={estilos.seguidoresNumero}>{usuario.followers}</Text>
                            <Text style={estilos.seguidoresTexto}>Seguidores</Text>
                        </View>
                        <View style={estilos.seguidores}>
                            <Text style={estilos.seguidoresNumero}>{usuario.following}</Text>
                            <Text style={estilos.seguidoresTexto}>Seguindo</Text>
                        </View>
                    </View>
                    <TouchableOpacity 
                    onPress={() => navigation.navigate('Repositorios',{login:usuario.login})}>
                       
                       
                        <Text style={estilos.repositorios}>
                            Ver os repositórios
                        </Text>
                    </TouchableOpacity>
                </>
                // Se não encontra só vai mostar os input e botão
                } 
                <TextInput
                    placeholder="Busque por um usuário"
                    autoCapitalize="none"
                    style={estilos.entrada}
                    value={nomeUsuario} // aqui estou definindo o valor do texto na variavel usuario
                    onChangeText={setNomeUsuario} // aqui estou usando o onChangeText,pois ao mudar o texto, ele faz alguma coisa
                />

                <TouchableOpacity
                    onPress={() => buscar()}
                     style={estilos.botao}
                     
                     
                     >
                    <Text
                     style={estilos.textoBotao}
                     
                     >
                        Buscar
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
