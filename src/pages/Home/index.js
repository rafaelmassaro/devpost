import React, {useState, useContext, useCallback} from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather'
import firestore from '@react-native-firebase/firestore'

import { Container, ButtonPost, ListPosts } from './styles'

import Header from '../../components/Header';

import { AuthContext } from '../../contexts/auth'


export default function Home() {
  const navigation = useNavigation()

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useFocusEffect(
    useCallback(() => {
      let isActive = true

      function fetchPosts(){
        firestore().collection('posts')
        .orderBy('created', 'desc')
        .limit(5)
        .get()
        .then((snapshot) => {
          
          if(isActive){
            setPosts([])
            const postList = []

            snapshot.docs.map(u => {
              postList.push({
                ...u.data(),
                id: u.id,
              })
            })

            setPosts(postList)
            setLoading(false)


          }
        })
      }

      fetchPosts()

      return() => {
        isActive = false
      }

    }, [])
  )

  return (
    <Container>
      <Header />

      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size={50} color="#e52246"/>
        </View>
        ): (
        <ListPosts
          data={posts}
          renderItem={({item}) => (<Text>Teste</Text>)} 
        />
      )}


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