import {
  Select as NativeBaseSelect,
  ISelectProps,
  FormControl,
} from 'native-base';

type Props = ISelectProps & {
  errorMessage?: string | null;
  lista: any[];
};

export function Select({errorMessage = null, lista, ...rest}: Props) {
  const invalid = !!errorMessage;
  return (
    <FormControl isInvalid={invalid}>
      <NativeBaseSelect
        bgColor={'#fff'}
        h={50}
        fontFamily={'RobotoCondensed400'}
        color={'#A3A3A3'}
        fontSize={18}
        borderRadius={5}
        shadow={2}
        {...rest}>
        {lista.map(item => (
          <NativeBaseSelect.Item
            key={item.id}
            label={item.nome}
            value={item.id}
          />
        ))}
      </NativeBaseSelect>
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
}
