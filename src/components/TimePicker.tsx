import { SafeAreaView } from "react-native";
import { Text, Pressable, Box } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const TimePicker = ({ changeValue }: any) => {
    const [time, setTime] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event: any, selectedTime: any) => {
        const currentTime = selectedTime || time;
        setShow(false);
        setTime(currentTime);
        changeValue(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };

    const showTimepicker = () => {
        setShow(true);
    };

    return (
        <SafeAreaView>
            <Box flexDirection={'row'}
                shadow={2}
                bg={'#FFF'}
                borderRadius={5}
                h={'50px'}
                w={'150px'}
                alignItems={'center'}
                justifyContent={'space-between'}
                pl={2}
                pr={1}
                borderColor={'#EEE'}
                borderWidth={1}
            >
                <Text color={'#A3A3A3'} fontSize={18}>
                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={time}
                        mode={'time'}
                        is24Hour={true}
                        onChange={onChange}
                    />
                )}
                <Pressable
                    onPress={showTimepicker}
                    w={'40px'}
                    h={'40px'}
                    bg={'#004AAD'}
                    borderRadius={'5px'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <MaterialCommunityIcons name={"clock-plus-outline"} size={26} color={'white'} />
                </Pressable>
            </Box>
        </SafeAreaView>
    );
};
