import * as FileSystem from 'expo-file-system'
import { 
    addContato, 
    searchContato, 
    editContato, 
    delContato
} from '../helpers/DB';

export const ADD_CONTATO = 'ADD_CONTATO';
export const LIST_CONTATOS = 'LIST_CONTATOS';
export const EDIT_CONTATO = "EDIT_CONTATO";
export const DEL_CONTATO = 'DEL_CONTATO';



export const atualizarContato = (id, nome, fone, imagem) => {
    return async dispatch => {
        const nomeArquivo = imagem.split("/").pop();
        const novoPath = FileSystem.documentDirectory + nomeArquivo;
    
        try {
            await FileSystem.moveAsync({
                from: imagem,
                to: novoPath
            })
            const resultadoDB = await editContato(
                id,
                nome,
                fone,
                novoPath
            )

            dispatch({ type: EDIT_CONTATO, contato: { id: id, nome: nome, fone: fone, imagem: novoPath } })
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
}

export const listarContatos = () => {
    return async dispatch => {
        try {
            const resultadoDB = await searchContato();
            dispatch({ type: LIST_CONTATOS, contatos: resultadoDB.rows._array })
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
}

export const deletarContato = (id) => {
    return async dispatch => {
        try {
            const resultadoDB = await delContato(id);
            dispatch({ type: DEL_CONTATO, contato: {id: id} })
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
}

export const criarContato  = (nome, fone, imagem) => {
    return async dispatch => {
        const nomeArquivo = imagem.split("/").pop();
        const novoPath = FileSystem.documentDirectory + nomeArquivo;
    
        try {
            await FileSystem.moveAsync({
                from: imagem,
                to: novoPath
            })
            const resultadoDB = await addContato(
                nome,
                fone,
                novoPath
            )

            dispatch({ type: ADD_CONTATO, contato: { id: resultadoDB.insertId, nome: nome, fone: fone, imagem: novoPath } })
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
}