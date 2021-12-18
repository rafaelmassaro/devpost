import React, { useState, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import { View, Text } from 'react-native';

import {
  Container,
  Input,
  Button,
  ButtonText
} from './styles';

export default function NewPost() {
  const navigation = useNavigation()
  const [post, setPost] = useState('')

  useLayoutEffect(() => {
    const options = navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => alert('test')}>
          <ButtonText>Compartilhar</ButtonText>
        </Button>
      )
    })
  }, [])

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