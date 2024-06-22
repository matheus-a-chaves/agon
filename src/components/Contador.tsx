import { Text, Box, Button, HStack, FormControl } from 'native-base';
import { Image } from 'react-native';

type Props = {
  errorMessage?: string | null;
  quantidade: number;
  onChangeContador?: (quantidade: number) => void; // Função para atualizar a quantidade
  min: number;
  max: number;
  somar: number;
};

export function Contador({
  errorMessage = null,
  quantidade,
  onChangeContador,
  min,
  max,
  somar,
  ...rest
}: Props) {
  const invalid = !!errorMessage;

  function add() {
    if (quantidade >= max) return onChangeContador && onChangeContador(max);
    onChangeContador && onChangeContador(quantidade + somar);
  }

  function subtract() {
    if (quantidade <= min) return onChangeContador && onChangeContador(min);
    onChangeContador && onChangeContador(quantidade - somar);
  }
  function funcQuantidade(): string {
    if (quantidade < 10) return '0' + quantidade;
    return quantidade.toString();
  }

  return (
    <FormControl isInvalid={invalid} marginBottom={2}>
      <Text
        fontFamily={'RobotoCondensed400'}
        fontSize={16}
        textAlign={'left'}
        color={'#A3A3A3'}
        paddingRight={12}
        paddingBottom={2}>
        Quantidade de times
      </Text>
      <HStack display="flex" w={'full'} justifyContent={'flex-start'} space={2}>
        <Button bgColor={'#fff'} w={50} h={50} onPress={subtract}>
          <Image source={require('../assets/icons/subtract.png')} />
        </Button>
        <Box
          display="flex"
          bgColor={'#fff'}
          w={70}
          alignItems={'center'}
          borderRadius={5}
          justifyContent={'center'}>
          <Text
            fontSize={24}
            fontFamily={'RobotoCondensed500'}
            color={'#A3A3A3'}>
            {funcQuantidade()}
          </Text>
        </Box>
        <Button bgColor={'#fff'} w={50} h={50} onPress={add}>
          <Image source={require('../assets/icons/plus.png')} />
        </Button>
      </HStack>
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
}
