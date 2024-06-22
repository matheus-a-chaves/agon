import { yupResolver } from "@hookform/resolvers/yup";
import { Box, HStack, Pressable, VStack } from "native-base";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "../../../components/DatePicker";
import { TimePicker } from "../../../components/TimePicker";
import * as yup from 'yup';
import Button from "../../../components/Button";

type FormData = {
    equpeId: string;
    modalidade: string;
    data: string;
    hora: string;
};

const CadastroSchema = yup.object().shape({
    equpeId: yup
        .string()
        .required('Escolher um time é obrigatório'),
    modalidade: yup.string().required('Modalidade é obrigatória'),
    data: yup.string().required('Modalidade é obrigatória'),
    hora: yup.string().required('Modalidade é obrigatória'),
});

export const InserirDataHora = ({ expirar }: any) => {

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<FormData>({ resolver: yupResolver(CadastroSchema) });

    return (
        <Box my={4}>
            <VStack space={4} alignItems="center" w={'100%'}>
                <HStack space={5}>
                    <Controller
                        control={control}
                        name="data"
                        render={({ field: { onChange } }) => (
                            <DatePicker
                                placeholder="Dia do jogo"
                                size={'45%'}
                                onDateChange={(value: any) => {
                                    onChange(value);
                                }}
                                errorMessage={errors.data?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="hora"
                        render={({ field: { onChange } }) => (
                            <Pressable>
                                <TimePicker changeValue={onChange} size={'130px'} />
                            </Pressable>
                        )}
                    />

                </HStack>
                <Button h={'50px'} w={'90%'} title={'SALVAR'} onPress={expirar} />
            </VStack>
        </Box>
    )
}
