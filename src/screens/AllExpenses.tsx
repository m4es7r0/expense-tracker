import { useEffect, useState } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { useAppSelector } from "../hooks/store";
import { useGetExpensesQuery } from "../redux/expensesAPI";
import { selectUser } from "../redux/userSlice";
import { Expense } from "../types/types";
import { firebaseExpensesToExpenses } from "../utils";

const AllExpensesScreen = () => {
    const user = useAppSelector(selectUser);
    if (!(user.id || user.token)) return <LoadingSpinner />;

    const { data, isLoading } = useGetExpensesQuery({
        userId: user.id,
        token: user.token,
    });
    const [expenses, setExpenses] = useState<Expense[]>([]);

    useEffect(() => {
        if (!data) return;
        setExpenses(firebaseExpensesToExpenses(data));
    }, [data]);

    if (isLoading) return <LoadingSpinner text="Loading your expenses" />;

    return <ExpensesOutput expenses={expenses} expensesPeriod="All" />;
};

export default AllExpensesScreen;
