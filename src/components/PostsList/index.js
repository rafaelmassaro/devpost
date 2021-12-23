// import React, {useState} from 'react';

// import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons'
// import firestore from '@react-native-firebase/firestore'

// import { formatDistance} from 'date-fns'
// // import { ptBR } from 'date-fns/locale'

// import {
//     Container,
//     Header,
//     Avatar, 
//     Name,
//     ContentView,
//     Content,
//     Actions,
//     LikeButton,
//     Like,
//     TimePost
// } from './styles'

// export default function PostsList({data, userId}) {
//     const [likesPost, setLikesPost] = useState(data?.likes)

//     async function handleLikePost(id, likes){
//         const docId = `${userId}_${id}`

//         const doc = await firestore().collection('likes')
//         .doc(docId).get()

//         if(doc.exists){
//             await firestore().collection('posts')
//             .doc(id).update({
//                 likes: likes - 1
//             })

//             await firestore().collection('likes').doc(docId)
//             .delete()
//             .then(() => {
//                 setLikesPost(likes - 1)
//             })
            
//             return;

//         }


//         await firestore().collection('likes')
//         .doc(docId).set({
//             postId: id,
//             userId: userId
//         })

//         await firestore().collection('posts')
//         .doc(id).update({
//             likes: likes + 1
//         })
//         .then(() => {
//             setLikesPost(likes + 1)
//         })
//     }

//     function formatTimePost(){
//         // console.log(new Date(data.created.seconds * 1000))

//         const datePost = new Date(data.created.seconds * 1000)

//         return formatDistance(
//             new Date(),
//             datePost
//         )
//     }

//  return (
//    <Container>
//        <Header>
//             {data.avatarUrl ? (
//                 <Avatar
//                     source={{ uri: data.avatarUrl}} 
//                 />
//              ): (

//                 <Avatar
//                     source={require('../../assets/avatar.png')} 
//                 />
//              )}


//            <Name numberOfLines={1}>
//                {data?.author}
//            </Name>
//        </Header>

//        <ContentView>
//            <Content>{data?.content}</Content>
//        </ContentView>

//        <Actions>
//            <LikeButton onPress={() => handleLikePost(data.id, likesPost)}>
//                <Like>
//                    {likesPost === 0 ? '' : likesPost}
//                </Like>
//                <MaterialCommunity 
//                     name={likesPost === 0 ? 'heart-plus-outline' : 'cards-heart'}
//                     size={20}
//                     color="#e52246"
//                />
//            </LikeButton>

//            <TimePost>
//                {formatTimePost()}
//            </TimePost>
//        </Actions>
//    </Container>
//   );
// }

import React, { useState } from 'react';
import { 
  Container, 
  Name, 
  Header, 
  Avatar, 
  ContentView, 
  Content,
  Actions,
  LikeButton,
  Like,
  TimePost
} from './styles'

import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale'

import firestore from '@react-native-firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

function PostsList({ data, userId }){
  const [likePost, setLikePost] = useState(data?.likes)

  async function handleLikePost(id, likes){
    const docId = `${userId}_${id}`;
    console.log(docId)

    //Checar se o post já foi curtido
    const doc = await firestore().collection('likes')
    .doc(docId).get();

    if(doc.exists){
      //Que dizer que já curtiu esse post, entao precisamos remover o like
      await firestore().collection('posts')
      .doc(id).update({
        likes: likes - 1
      })

      await firestore().collection('likes').doc(docId)
      .delete()
      .then(() => {
        setLikePost(likes - 1)
      })
      .catch(error => console.log(error))

      return;

    }


    // Precisamos dar o like no post
    await firestore().collection('likes')
    .doc(docId).set({
      postId: id,
      userId: userId
    })

    await firestore().collection('posts')
    .doc(id).update({
      likes: likes + 1
    })
    .then(()=>{
      setLikePost(likes + 1)
    })
    .catch(error => console.log(error))


  }

  function formatTimePost(){
    // console.log(new Date(data.created.seconds * 1000));
    const datePost = new Date(data.created.seconds * 1000);

    return formatDistance(
      new Date(),
      datePost,
      {
        locale: ptBR
      }
    )
  }


  return(
    <Container>
      <Header>
        {data.avatarUrl ? (
          <Avatar
            source={{ uri: data.avatarUrl }}
          />
        ) : (
          <Avatar
            source={require('../../assets/avatar.png')}
          />
        )}
        <Name numberOfLines={1}>
          {data?.autor}
        </Name>
      </Header>

      <ContentView>
        <Content>{data?.content}</Content>
      </ContentView>

      <Actions>
        <LikeButton onPress={ () => handleLikePost(data.userId, likePost) }>
          <Like>
            {likePost === 0 ? '' : likePost}
          </Like>
          <MaterialCommunityIcons
            name={likePost === 0 ? 'heart-plus-outline' : 'cards-heart'}
            size={20}
            color="#E52246"
          />
        </LikeButton>

        <TimePost>
          {formatTimePost()}
        </TimePost>
      </Actions>


    </Container>
  )
}

export default PostsList;