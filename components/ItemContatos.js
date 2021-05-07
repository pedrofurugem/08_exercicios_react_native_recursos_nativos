import React from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Keyboard,Image} from 'react-native';
import { CardContatos } from './CardContatos';
import { withNavigation } from 'react-navigation';
import Dimensoes from '../dimensions/Dimensoes';
import Paletas from '../color/Paletas';
import * as Action from '../store/Contato-Action';

const ItemContatos = (props) => {

    const dispatch = useDispatch();

    const del = (id) => {
        dispatch(Action.deletarContato(id));
    }

    const confirmaExclusao = () => {
        Alert.alert(
            'Excluir',
            'Deseja mesmo excluir?',
            [
                {text: 'Sim', style: 'default', onPress: () => del(props.id)},
                {text: 'Não', style: 'default', onPress:  Keyboard.dismiss()},
            ]
        );
       
    }

    return(
        <TouchableOpacity onPress={() => props.onClick(props.id)} onLongPress={confirmaExclusao}>
            <View styles={styles.item}>
                <CardContatos styles={styles.cartao}>
                <Image style={styles.imagem} source={{ uri: props.imagem }} />
                <View style={styles.item}>
                <View style={styles.displayFlex}>
                    <Text style={styles.text}>  NOME : </Text><Text>{props.nome}</Text>
                </View>
                <View style={styles.displayFlex}>
                    <Text style={styles.text}>  TELEFONE : </Text><Text>{props.fone}</Text>
                </View>
                </View>
                </CardContatos>
            </View>
        </TouchableOpacity>
    );
}



const styles = StyleSheet.create ({
    id: {
        fontSize: Dimensoes.quinze,     
        padding: Dimensoes.um,
        backgroundColor: Paletas.preto,
        textAlign: "center",
        fontWeight: "bold",
        color: Paletas.branco
    },
    item: {
        flexDirection: 'column',
    },
    displayFlex: {
        display: 'flex',
        flexDirection: 'row'
    },
    cartao: {
        flexDirection: 'row',
        padding: Dimensoes.dez,
        margin: Dimensoes.cinco,
        
    },
    text:{
        fontWeight: "bold",
        color: Paletas.preto,
        fontSize: Dimensoes.quinze,
        textAlign: 'left',
    },
    imagem: {
        flexDirection: 'column',
        width: 80,
        height: 80
    }
});

export default withNavigation(ItemContatos);