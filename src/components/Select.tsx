import {
  Select as NativeBaseSelect,
  ISelectProps,
  FormControl,
} from 'native-base';
import {Modalidade} from '../interfaces/modalidadesInterface';

type Props = ISelectProps & {
  errorMessage?: string | null;
  modalidades: Modalidade[];
};

export function Select({errorMessage = null, modalidades, ...rest}: Props) {
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
        {modalidades.map(item => (
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
