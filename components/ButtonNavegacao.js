import React from 'react';
import { Platform } from 'react-native';
import Paletas from '../color/Paletas';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons'

const ButtonNavegacao = (props) => {
    return (
    <HeaderButton
        {...props}
        IconComponent={Ionicons}
        iconSize={23}
        color={Platform.OS === 'android' ? 'black' : Paletas.principal}
    />
    );
};

export default ButtonNavegacao;