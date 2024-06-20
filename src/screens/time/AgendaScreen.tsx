import React, { useState, useEffect } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { NativeBaseProvider, Box, VStack, Text, HStack, Center, Spinner, Avatar } from 'native-base';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

// Configuração de idioma para o calendário
LocaleConfig.locales['pt-br'] = {
    monthNames: [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    monthNamesShort: [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ],
    dayNames: [
        'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'
    ],
    dayNamesShort: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';

interface Team {
    name: string;
    logo: string;
}

interface Game {
    id: number;
    homeTeam: Team;
    awayTeam: Team;
}

interface GamesData {
    [date: string]: Game[];
}

// Mock de dados
const mockGames: GamesData = {
    "2024-05-30": [
        {
            id: 1,
            homeTeam: { name: "Gremio", logo: "https://i.pinimg.com/originals/7a/1e/15/7a1e15de2e0df008f2de954199b29f0d.png" },
            awayTeam: { name: "Athletico-PR", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/CA_Paranaense.svg/2048px-CA_Paranaense.svg.png" }
        },
        {
            id: 2,
            homeTeam: { name: "Athletico-PR", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/CA_Paranaense.svg/2048px-CA_Paranaense.svg.png" },
            awayTeam: { name: "São Paulo", logo: "https://yt3.googleusercontent.com/C8rCyrTuhCFBj7U0Od4-4ISbgp5i7OMfAudqi2h7vgcFOy70J6pSao6qG0YO6p7LpdTqlqbceQ=s900-c-k-c0x00ffffff-no-rj" }
        }
    ]
    // Adicione mais datas e jogos conforme necessário
};

const AgendaScreen: React.FC = () => {
    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (selectedDate) {
            fetchGames(selectedDate);
        }
    }, [selectedDate]);

    const fetchGames = (date: string) => {
        setLoading(true);
        setTimeout(() => { // Simula um atraso na resposta da API
            if (date === '2024-05-30') {
                console.log(`click in ${date}`);
                console.log(`click in ${date}`);
            }

            setGames(mockGames[date] || []);
            setLoading(false);
        }, 1000); // 1 segundo de atraso
    };

    const renderItem: ListRenderItem<Game> = ({ item }) => (
        <Box
            bg="gray.100"
            mt={2}
            rounded="lg"
            shadow={2}
            borderColor="coolGray.200"
            borderWidth={'1px'}
            height={'80px'}
            justifyContent={'center'}
            alignContent={'ceter'}
        >
            <HStack alignItems="center" justifyContent="center">
                <VStack alignItems="center" flex={1}>
                    <Avatar source={{ uri: item.homeTeam.logo }} size={'45px'} />
                    <Text>{item.homeTeam.name}</Text>
                </VStack>
                <Text fontSize="lg" fontWeight="bold">X</Text>
                <VStack alignItems="center" flex={1}  >
                    <Avatar source={{ uri: item.awayTeam.logo }} size={'45px'} />
                    <Text>{item.awayTeam.name}</Text>
                </VStack>
            </HStack>
        </Box>
    );

    return (
        <NativeBaseProvider>
            <Box flex={1} background={"#fff"}>
                <HStack justifyContent={'space-between'} padding={'5px'} bgColor={'#004AAD'} mb={1}>
                    <Ionicons
                        name="arrow-back"
                        size={25}
                        color={'#fff'}
                        onPress={() => navigation.goBack()}
                    />
                    <Text color={'#fff'} fontWeight={'medium'} fontSize={16}>
                        Agenda
                    </Text>
                    <Box size={25} />
                </HStack>
                <Calendar
                    onDayPress={(day: any) => setSelectedDate(day.dateString)}
                    markedDates={{ [selectedDate]: { selected: true } }}
                    monthFormat={'MMMM yyyy'}
                    locale={'pt-br'}
                    theme={{
                        calendarBackground: '#004AAD', // Cor de fundo do calendário
                        textSectionTitleColor: '#ffffff', // Cor do texto dos títulos das seções
                        selectedDayBackgroundColor: '#5389D2', // Cor de fundo do dia selecionado
                        selectedDayTextColor: '#ffffff', // Cor do texto do dia selecionado
                        todayTextColor: '#3AF3FF', // Cor do texto do dia atual
                        dayTextColor: '#ffffff', // Cor do texto dos dias
                        textDisabledColor: '#A3A3A3', // Cor do texto dos dias desabilitados
                        dotColor: '#00adf5',
                        selectedDotColor: '#ffffff',
                        arrowColor: '#ffffff', // Cor das setas de navegação
                        disabledArrowColor: '#d9e1e8',
                        monthTextColor: '#ffffff', // Cor do texto do mês
                        indicatorColor: 'blue',
                        textDayFontWeight: '300',
                        textMonthFontWeight: 'bold',
                        textDayHeaderFontWeight: '300',
                        textDayFontSize: 16,
                        textMonthFontSize: 16,
                        textDayHeaderFontSize: 16
                    }}
                />
                <Box
                    background={'white'}
                    height={'60%'}
                    px={4}
                    borderTopRadius={10}
                >
                    {loading ? (
                        <Center flex={1}>
                            <Spinner size="lg" />
                        </Center>
                    ) : (
                        <FlatList
                            data={games}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderItem}
                            ListEmptyComponent={<Text textAlign="center" mt={4}>Nenhum jogo nesta data.</Text>}
                        />
                    )}
                </Box>
            </Box>
        </NativeBaseProvider>
    );
};

export default AgendaScreen;
