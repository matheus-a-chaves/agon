import React, { useState, useEffect } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { NativeBaseProvider, Box, VStack, Text, HStack, Center, Spinner, Avatar } from 'native-base';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { PartidaService } from '../../services/partidas.service';
import { Partida } from '../../interfaces/partidaModel';
import { imageConverter } from '../Utils';

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

const AgendaScreen: React.FC = () => {
    const imagem = require('../../assets/img/amistoso/brasao.png');
    const route = useRoute();
    const { equipe } = route.params as any;
    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [partidas, setPartidas] = useState<Partida[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (selectedDate) {
            fetchPartidas(selectedDate);
        }
    }, [selectedDate]);

    const fetchPartidas = async (date: string) => {
        setLoading(true);
        try {
            const partidas: Partida[] = await PartidaService.buscarAgenda(equipe.idEquipe, date);
            setPartidas(partidas || []);
        } catch (error) {
            console.error('Erro ao buscar as partidas:', error);
        }
        setLoading(false);
    };

    const renderItem: ListRenderItem<Partida> = ({ item }) => (
        <Box
            mx={4}
            my={4}
            borderColor="coolGray.200"
            borderWidth={2}
            height={'80px'}
            justifyContent="center"
            alignItems="center"
            borderRadius={"10px"}
        >
            <HStack alignItems="center" justifyContent="center">
                <VStack alignItems="center" flex={1}>
                    <Avatar source={imageConverter(item.equipeCasa.imagem, imagem)} size="45px" />
                    <Text>{item.equipeCasa.nome}</Text>
                </VStack>
                <Text fontSize="lg" fontWeight="bold">X</Text>
                <VStack alignItems="center" flex={1}>
                    <Avatar source={imageConverter(item.equipeVisitante.imagem, imagem)} size="45px" />
                    <Text>{item.equipeVisitante.nome}</Text>
                </VStack>
            </HStack>
        </Box>
    );

    return (
        <NativeBaseProvider>
            <Box flex={1} bg="#fff">
                <HStack justifyContent="space-between" p={2} bgColor="#004AAD" mb={1}>
                    <Ionicons
                        name="arrow-back"
                        size={25}
                        color="#fff"
                        onPress={() => navigation.goBack()}
                    />
                    <Text color="#fff" fontWeight="medium" fontSize={16}>
                        Agenda
                    </Text>
                    <Box size={25} />
                </HStack>
                <Calendar
                    onDayPress={(day: any) => setSelectedDate(day.dateString)}
                    markedDates={{ [selectedDate]: { selected: true } }}
                    monthFormat="MMMM yyyy"
                    locale="pt-br"
                    theme={{
                        calendarBackground: '#004AAD',
                        textSectionTitleColor: '#ffffff',
                        selectedDayBackgroundColor: '#5389D2',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#3AF3FF',
                        dayTextColor: '#ffffff',
                        textDisabledColor: '#A3A3A3',
                        dotColor: '#00adf5',
                        selectedDotColor: '#ffffff',
                        arrowColor: '#ffffff',
                        disabledArrowColor: '#d9e1e8',
                        monthTextColor: '#ffffff',
                        indicatorColor: 'blue',
                        textDayFontWeight: '300',
                        textMonthFontWeight: 'bold',
                        textDayHeaderFontWeight: '300',
                        textDayFontSize: 16,
                        textMonthFontSize: 16,
                        textDayHeaderFontSize: 16
                    }}
                />
                <Box bg="white" height="60%" px={4} borderTopRadius={10}>
                    {loading ? (
                        <Center flex={1}>
                            <Spinner size="lg" />
                        </Center>
                    ) : (
                        <FlatList
                            data={partidas}
                            keyExtractor={(item) => item.idAmistoso.toString()}
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
