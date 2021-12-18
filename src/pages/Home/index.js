import React from 'react';
import { View, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native'

import Feather from 'react-native-vector-icons/Feather'

import { Container, ButtonPost } from './styles'

export default function Home() {
  const navigation = useNavigation()

  return (
    <Container>
      <ButtonPost onPress={() => navigation.navigate("NewPost")}>
        <Feather
          name='edit-2'
          color="#fff"
          size={25}
        />
      </ButtonPost>
    </Container>
  );
}