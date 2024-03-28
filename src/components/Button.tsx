import {Button as ButtonNativeBase, IButtonProps, Text} from 'native-base';

type Props = IButtonProps & {
  title: string;
};

export function Button({title, ...rest}: Props) {
  return (
    <ButtonNativeBase bgColor={'#004AAD'} h={55} borderRadius={5} {...rest}>
      <Text color={'#FFFFFF'} fontSize={'lg'} fontWeight={500}>
        {title}
      </Text>
    </ButtonNativeBase>
  );
}

export default Button;
