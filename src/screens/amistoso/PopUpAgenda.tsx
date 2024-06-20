import React, { useEffect, useState } from 'react';
import { Box, HStack, Modal, Pressable, Text, VStack, Avatar, Center, Spinner, FlatList, Image } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Equipe } from '../../interfaces/equipeInterface';
import { ListRenderItem } from 'react-native';
import { TeamService } from '../../services/time.service';
import { dateFormat, formatDate, imageConverter } from '../Utils';
import { set } from 'react-hook-form';
import { ButtonAdd, Icon } from '../../styles/campeonato/CadastroCss';

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

interface AgendaScreenProps {
    onItemSelect: (id: number, data: any) => void;
    setModalVisible: (value: boolean) => void;
    setNomeTimeData: (value: string) => void;
    modalidade: string;
}

const AgendaScreen: React.FC<AgendaScreenProps> = ({ onItemSelect, setModalVisible, setNomeTimeData, modalidade }: any) => {
    const imagem = require('../../assets/img/amistoso/brasao.png');
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [times, setTimes] = useState<Equipe[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (selectedDate) {
            fetchGames(selectedDate);
        }
    }, [selectedDate]);

    const fetchGames = async (date: string) => {
        setLoading(true);
        const timesDisponiveis = await TeamService.buscarTimes(1);
        setTimes(timesDisponiveis)
        setLoading(false);
    };

    const renderItem: ListRenderItem<Equipe> = ({ item }) => (
        <Box
            m={2}
            height={'80px'}
            justifyContent={'center'}
            alignContent={'center'}
            borderRadius={'10px'}
            borderColor={'#A3A3A3'}
            borderWidth={1}
        >
            <Pressable onPress={() => {
                onItemSelect(item.id, selectedDate)
                setModalVisible(false)
                setNomeTimeData("Time - " + item.nome + ", dia: " + dateFormat(selectedDate))
            }}>
                <HStack alignItems="center" justifyContent="flex-start" >

                    <Box borderWidth={1} mx={5} borderColor={'#004AAD'} w={'50px'} h={'50px'} borderRadius={'10px'} >
                        <Image w={'100%'} h={'100%'} source={imageConverter(item.imagem, imagem)} alt={"imagem time"} />
                    </Box>
                    <VStack flex={1}>
                        <Text>{item.nome}</Text>
                        <Text>{item.nome}</Text>
                    </VStack>
                </HStack>
            </Pressable>
        </Box>
    );

    return (
        <Box flex={1} w={'100%'} backgroundColor={"#004AAD"} h={'100%'}>
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
                height={'50%'}
                w={'100%'}
                borderTopRadius={'5px'}
            >
                {loading ? (
                    <Center flex={1}>
                        <Spinner size="lg" />
                    </Center>
                ) : (
                    <FlatList
                        h={'100%'}
                        data={times}
                        disableVirtualization={false}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                        ListEmptyComponent={
                            <VStack>
                                <Text textAlign="center" mt={4}>Nenhum time disponivel nesta data.</Text>
                            </VStack>
                        }
                    />
                )}
            </Box>

        </Box>
    );
};

export function PopUpAgenda({ onItemSelect, modalidade }: any) {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [nomeTimeData, setNomeTimeData] = useState<string>('Selecione um time disponivel');
    const icon = require('../../assets/icons/add.png');
    return (
        <Box>
            <Modal
                isOpen={modalVisible}
                onClose={() => setModalVisible(false)}
                justifyContent="center">
                <Modal.Content width={"100%"} height={"100%"} m={0}>
                    <LinearGradient
                        colors={['#004AAD', '#7ED957']}
                        style={{ width: '100%', height: '100%', padding: 0 }}>

                        <Box h={'100%'} w={'100%'}>
                            <AgendaScreen onItemSelect={onItemSelect} setModalVisible={setModalVisible} setNomeTimeData={setNomeTimeData} modalidade={modalidade} />
                        </Box>

                    </LinearGradient>
                </Modal.Content>
            </Modal>
            <VStack space={2} alignItems="center">
                <Box
                    flexDirection={'row'}
                    alignItems={'center'}
                    w={'100%'}
                    h={50}
                    bgColor={'#fff'}
                    borderRadius={5}
                    justifyContent={'space-between'}
                    shadow={2}
                    px={'4px'}
                    pl={3}
                >
                    <Text color={'#A3A3A3'} fontSize={18}>{nomeTimeData}</Text>
                    <ButtonAdd onPress={() => setModalVisible(!modalVisible)}>
                        <Icon source={icon} />
                    </ButtonAdd>
                </Box>
            </VStack>
        </Box>
    )
}
