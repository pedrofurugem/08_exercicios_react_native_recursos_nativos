import React from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import Paletas from '../color/Paletas';
import Dimensoes from '../dimensions/Dimensoes'

export const CardContatos = (props) => {
    return(
        <View style={{...styles.cartao, ...props.styles}}>
            {props.children}
        </View>
    );

};

const styles = StyleSheet.create({
cartao: {
    shadowColor: Paletas.preto,
    shadowOffset: {
    width: Dimensoes.zero,
    height: Dimensoes.dois,
    backgroundColor: Paletas.cinza,
    },
    backgroundColor: Paletas.cinza,
    elevation: Dimensoes.quatro,
    padding: Dimensoes.cinco,
    borderWidth: Dimensoes.quatro,
    borderColor: Dimensoes.preto
    }
});
