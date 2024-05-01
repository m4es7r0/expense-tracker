import { View } from "react-native";
import tw from "../../lib/tailwind";
import type { Expense } from "../../types/types";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

type Props = { expenses: Expense[]; expensesPeriod: string };

const ExpensesOutput = ({ expenses, expensesPeriod }: Props) => {
    return (
        <View style={tw`flex-1 px-6 pt-6 gap-4 bg-primary-700`}>
            <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
            <ExpensesList expenses={expenses} />
        </View>
    );
};

export default ExpensesOutput;
