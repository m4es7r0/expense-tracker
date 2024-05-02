import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Text, View } from "react-native";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import uuid from "react-native-uuid";
import z from "zod";
import tw from "../../lib/tailwind";
import Button from "../UI/Button";
import Input from "../UI/Input";

const SignUpFormSchema = z
    .object({
        email: z
            .string({ required_error: "Обов'язкове поле" })
            .email({ message: "Невірна електронна адреса" }),
        confirmEmail: z
            .string({ required_error: "Обов'язкове поле" })
            .email({ message: "Невірна електронна адреса" }),
        password: z
            .string({ required_error: "Обов'язкове поле" })
            .min(8, { message: "Пароль повинен містити мінімум 8 символів" })
            .max(16, {
                message: "Пароль повинен містити максимум 16 символів",
            }),
        confirmPassword: z
            .string({ required_error: "Обов'язкове поле" })
            .min(8, { message: "Пароль повинен містити мінімум 8 символів" })
            .max(16, {
                message: "Пароль повинен містити максимум 16 символів",
            }),
    })
    .superRefine(({ email, confirmEmail, password, confirmPassword }, ctx) => {
        if (email !== confirmEmail) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Електронні адреси не співпадають",
                path: ["confirmEmail"],
            });
        }
        if (password !== confirmPassword) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Паролі не співпадають",
                path: ["confirmPassword"],
            });
        }
    });

type SignUpFormSchema = z.infer<typeof SignUpFormSchema>;

export type Props = {
    onSuccessfulSignUp: SubmitHandler<SignUpFormSchema>;
};

const SignUpForm = ({ onSuccessfulSignUp }: Props) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<SignUpFormSchema>({
        resolver: zodResolver(SignUpFormSchema),
    });

    const onSubmit: SubmitHandler<SignUpFormSchema> = async data => {
        try {
            await onSuccessfulSignUp(data);
        } catch (err) {
            setError("root.serverError", {
                type: "500",
                message: (err as Error).message,
            });
        }
    };

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
                    name="confirmEmail"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            label="Підтвердити електронну пошту"
                            isValid={!errors.confirmEmail}
                            textInputConfig={{
                                keyboardType: "email-address",
                                autoCapitalize: "none",
                                placeholder: "",
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

                <Controller
                    control={control}
                    name="confirmPassword"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            label="Підтвердити пароль"
                            isValid={!errors.confirmPassword}
                            textInputConfig={{
                                placeholder: "",
                                onChangeText: onChange,
                                onBlur,
                                value,
                            }}
                        />
                    )}
                />
                <View style={tw`gap-1 items-center mb-2`}>
                    {Object.entries(errors).map(([_, val]) => (
                        <Text
                            key={uuid.v4().toString()}
                            style={tw`text-error-500 font-semibold`}
                        >
                            {val.message}
                        </Text>
                    ))}
                    {errors.root?.serverError && (
                        <Text style={tw`text-rose-600`}>
                            {errors.root.serverError.message}, Будь ласка
                            спробуйте ще раз
                        </Text>
                    )}
                </View>
                <View style={tw`mt-4`}>
                    <Button
                        onPress={handleSubmit(onSuccessfulSignUp)}
                        variant="default"
                    >
                        Зареєструватися
                    </Button>
                </View>
            </View>
        </View>
    );
};

export default SignUpForm;
