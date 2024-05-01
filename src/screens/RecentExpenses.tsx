import { useEffect, useState } from "react";
import { firebaseExpensesToExpenses, getDateMinusDays } from "../utils";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { useAppSelector } from "../hooks/store";
import { useGetExpensesQuery } from "../redux/expensesAPI";
import { selectUser } from "../redux/userSlice";
import { Expense } from "../types/types";

const RecentExpensesScreen = () => {
    const user = useAppSelector(selectUser);
    if (!(user.id || user.token)) return <LoadingSpinner />;

    const { data, isLoading } = useGetExpensesQuery({
        token: user.token,
        userId: user.id,
    });

    const [recentExpenses, setRecentExpenses] = useState<Expense[]>([]);

    useEffect(() => {
        if (!data) return;

        setRecentExpenses(
            firebaseExpensesToExpenses(data).filter(expense => {
                const today = new Date();
                const date7DaysAgo = getDateMinusDays(today, 7);
                return new Date(expense.date) > date7DaysAgo;
            }),
        );
    }, [data]);

    if (isLoading) return <LoadingSpinner text="Loading your expenses" />;

    return (
        <ExpensesOutput
            expenses={recentExpenses}
            expensesPeriod="Last 7 Days..."
        />
    );
};

export default RecentExpensesScreen;
