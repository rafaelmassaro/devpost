import React, { useState, useContext, useCallback } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather'
import firestore from '@react-native-firebase/firestore'

import { Container, ButtonPost, ListPosts } from './styles'

import Header from '../../components/Header';
import PostsList from '../../components/PostsList';

import { AuthContext } from '../../contexts/auth'


export default function Home() {
  const navigation = useNavigation()
  const { user } = useContext(AuthContext)

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const [loadingRefresh, setLoadingRefresh] = useState(false)
  const [lastItem, setLastItem] = useState('')
  const [emptyList, setEmptyList] = useState(false)

  useFocusEffect(
    useCallback(() => {
      let isActive = true

      function fetchPosts() {
        firestore().collection('posts')
          .orderBy('created', 'desc')
          .limit(5)
          .get()
          .then((snapshot) => {

            if (isActive) {
              setPosts([])
              const postList = []

              snapshot.docs.map(u => {
                postList.push({
                  ...u.data(),
                  id: u.id,
                })
              })

              setEmptyList(!!snapshot.empty)
              setPosts(postList)
              setLastItem(snapshot.docs[snapshot.docs.length - 1])
              setLoading(false)


            }
          })
      }

      fetchPosts()

      return () => {
        isActive = false
      }

    }, [])
  )

  async function handleRefreshPosts() {
    setLoadingRefresh(true)

    firestore().collection('posts')
      .orderBy('created', 'desc')
      .limit(5)
      .get()
      .then((snapshot) => {

        setPosts([])
        const postList = []

        snapshot.docs.map(u => {
          postList.push({
            ...u.data(),
            id: u.id,
          })
        })

        setEmptyList(false)
        setPosts(postList)
        setLastItem(snapshot.docs[snapshot.docs.length - 1])

      })

    setLoadingRefresh(false)
  }

  async function getListPosts() {
    if (emptyList) {
      setLoading(false)
      return null
    }

    if (loading) return;

    firestore().collection('posts')
      .orderBy('created', 'desc')
      .limit(5)
      .startAfter(lastItem)
      .get()
      .then((snapshot) => {
        const postList = []

        snapshot.docs.map(u => {
          postList.push({
            ...u.data(),
            id: u.id
          })
        })

        setEmptyList(!!snapshot.empty)
        setLastItem(snapshot.docs[snapshot.docs.length - 1])
        setPosts(oldPosts => [...oldPosts, ...postList])
        setLoading(false)
      })
      .catch(error => console.log(error))

  }

  return (
    <Container>
      <Header />

      {loading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size={50} color="#e52246" />
        </View>
      ) : (
        <ListPosts
          showsVerticalScrollIndicator={false}
          data={posts}
          renderItem={({ item }) => (
            <PostsList
              data={item}
              userId={user?.uid}
            />
          )}

          refreshing={loadingRefresh}
          onRefresh={handleRefreshPosts}

          onEndReached={() => getListPosts()}
          onEndReachedThreshold={0.1}
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