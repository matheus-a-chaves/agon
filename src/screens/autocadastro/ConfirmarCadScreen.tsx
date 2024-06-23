import { Box, HStack, Image, View, VStack, Text } from 'native-base';
import { SafeAreaView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';

export const ConfirmarCadScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ height: '100%' }}>
            <Box w="100%" h={'100%'} bg={'#fff'} marginBottom={'20px'}>
                <VStack justifyContent={'center'} alignItems={'center'} py={5} bg={'#fff'}
                    px={5} space={3}>
                    <View>
                        <Image
                            style={{ width: 240, height: 120 }}
                            source={require('../../assets/logo_login.png')}
                            alt={'Logo'}
                        />
                    </View>
                    <VStack w={'100%'} h={'75%'} justifyContent={'space-between'}>
                        <VStack justifyContent={'center'} alignItems={'center'} py={20} bg={'#fff'}
                            space={5} w={"100%"}>
                            <Image
                                w={'96px'}
                                h={'96px'}
                                source={require('../../assets/ok.png')}
                                alt={'Logo'}
                            />
                            <Text
                                fontSize={18}
                                fontWeight={'bold'}
                                color={'#A3A3A3'}
                            >Cadastro realizado com sucesso!</Text>
                        </VStack>
                        <Button title={'Voltar para login'} size={'full'} onPress={() => {
                            navigation.navigate('SignIn' as never);
                        }} />
                    </VStack>
                </VStack>
            </Box>
        </SafeAreaView>
    );
}
