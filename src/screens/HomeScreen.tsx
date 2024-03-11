import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Button,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  Container,
  InputView,
  ItemView,
  TextStyled,
} from '../styles/HomeScreenCss';

import {TeamData, useTeam} from '../contexts/Team';

export function HomeScreen() {
  const navigation = useNavigation();
  const {findAllTeam, teamData} = useTeam();

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  useEffect(() => {
    if (findAllTeam) {
      // Verifica se findAllTeam está definido antes de chamar
      findAllTeam('idAtletica');
    }
  }, [findAllTeam]);

  const Item: React.FC<TeamData> = ({id, name, date}) => (
    <ItemView>
      <View>
        <TextStyled>Matheus</TextStyled>
        <TextStyled>Data de criação:{id}</TextStyled>
      </View>
      {/* <Image source={require('../../../assets/icons/next.png')} /> */}
    </ItemView>
  );

  return (
    <Container>
      <InputView>
        <TextInput placeholder="Pesquisar time..." />
        {/* <Image source={require('../../../assets/icons/search.png')} /> */}
      </InputView>
      <View>
        <Text>Times</Text>
        <SafeAreaView
          style={{
            width: 330,
          }}>
          <FlatList
            data={teamData}
            renderItem={({item}) => (
              <Item id={item.id} name={item.name} date={item.date} />
            )}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      </View>
    </Container>
  );
}
