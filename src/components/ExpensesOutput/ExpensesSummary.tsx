import { Text, View } from "react-native";

import tw from "../../lib/tailwind";
import { Expense } from "../../types/types";

type Props = {
    periodName: string;
    expenses: Expense[];
};

const ExpensesSummary = ({ periodName, expenses }: Props) => {
    const expensesSum = expenses.reduce(
        (acc, expense) => expense.amount + acc,
        0,
    );

    return (
        <View
            style={tw`p-2 bg-primary-50 rounded-md flex-row justify-between items-center`}
        >
            <Text style={tw`text-sm text-primary-400`}>{periodName}</Text>
            <Text style={tw`text-base font-bold text-primary-500`}>
                ${expensesSum.toFixed(2)}
            </Text>
        </View>
    );
};

export default ExpensesSummary;
