import React from 'react';
import { Box, Button, HStack, Modal, Pressable, Text, VStack } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Input } from '../../components/Input';
import { DatePicker } from '../../components/DatePicker';

export function EditarAmistosoPopUp({ navigation }: any) {
    const [modalVisible, setModalVisible] = React.useState(false);
    return (
        <Box>
            <Modal
                isOpen={modalVisible} onClose={() => setModalVisible(false)}
                justifyContent="center"
            >
                <Modal.Content width={"100%"} height={"50%"}>
                    <LinearGradient
                        colors={['#004AAD', '#7ED957']}
                        style={{ width: '100%', height: '100%' }}>
                        <Modal.Body h={'100%'}>
                            <VStack>
                                <HStack
                                    alignItems={'center'}
                                    justifyContent={'flex-end'}
                                    px={'10px'}
                                >
                                    <Pressable
                                        onPress={() => {
                                            setModalVisible(!modalVisible);
                                        }} >
                                        <MaterialIcons name="close" size={28} color="#FFF" />
                                    </Pressable>
                                </HStack>
                                <HStack alignItems="center" justifyContent={'center'} >
                                    <VStack
                                        space={2}
                                        alignItems="center"
                                        justifyContent={'center'}
                                        w='95%'
                                    >
                                        <Text color={'#FFF'}
                                            fontWeight={500} fontSize={'20px'}
                                        >Atualizar amistoso</Text>
                                        <Box
                                            flexDirection={'row'}
                                            w='full'
                                        >
                                            <VStack w={'60%'}>
                                                <Text color={'#FFF'}
                                                    fontWeight={500}
                                                    fontSize={'20px'}
                                                >Data</Text>
                                                <Box pr={'4px'}>
                                                    <DatePicker
                                                        size={'100%'}
                                                        w='full' />
                                                </Box>
                                            </VStack>
                                            <VStack w={'40%'}>
                                                <Text color={'#FFF'}
                                                    fontWeight={500} fontSize={'20px'}
                                                >Horario</Text>
                                                <Input bg={'#404'} w='full' />
                                            </VStack>

                                        </Box>
                                        <VStack w='100%'>
                                            <Text color={'#FFF'}
                                                fontWeight={500} fontSize={'20px'}
                                            >Endereço</Text>
                                            <Input />
                                        </VStack>
                                    </VStack>
                                </HStack>
                                <HStack>
                                    <Button
                                        flex="1"
                                        bgColor={'#004AAD'}
                                        margin={'10px'}
                                        onPress={() => {
                                            setModalVisible(false);
                                        }}>
                                        <Text color={'#FFF'}
                                            fontWeight={500}
                                            fontSize={'16px'}
                                            textTransform={'uppercase'}>Voltar</Text>
                                    </Button>
                                    <Button flex="1"
                                        bgColor={'#C71C1C'}
                                        margin={'10px'}
                                        onPress={() => {
                                            setModalVisible(false);

                                        }}>
                                        <Text color={'#FFF'}
                                            fontWeight={500}
                                            fontSize={'16px'}
                                            textTransform={'uppercase'}>
                                            Atualizar
                                        </Text>
                                    </Button>
                                </HStack>
                            </VStack>


                        </Modal.Body>
                    </LinearGradient>
                </Modal.Content>

            </Modal>
            <VStack space={8} alignItems="center">
                <Pressable
                    onPress={() => {
                        setModalVisible(!modalVisible);
                    }} >
                    <MaterialIcons name="mode-edit" size={18} color="#FFF" />
                </Pressable>
            </VStack>
        </Box>
    )
}