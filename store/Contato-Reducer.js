import { ADD_CONTATO, LIST_CONTATOS, EDIT_CONTATO, DEL_CONTATO } from './Contato-Action';
import Contato from '../modelo/Contato';

const estadoInicial = {
    contatos: []
};

export default (estado = estadoInicial, action) => {
    switch (action.type) {
        case ADD_CONTATO:
            const contato = new Contato(action.contato.id.toString(), action.contato.nome, action.contato.fone, action.contato.imagem);
            return {contatos: estado.contatos.concat(contato)};
        
        case LIST_CONTATOS:
            return {contatos: action.contatos.map(c => new Contato(c.id, c.nome, c.fone, c.imagem))};
        
        case EDIT_CONTATO: 
            let removedArray = estado.contatos.filter((c) => {return c.id != action.contato.id.toString() });
            estado.contatos = removedArray;
            const novoContato = new Contato(action.contato.id.toString(), action.contato.nome, action.contato.fone, action.contato.imagem);
            return {contatos: estado.contatos.concat(novoContato)};
        
        case DEL_CONTATO:
            let newArray = estado.contatos.filter((c) => {return c.id != action.contato.id.toString() });
            return {contatos: estado.contatos = newArray }
        
        default:
            return estado;
    }
}

