import { Button as ButtonNativeBase, HStack, IButtonProps, Image, Text } from 'native-base';


type Props = IButtonProps & {
    nome: string;
};

export function UploadComponent({ nome, onPress, ...rest }: Props) {
    const icon = require('../assets/icons/add.png');
    return (
        <HStack
            bgColor={'#FFF'}
            h={50}
            borderRadius={5}
            justifyContent={'space-between'}
            alignItems={'center'}
            width={'100%'}
            pl={'12px'}
            pr={'3px'}
            shadow={2}
        >
            <Text
                color={'#A3A3A3'}
                fontWeight={'500'}
                fontSize={18}
                fontFamily={'RobotoCondensed400'}
            >{nome}</Text>
            <ButtonNativeBase
                onPress={onPress}
                bg={'#004AAD'}
                w={'44px'}
                h={'44px'}
                borderRadius={5}

            >
                <Image source={icon} alt={'icone de adicionar'} />
            </ButtonNativeBase>
        </HStack>
    );
}

export default UploadComponent;
