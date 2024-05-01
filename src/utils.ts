import { FirebaseResponseType } from "./redux/expensesAPI";
import { Expense } from "./types/types";

export const getFormattedDate = (date: Date) => date.toISOString().slice(0, 10);

export const getDateMinusDays = (date: Date, days: number) => {
    return new Date(date.setDate(date.getDate() - days));
};

export const getDatePlusSeconds = (date: Date, seconds: number) => {
    return new Date(date.setSeconds(date.getSeconds() + seconds));
};

export const firebaseExpensesToExpenses = (
    firebaseExpenses: FirebaseResponseType<Expense>,
) => {
    const expenses: Expense[] = [];
    for (const key in firebaseExpenses)
        expenses.push({ ...firebaseExpenses[key], id: key });

    return expenses;
};
