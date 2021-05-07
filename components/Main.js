import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,Button, FlatList,Image } from 'react-native';
import InputContatos from './InputContatos';
import ItemContatos from './ItemContatos';
import Paletas from '../color/Paletas';
import ViewContato from './ViewContato';
import EditContato from  './EditContato';
import Dimensoes from '../dimensions/Dimensoes'
import * as Action from '../store/Contato-Action'
import { withNavigation } from 'react-navigation';
import { useSelector, useDispatch } from 'react-redux';

const Main = ({navigation}) => {
  const [contato, setContato] = useState ([]);
  const [modoAdd, setModoAdd] = useState(false);
  const [contatoSelecionado, setContatoSelecionado] = useState({});
  const [modoEdit, setModoEdit] = useState(false);
  const [modoView, setModoView] = useState(false);
  const lista_contatos = useSelector(estado => estado.contatos.contatos);
  const dispatch = useDispatch();

  function handleBack(){
    setModoAdd(false);
    setModoEdit(false);
    setModoView(false);
  }

  useEffect(() => {
    dispatch(Action.listarContatos())
  }, [dispatch]);

  const handleSaveClick = (nome, fone) => {
    let id = calculateIndex();
    setContato(contato => {
      return [...contato, {id: id, nome: nome, fone: fone}];
    })
  }

  const handleSaveEdit = (nome, fone) => {
    let index = findContatoIndex();

    removerContato(contatoSelecionado.id);

    if(index >= 0){
      setContato(contato => {
        return [...contato, {id: contatoSelecionado.id, nome: nome, fone: fone}];
      })
    }
    setModoEdit(false);
  }

  function handleAddClick(){
    setModoAdd(true);
  }

  function findContatoIndex(){
    return contato.indexOf(contatoSelecionado.id)
  }

  function calculateIndex(){
    if(contato.length == 0 ){
      return 10;
    } else{
      let ultimoContato = contato[contato.length - 1];
      return ultimoContato.id + 2;
    }
  }

  const removerContato = (key) => {
    let filteredContato = contato.filter((c) => {return c.id != key });
    setContato(filteredContato);
  }
 
  const exibir = (key) => {
    let filteredContato = lista_contatos.filter((c) => {return c.id == key });
    setContatoSelecionado(filteredContato[0]);
    setModoView(true);
    setModoAdd(false);
    setModoEdit(false);
  }

  const handleEditClick = () => {
    setModoEdit(true);
    setModoView(false);
  }
  
  return (
    <View style={styles.container}>
      {modoAdd == false && modoEdit == false && modoView == false &&
        <View>
          <View style={styles.displayFlex}>
          <Image style={styles.icones} source={require('../icons/contact.png')} />
          </View>
          <Text style={styles.title}>LISTA DE CONTATOS</Text>
          {lista_contatos && lista_contatos.length > 0? 
            <FlatList
              data={lista_contatos}
              renderItem={
              contato => (
              
              <ItemContatos 
                id={contato.item.id}
                nome={contato.item.nome}
                fone={contato.item.fone}
                imagem={contato.item.imagem}
                onDelete={removerContato}
                onClick={exibir}
              />
              
              )}
              keyExtractor={(item) => item.id.toString()}
            />
            :
            null
          }
          <View style={styles.botao} >
          <Button  title="Inserir novo contato"  onPress={() => {handleAddClick()}} />
          </View>
      </View>
      }
      {modoAdd == true &&
        <InputContatos salvar={handleSaveClick} voltar={handleBack}/>
      }
      {modoView ==true&&
          <ViewContato id={contatoSelecionado.id} nome={contatoSelecionado.nome} fone={contatoSelecionado.fone} imagem={contatoSelecionado.imagem} voltar={handleBack} handleEdit={handleEditClick}/>
      }
      {modoEdit == true &&
        <EditContato id={contatoSelecionado.id} nome={contatoSelecionado.nome} fone={contatoSelecionado.fone} imagem={contatoSelecionado.imagem} voltar={handleBack} handleSaveClick={handleSaveEdit} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: Dimensoes.um,
    backgroundColor: Paletas.planoFundo,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item:{
    color: Paletas.cinza,
    padding: Dimensoes.dois,
    borderColor: Paletas.preto,
    margin:Dimensoes.cinco,
  },
  tableHeader: {
    fontWeight: 'bold',
    marginBottom: Dimensoes.dez,
    color: Paletas.principal
    
  },
  title: {
    color: Paletas.black,
    fontSize: Dimensoes.trinta,
    fontWeight: 'bold',
    marginTop: Dimensoes.quinze,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: Dimensoes.cinco,
    width: Dimensoes.wi,
    textAlign: 'center',
    padding: Dimensoes.vinte
    
  },
  displayFlex: {
    paddingTop: Dimensoes.quinze,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  icones: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensoes.cem,
    height: Dimensoes.cem,
  },
  botao:{
    borderWidth: Dimensoes.quatro,
    borderColor: Paletas.preto,
    marginBottom:Dimensoes.trinta,
  }
});

export default withNavigation(Main);