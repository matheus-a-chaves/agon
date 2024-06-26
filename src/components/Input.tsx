import { Input as NativeBaseInput, IInputProps, FormControl } from 'native-base';

type Props = IInputProps & {
  errorMessage?: string | null;
  widthForm?: string;
};

export function Input({ errorMessage = null, isInvalid, ...rest }: Props) {
  const invalid = !!errorMessage || isInvalid;
  const widthForm = rest.widthForm || 'full';
  return (
    <FormControl isInvalid={invalid} width={widthForm}>
      <NativeBaseInput
        bgColor={'#fff'}
        h={50}
        fontFamily={'RobotoCondensed400'}
        color={'#A3A3A3'}
        fontSize={18}
        borderRadius={5}
        shadow={2}
        isInvalid={invalid}
        _focus={{
          borderColor: '#004AAD',
        }}
        _invalid={{
          borderColor: '#f82b2b',
        }}
        {...rest}
      />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
}
