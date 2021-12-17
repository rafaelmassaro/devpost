import React, {useState, useContext} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';

import { AuthContext } from '../../contexts/auth'

import {
  Container,
  Title,
  Input,
  Button, 
  ButtonText,
  SignUpButton,
  SignUpButtonText
} from './styles';

export default function Login() {
  const { signIn, signUp, loadingAuth } = useContext(AuthContext)

  const [login, setLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function toggleLogin(){
    setLogin(!login)
    setName('')
    setEmail('')
    setPassword('')
  }

  function handleLogin(){
    if(email === '' || password === ''){
      console.log('Preencha todos os campos')
      return
    }
    signIn(email, password)
  }

  function handleSignup(){
    if(name === '' || email === '' || password === ''){
      console.log('Preencha todos os campos')
      return
    }
    signUp(email, password, name)
  }


  if(login){
    return(
      <Container>
        <Title>
          Dev 
          <Text style={{color: '#e52246'}}>Post</Text>
        </Title>

        <Input
          placeholder="mail@mail.com" 
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <Input
          placeholder="******"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <Button onPress={handleLogin}>
          {
            loadingAuth ? (
              <ActivityIndicator size={20} color="#fff"/>  
            ) : (
              <ButtonText>Acessar</ButtonText>
            )
          }
        </Button>

        <SignUpButton onPress={() => toggleLogin()}>
          <SignUpButtonText>Criar uma conta</SignUpButtonText>
        </SignUpButton>
      </Container>
    )
  }

 return (
   <Container>
      <Title>
          Dev 
          <Text style={{color: '#e52246'}}>Post</Text>
        </Title>

        <Input
          placeholder="Nome"
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <Input
          placeholder="mail@mail.com" 
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <Input
          placeholder="******"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <Button onPress={handleSignup}>
          {
            loadingAuth ? (
              <ActivityIndicator size={20} color="#fff"/>  
            ) : (
              <ButtonText>Cadastrar</ButtonText>
            )
          }
        </Button>

        <SignUpButton onPress={() => toggleLogin()}>
          <SignUpButtonText>Já tenho uma conta</SignUpButtonText>
        </SignUpButton>
   </Container>
  );
}