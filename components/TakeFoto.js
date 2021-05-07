import React, {useState} from 'react';
import { View, Button, Image, Text, StyleSheet,TouchableOpacity } from 'react-native';
import Paletas from '../color/Paletas';
import * as ImagePicker from 'expo-image-picker';

const Takefoto = props => {
    const [imagemURI, setImagemURI] = useState();

    const takeFoto = async () => {
        const foto = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [9, 9],
            quality: 1
        });
        setImagemURI(foto.uri);
        props.onFotoTirada(foto.uri);
    }

    return (
        <View style={styles.principal}>
            <View style={styles.previewDaImagem}>
                {!imagemURI ?
                <Text>Sem foto</Text>:
                <TouchableOpacity onPress={takeFoto} >
                    <Image style={styles.imagem} source={{ uri: props.imagem }}/>
                </TouchableOpacity>}
            </View>
                <Button title="Inserir foto do contato"color={Paletas.preto}onPress={takeFoto}/>
        </View>
        )
};
const styles = StyleSheet.create({
    principal: {
        alignItems: 'center',
        marginBottom: 15
    },
    previewDaImagem: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderColor: '#CCC',
        borderWidth: 1
    },
    imagem: {
        width: 200,
        height: 200,
    }
});
export default Takefoto;