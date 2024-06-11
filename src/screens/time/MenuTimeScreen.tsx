import React from 'react';
import { Box, Button, Modal, Pressable, Text, VStack } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

export function MenuTimeScreen({ navigation }: any) {
    const [modalVisible, setModalVisible] = React.useState(false);
    return (
        <Box>
            <Modal
                isOpen={modalVisible} onClose={() => setModalVisible(false)}
                justifyContent="center"
                bottom="16"
            >
                <Modal.Content width={"100%"} height={"35%"}>
                    <LinearGradient
                        colors={['#004AAD', '#7ED957']}
                        style={{ width: '100%', height: '100%' }}>
                        <Modal.Body h={'270px'}>
                            <Button flex="1"
                                bgColor={'#FFF'}
                                margin={'10px'}
                                onPress={() => {
                                    setModalVisible(false);
                                    navigation.navigate('AgendaTime');
                                }}>
                                <Text color={'#333'} fontWeight={500} fontSize={'15px'}>Visualizar Agenda</Text>
                            </Button>
                            <Button
                                flex="1"
                                bgColor={'#FFF'}
                                margin={'10px'}
                                onPress={() => {
                                    setModalVisible(false);
                                    navigation.navigate('AmistosoTime');
                                }}>
                                <Text color={'#333'} fontWeight={500} fontSize={'15px'}>Visualizar Amistosos</Text>
                            </Button>
                            <Button
                                flex="1"
                                bgColor={'#FFF'}
                                margin={'10px'}
                                onPress={() => {
                                    setModalVisible(false);
                                    navigation.navigate('CampeonatosStakTime', { screen: 'Campeonatos' })
                                }}>
                                <Text color={'#333'} fontWeight={500} fontSize={'15px'}>Visualizar Campeonatos</Text>
                            </Button>
                        </Modal.Body>
                    </LinearGradient>
                </Modal.Content>

            </Modal>
            <VStack space={8} alignItems="center" >
                <Pressable
                    onPress={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <Ionicons name="menu" size={30} color="#fff" />
                </Pressable>
            </VStack>
        </Box>
    )
}