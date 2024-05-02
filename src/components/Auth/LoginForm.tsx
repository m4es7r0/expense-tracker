import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Text, View } from "react-native";

import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import tw from "../../lib/tailwind";
import Button from "../UI/Button";
import Input from "../UI/Input";
import LoadingSpinner from "../UI/LoadingSpinner";

export type Props = {
    onSuccessfulLogin: SubmitHandler<LoginFormSchema>;
};

const LoginFormSchema = z.object({
    email: z
        .string({ required_error: "Обов'язкове поле" })
        .email({ message: "Невірна електронна адреса" }),
    password: z
        .string({ required_error: "Обов'язкове поле" })
        .min(8, { message: "Пароль повинен містити мінімум 8 символів" })
        .max(16, { message: "Пароль повинен містити максимум 16 символів" }),
});

type LoginFormSchema = z.infer<typeof LoginFormSchema>;

const LoginForm = ({ onSuccessfulLogin }: Props) => {
    const {
        control,
        formState: { errors, isSubmitting },
        handleSubmit,
        setError,
    } = useForm<LoginFormSchema>({
        resolver: zodResolver(LoginFormSchema),
    });

    const onSubmit: SubmitHandler<LoginFormSchema> = async data => {
        try {
            await onSuccessfulLogin(data);
        } catch (err) {
            setError("root.serverError", {
                type: "500",
                message: (err as Error).message,
            });
        }
    };

    if (isSubmitting)
        return <LoadingSpinner text="Зачекайте, ми входимо в систему!" />;

    return (
        <View>
            <View>
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            label="Електронна пошта"
                            isValid={!errors.email}
                            textInputConfig={{
                                keyboardType: "email-address",
                                autoCapitalize: "none",
                                placeholder: "",
                                autoFocus: true,
                                onChangeText: onChange,
                                onBlur,
                                value,
                            }}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            label="Пароль"
                            isValid={!errors.password}
                            textInputConfig={{
                                placeholder: "",
                                onChangeText: onChange,
                                onBlur,
                                value,
                            }}
                        />
                    )}
                />
            </View>
            <View style={tw`gap-1 items-center mb-2`}>
                {Object.entries(errors).map(([_, val]) => (
                    <Text
                        key={Math.random()}
                        style={tw`text-error-500 font-semibold`}
                    >
                        {val.message}
                    </Text>
                ))}
                {errors.root?.serverError && (
                    <Text style={tw`text-rose-600`}>
                        {errors.root.serverError.message}, Будь ласка спробуйте
                        ще раз
                    </Text>
                )}
            </View>
            <Button variant="default" onPress={handleSubmit(onSubmit)}>
                Увійти
            </Button>
        </View>
    );
};

export default LoginForm;
