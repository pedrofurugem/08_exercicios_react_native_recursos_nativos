import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Main from '../components/Main';
import Paletas from '../color/Paletas';
import InputContatos from '../components/InputContatos';
import EditContato from '../components/EditContato';
import ViewContato from '../components/ViewContato';
import ItemContatos from '../components/ItemContatos';

const Navigation = createStackNavigator({
    CONTATOS: Main,
    ADICIONAR: InputContatos,
    EDITAR: EditContato,
    ITEM: ItemContatos,
    CONTATO: ViewContato
    
    
}, { defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Paletas.principal : ''
    },
    headerTintColor: Platform.OS === 'android' ? Paletas.principal : Paletas.principal
    }
});

export default createAppContainer(Navigation);