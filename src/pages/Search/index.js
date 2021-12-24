import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import Feather from 'react-native-vector-icons/Feather'

import { Container, AreaInput, Input, List } from './styles'

import SearchItem from '../../components/SearchItem';

export default function Search() {
  const [input, setInput] = useState('')
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (input === '' || input === undefined) {
      setUsers([])
      return
    }

    const subscriber = firestore().collection('users')
      .where('name', '>=', input)
      .where('name', '<=', input + '\uf8ff')
      .onSnapshot(snapshot => {
        const listUsers = []

        snapshot.forEach(doc => {
          listUsers.push({
            ...doc.data(),
            id: doc.id,
          })
        })

        setUsers(listUsers)

      })

    return () => subscriber()

  }, [input])

  return (
    <Container>
      <AreaInput>

        <Feather
          name='search'
          size={20}
          color='#e52246'
        />

        <Input
          placeholder="Procurando alguém?"
          value={input}
          onChangeText={(text) => setInput(text)}
          placeholderTextColor="#353840"
        />
      </AreaInput>

      <List
        showsVerticalScrollIndicator={false}
        data={users}
        renderItem={({ item }) => <SearchItem data={item} />}
      />
    </Container>
  );
}