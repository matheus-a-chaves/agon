import {Box, IButtonProps, Text, Image, Spacer} from 'native-base';

type Props = IButtonProps & {
  title: string;
  image: {
    url: string;
    size: number;
  };
  descricao: string;
};

export function NovoCampeonato({title, image, descricao, height}: Props) {
  return (
    <Box
      w={'full'}
      bgColor={'#004AAD'}
      h={height}
      borderRadius={10}
      alignItems={'center'}>
      <Text
        color={'#FFFFFF'}
        fontSize={24}
        fontWeight={500}
        marginTop={2}
        fontFamily={'RobotoCondensed500'}>
        {title}
      </Text>
      <Spacer />
      <Image
        w={'full'}
        h={image.size}
        source={{uri: image.url}}
        alt="Descrição da imagem"
      />
      <Text
        color={'#FFFFFF'}
        fontSize={24}
        fontFamily={'RobotoCondensed500'}
        textAlign={'center'}
        marginTop={2}
        w={'4/5'}
        bgColor={'#000'}>
        {descricao}
      </Text>
      <Spacer />
    </Box>
  );
}

export default NovoCampeonato;
