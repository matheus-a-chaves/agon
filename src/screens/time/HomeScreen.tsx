import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  TextInput,
} from 'react-native';
import { Container, InputView } from '../../styles/HomeScreenCss';
import { Box, FlatList, Pressable, Text } from 'native-base';
import { ViewCampeonato } from '../../components/ViewCampeonato';
import { upload } from '../Utils';
import { TeamService } from '../../services/time.service';

export function HomeScreen() {
  const navigation = useNavigation();
  const [times, setTimes] = useState<any[]>([]);

  useEffect(() => {

    async function fetchTeams() {
      const idAtletica = '1';
      const team = await TeamService.buscarTimes(idAtletica);
      setTimes(team);
    };
    fetchTeams();

  }, []);


  const handleTime = (id: string) => {
    console.log(id);
  };


  return (
    <Container>
      <InputView>
        <TextInput placeholder="Pesquisar time..." />
        {/* <Image source={require('../../../assets/icons/search.png')} /> */}
      </InputView>
      <Box h="88%">
        <Text py={'1px'}>Times</Text>
        <FlatList
          data={times}
          renderItem={({ item }) => (
            <Pressable
              marginBottom={'10px'}
              onPress={() => handleTime(item.id)}>
              <ViewCampeonato
                nome={item.nome}
                imagem={upload}
                dataCriacao={item.dataInicio}
              />
            </Pressable>
          )}
          keyExtractor={item => item.id}
        />
      </Box>
    </Container>
  );
}
