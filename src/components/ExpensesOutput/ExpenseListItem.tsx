import { Pressable, Text, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import tw from "../../lib/tailwind";
import { RootStackNavigationProps } from "../../types/navigation";
import { Expense } from "../../types/types";
import { getFormattedDate } from "../../utils";

type Props = Pick<Expense, "id" | "desc" | "amount" | "date">;

const ExpenseListItem = ({ id, desc, amount, date }: Props) => {
    const navigation =
        useNavigation<RootStackNavigationProps<"MangeExpense">>();

    const expensePressHandler = () => {
        navigation.navigate("MangeExpense", { expenseId: id });
    };

    return (
        <Pressable
            style={({ pressed }) => tw.style(pressed && "opacity-75")}
            onPress={expensePressHandler}
        >
            <View
                style={tw`p-3 my-2 bg-primary-500 flex-row justify-between rounded-md shadow-md`}
            >
                <View>
                    <Text style={tw`text-primary-50 text-base mb-1 font-bold`}>
                        {desc}
                    </Text>
                    <Text style={tw`text-primary-50`}>
                        {getFormattedDate(new Date(date))}
                    </Text>
                </View>
                <View
                    style={tw`text-primary-50 px-3 py-1 bg-white justify-center items-center rounded-sm`}
                >
                    <Text
                        style={tw`text-primary-500 font-bold min-w-[80px] text-center`}
                    >
                        {amount.toFixed(2)}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
};

export default ExpenseListItem;
