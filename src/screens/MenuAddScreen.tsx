import React from 'react';
import { Box, Button, Modal, Pressable, Text, VStack } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';

export function MenuAddScreen({ navigation }: any) {
    const [modalVisible, setModalVisible] = React.useState(false);
    return (
        <Box>
            <Modal
                isOpen={modalVisible} onClose={() => setModalVisible(false)}
                justifyContent="flex-end"
                bottom="16"
            >
                <Modal.Content width={"100%"} height={"50%"}>
                    <LinearGradient
                        colors={['#004AAD', '#7ED957']}
                        style={{ width: '100%', height: '100%' }}>
                        <Modal.Body h={'300px'}>
                            <Button flex="1"
                                bgColor={'#FFF'}
                                margin={'10px'}
                                onPress={() => {
                                    setModalVisible(false);
                                    navigation.navigate('Menu', { screen: 'TimeStack' });
                                }}>
                                <Text color={'#333'} fontWeight={500} fontSize={'15px'}>Novo time</Text>
                            </Button>
                            <Button
                                flex="1"
                                bgColor={'#FFF'}
                                margin={'10px'}
                                onPress={() => {
                                    setModalVisible(false);
                                    navigation.navigate('Menu', { screen: 'CampeonatoStack' })
                                }}>
                                <Text color={'#333'} fontWeight={500} fontSize={'15px'}> Novo Amistoso</Text>
                            </Button>
                            <Button
                                flex="1"
                                bgColor={'#FFF'}
                                margin={'10px'}
                                onPress={() => {
                                    setModalVisible(false);
                                    navigation.navigate('Menu', { screen: 'CampeonatoStack' })
                                }}>
                                <Text color={'#333'} fontWeight={500} fontSize={'15px'}>Novo Campeonato</Text>
                            </Button>
                        </Modal.Body>
                    </LinearGradient>
                </Modal.Content>

            </Modal>
            <VStack space={8} alignItems="center">
                <Pressable
                    onPress={() => {
                        setModalVisible(!modalVisible);
                    }} >
                    <Entypo name="circle-with-plus" size={36} color={'#FFF'} />
                </Pressable>
            </VStack>
        </Box>
    )
}