import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { Container, Name } from './styles'

export default function SearchItem({ data }) {
    const navigation = useNavigation()

    return (
        <Container onPress={() => navigation.navigate('PostUser', { title: data.name, userId: data.id })}>
            <Name>{data.name}</Name>
        </Container>
    )
}