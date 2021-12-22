import React, {useState} from 'react';

import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons'

import { formatDistance} from 'date-fns'
// import { ptBR } from 'date-fns/locale'

import {
    Container,
    Header,
    Avatar, 
    Name,
    ContentView,
    Content,
    Actions,
    LikeButton,
    Like,
    TimePost
} from './styles'

export default function PostsList({data, userId}) {
    const [likesPost, setLikesPost] = useState(data?.likes)

    function formatTimePost(){
        // console.log(new Date(data.created.seconds * 1000))

        const datePost = new Date(data.created.seconds * 1000)

        return formatDistance(
            new Date(),
            datePost
        )
    }

 return (
   <Container>
       <Header>
            {data.avatarUrl ? (
                <Avatar
                    source={{ uri: data.avatarUrl}} 
                />
             ): (

                <Avatar
                    source={require('../../assets/avatar.png')} 
                />
             )}


           <Name numberOfLines={1}>
               {data?.author}
           </Name>
       </Header>

       <ContentView>
           <Content>{data?.content}</Content>
       </ContentView>

       <Actions>
           <LikeButton>
               <Like>
                   {likesPost === 0 ? '' : likesPost}
               </Like>
               <MaterialCommunity 
                    name={likesPost === 0 ? 'heart-plus-outline' : 'cards-heart'}
                    size={20}
                    color="#e52246"
               />
           </LikeButton>

           <TimePost>
               {formatTimePost()}
           </TimePost>
       </Actions>
   </Container>
  );
}