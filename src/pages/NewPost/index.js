import React, { useState, useLayoutEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native'
import { View, Text } from 'react-native';

import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'

import { AuthContext } from '../../contexts/auth'

import {
  Container,
  Input,
  Button,
  ButtonText
} from './styles';

export default function NewPost() {
  const navigation = useNavigation()
  const [post, setPost] = useState('')

  const { user } = useContext(AuthContext)

  useLayoutEffect(() => {
    const options = navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => handlePost()}>
          <ButtonText>Compartilhar</ButtonText>
        </Button>
      )
    })
  }, [navigation, post])

  async function handlePost() {
    if (post === '') {
      console.log("Seu post contém conteúdo inválido")
      return
    }

    let avatatUrl = null

    try {
      let response = await storage().ref('users').child(user?.id).getDownloadURL()
      avatatUrl = response


    } catch (error) {
      avatatUrl = null
    }

    await firestore().collection('posts')
      .add({
        created: new Date(),
        content: post,
        author: user.name,
        likes: 0,
        avatatUrl,
        userId: user.uid,
      })
      .then(() => {
        setPost('')
        console.log('Post criado com sucesso!')
      })
      .catch((error) => {
        console.log(error)
      })

    navigation.goBack()

  }

  return (
    <Container>
      <Input
        placeholder="O que está acontecendo?"
        placeholderTextColor="#ddd"
        multiline={true}
        maxLength={300}
        value={post}
        onChangeText={(text) => setPost(text)}
        autoCorrect={false}
      />
    </Container>
  );
}