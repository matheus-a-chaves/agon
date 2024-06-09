import DateTimePicker from '@react-native-community/datetimepicker';
import { Box, Pressable, FormControl, Text, IBoxProps } from 'native-base';
import { useState } from 'react';
import styled from 'styled-components/native';

export const DatePicker = (props: any) => {
  const icon = require('../assets/icons/calendar-input.png');
  const [day, setDay] = useState(adicionaZero(new Date().getDate())); //Para obter o dia
  const [month, setMonth] = useState(adicionaZero(new Date().getMonth() + 1)); //Para obter o mês
  const [year, setYear] = useState(new Date().getFullYear()); //Para obter o ano

  const {
    onDateChange,
    errorMessage,
    isInvalid,
    title,
    defaultValue,
    disable,
    size,
    placeholder
  } =
    props;

  const invalid = !!errorMessage || isInvalid;

  const [show, setShow] = useState(false);
  const [data, setData] = useState(new Date());
  const [textoData, setTextoData] = useState(placeholder);
  const onChange = (event: any, selectedDate: any) => {
    setData(new Date(selectedDate));
    setShow(false);
    onDateChange(selectedDate);

    let selectDatedate = new Date(selectedDate);
    setDay(adicionaZero(selectDatedate.getDate()));
    setMonth(adicionaZero(selectDatedate.getMonth() + 1));
    setYear(selectDatedate.getFullYear());
    setTextoData(day + '/' + month + '/' + year);
  };

  const renderDatePicker = () => {
    return (
      <DateTimePicker
        display="calendar"
        value={new Date()}
        mode="date"
        minimumDate={defaultValue}
        onChange={onChange}
      />
    );
  };

  return (
    <FormControl isInvalid={invalid} w={size} isDisabled={disable}>
      <Box>
        {title ?
          <Text color={'#A3A3A3'} fontFamily={'RobotoCondensed400'} pl={'2px'}>
            {title}
          </Text> : null}
        <Box
          bgColor={'#FFFFFF'}
          h={'50px'}
          w={'full'}
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          pl={'20px'}
          pr={'5px'}
          borderRadius={'5px'}
          shadow={2}>
          <Box shadow={2}>
            <Text
              color={'#A3A3A3'}
              fontFamily={'RobotoCondensed400'}
              fontSize={'16px'}>
              {textoData}
            </Text>
          </Box>
          <Pressable
            h={'40px'}
            w={'40px'}
            onPress={() => setShow(true)}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}>
            <Icon source={icon} />
          </Pressable>
          {show && renderDatePicker()}
        </Box>
      </Box>
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
};

function adicionaZero(numero: number): string {
  if (numero < 10) {
    return '0' + numero;
  }
  return numero.toString();
}

export const Icon = styled.Image`
  display: flex;
  align-items: center;
  width: 35px;
  height: 35px;
`;
