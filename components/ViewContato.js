import React, { useState } from 'react';
import { StyleSheet, Text, View, Platform, Button, Image,} from 'react-native';
import { CardContatos } from './CardContatos';
import Dimensoes from '../dimensions/Dimensoes'
import Paletas from '../color/Paletas';
import { withNavigation } from 'react-navigation';
import ButtonNavegacao from './ButtonNavegacao';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

const ViewContato = (props) => {
   
    return(
        <View >
            <View style={styles.displayFlex}>
                <Text style={styles.tableHeader}>CONTATO</Text>
            </View>
            <View >
                <CardContatos styles={styles.container}>
                    <Text style={styles.id}>{'ID : ' + props.id}</Text>
                    <View style={styles.displayFlex}>
                    <Image style={styles.imagem} source={{ uri: props.imagem }} />
                    </View>
                    <View style={styles.displayText}>
                    <Text style={styles.text}>NOME : </Text><Text>{props.nome}</Text>
                    </View>
                    <View style={styles.displayText}>
                    <Text style={styles.text}>TELEFONE : </Text><Text>{props.fone}</Text>
                    </View>
                </CardContatos>
            
                <View style={styles.buttons}>
                    <View style={styles.buttons}> 
                        <Button  title="Voltar" onPress={() => props.voltar()} color={Paletas.cinza}/>
                    </View>
                    <View style={styles.buttons}>
                        <Button  title="Editar" onPress={() => props.handleEdit()} color={Paletas.principal}/>
                    </View>
                </View>
            </View>
        </View>
    );
}




ViewContato.navigationOptions = dadosNav => {
    return {
    headerTitle: "Exibição de contato",
    headerRight:
    <HeaderButtons
    HeaderButtonComponent={ButtonNavegacao}>
    <Item
        title="Exibir"
        iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
        onPress={() => { dadosNav.navigation.navigate("Exibir") }} />
    </HeaderButtons>
    }
}

const styles = StyleSheet.create ({
    container:{
        borderWidth: Dimensoes.quatro,
        borderColor: Dimensoes.preto
    },
    item: {
        backgroundColor: Paletas.planoFundo,
    },
    cartao: {
        display: 'flex', 
        flexDirection: 'row',
        justifyContent: 'space-around',
        textAlign: 'left',
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row', 
        justifyContent: 'space-around',
        padding: Dimensoes.quarenta,
        margin: Dimensoes.vinte,
    },
    
    tableHeader: {
        fontWeight: 'bold',
        marginBottom: Dimensoes.dez,
        color: Paletas.preto,
        fontSize: Dimensoes.trinta,
        textAlign: 'center',
        alignItems: 'center'
    },
    displayFlex: {
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'center',
        alignItems: 'center'
    },
    displayText: {
        flexDirection: 'row',
        textAlign: 'left',
    },
    text:{
    fontWeight: "bold",
    color: Paletas.preto,
    fontSize: Dimensoes.quinze,
    textAlign: 'left'

    },
    id: {
        fontSize: Dimensoes.quinze,   
        padding: Dimensoes.cinco,
        backgroundColor: Paletas.preto,
        textAlign: "center",
        fontWeight: "bold",
        color: Paletas.branco
    },
    imagem: {
        margin: Dimensoes.dez,
        width: Dimensoes.cem,
        height: Dimensoes.cem,
        display: 'flex',
        flexDirection: 'row' ,
    }
});

export default withNavigation(ViewContato);
