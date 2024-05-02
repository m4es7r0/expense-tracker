import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Text, View } from "react-native";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import tw from "../../../lib/tailwind";
import { Expense } from "../../../types/types";
import Button from "../../UI/Button";
import Input from "../Input";

const expenseSchema = z.object({
    amount: z
        .string({ required_error: "Обов'язкове поле" })
        .refine(value => !isNaN(+value), {
            message: "Не вдається розібрати рядок як число",
            path: [],
        }),
    date: z
        .string({ required_error: "Обов'язкове поле" })
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Дата повинна бути у форматі YYYY-MM-DD"),
    desc: z
        .string({ required_error: "Обов'язкове поле" })
        .min(3, "Опис повинен мати довжину не менше 3 символів"),
});

type ExpenseSchema = z.infer<typeof expenseSchema>;

type Props = {
    onCancel: () => void;
    onConfirm: (expense: Omit<Expense, "id">) => void;
    expense?: Omit<Expense, "id">;
};

const ExpenseForm = ({ onCancel, onConfirm, expense }: Props) => {
    const defaultVal = expense
        ? { ...expense, amount: `${expense.amount}` }
        : {
              amount: "",
              date: new Date().toISOString().slice(0, 10),
              desc: "",
          };
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ExpenseSchema>({
        resolver: zodResolver(expenseSchema),
        defaultValues: defaultVal,
    });

    const onSubmit: SubmitHandler<ExpenseSchema> = data => {
        const finalExpense = {
            ...data,
            amount: +data.amount,
        };
        onConfirm(finalExpense);
    };
    const isEditing = !!expense;

    return (
        <View style={tw`mt-0`}>
            {/* <Text style={tw`text-2xl font-bold text-center text-white my-6`}>
                Ваша витрата
            </Text> */}
            <View style={tw`flex-row justify-between`}>
                <Controller
                    control={control}
                    name="amount"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            label="Кількість"
                            containerStyle="flex-1"
                            isValid={!errors.amount}
                            textInputConfig={{
                                keyboardType: "decimal-pad",
                                placeholder: "",
                                autoFocus: true,
                                onChangeText: onChange,
                                onBlur,
                                value: value.toString(),
                            }}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="date"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            label="Дата"
                            containerStyle="flex-1"
                            isValid={!errors.date}
                            textInputConfig={{
                                placeholder: "YYYY-MM-DD",
                                keyboardType: "number-pad",
                                maxLength: 10,
                                onChangeText: onChange,
                                onBlur,
                                value,
                            }}
                        />
                    )}
                />
            </View>

            <Controller
                control={control}
                name="desc"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        label="Опис"
                        isValid={!errors.desc}
                        textInputConfig={{
                            multiline: true,
                            autoCorrect: false,
                            autoCapitalize: "sentences",
                            onChangeText: onChange,
                            onBlur,
                            value,
                        }}
                    />
                )}
            />
            <View style={tw`gap-1 items-center mb-2`}>
                {Object.entries(errors).map(([key, val]) => (
                    <Text
                        key={Math.random()}
                        style={tw`text-error-500 font-semibold`}
                    >
                        {val.message}
                    </Text>
                ))}
            </View>

            <View style={tw`flex-row justify-center items-center`}>
                <Button
                    variant="flat"
                    outerViewStyle={tw`min-w-[120px] mx-2`}
                    onPress={onCancel}
                >
                    Скасувати
                </Button>
                <Button
                    variant="default"
                    outerViewStyle={tw`min-w-[120px] mx-2`}
                    onPress={handleSubmit(onSubmit)}
                >
                    {isEditing ? "Оновити" : "Додати"}
                </Button>
            </View>
        </View>
    );
};

export default ExpenseForm;
export { Props as ExpenseFormProps };
