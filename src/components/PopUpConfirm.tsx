import React from 'react';
import { Box, Button, HStack, Modal, Pressable, Text, VStack } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

interface PopUpConfirm {
    title: string;
    botaoPrimaryAction?: any;
    botaoPrimaryText: string;
    botaoSecondaryAction?: any;
    botaoSecondaryText: string;
    icon: any
    navigation: any;
};

export function PopUpConfirm({ title, botaoPrimaryAction, botaoPrimaryText,
    botaoSecondaryAction, botaoSecondaryText, icon, navigation }: PopUpConfirm) {
    const [modalVisible, setModalVisible] = React.useState(false);
    return (
        <Box>
            <Modal
                isOpen={modalVisible} onClose={() => setModalVisible(false)}
                justifyContent="center"
            >
                <Modal.Content width={"90%"} height={"210px"}>
                    <LinearGradient
                        colors={['#004AAD', '#7ED957']}
                        style={{ width: '100%', height: '100%' }}>
                        <Modal.Body h={'300px'}>
                            <VStack space={5} alignItems="center" justifyContent={'center'} h={'70%'}>
                                <Text color={'#FFF'} fontWeight={500} fontSize={'18px'}
                                    textTransform={'uppercase'}
                                >{title}</Text>
                                <HStack>
                                    <Button
                                        flex="1"
                                        bgColor={'#004AAD'}
                                        margin={'10px'}
                                        onPress={() => {
                                            setModalVisible(false);
                                            botaoPrimaryAction()
                                        }}>
                                        <Text color={'#FFF'} fontWeight={500} fontSize={'16px'} textTransform={'uppercase'}>{botaoPrimaryText}</Text>
                                    </Button>
                                    <Button flex="1"
                                        bgColor={'#C71C1C'}
                                        margin={'10px'}
                                        onPress={() => {
                                            setModalVisible(false);
                                            botaoSecondaryAction()
                                        }}>
                                        <Text color={'#FFF'} fontWeight={500} fontSize={'16px'} textTransform={'uppercase'}>
                                            {botaoSecondaryText}
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
                    {icon}
                </Pressable>
            </VStack>
        </Box >
    )
}