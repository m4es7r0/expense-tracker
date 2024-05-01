import ExpenseForm, { ExpenseFormProps } from ".";
import {
    useGetExpenseByIdQuery,
    useUpdateExpenseMutation,
} from "../../../redux/expensesAPI";

import { useAppSelector } from "../../../hooks/store";
import { selectUser } from "../../../redux/userSlice";
import { Expense } from "../../../types/types";
import LoadingSpinner from "../../UI/LoadingSpinner";

type Props = {
    expense: Pick<Expense, "id">;
    onCancel: () => void;
    onConfirm: () => void;
};

const ExpenseEditForm = ({ expense, onCancel, onConfirm }: Props) => {
    const user = useAppSelector(selectUser);
    if (!user.id) return <LoadingSpinner />;

    const [updateExpense] = useUpdateExpenseMutation();
    const { data, isLoading } = useGetExpenseByIdQuery({
        expenseId: expense.id,
        token: user.token,
        userId: user.id,
    });
    const handleFormConfirm: ExpenseFormProps["onConfirm"] = updatedExpense => {
        updateExpense({
            expenseId: expense.id,
            token: user.token,
            userId: user.id,
            expense: updatedExpense,
        });
        onConfirm();
    };

    if (isLoading)
        return <LoadingSpinner text="Editing your expense, hang on" />;

    return (
        <ExpenseForm
            expense={data}
            onCancel={onCancel}
            onConfirm={handleFormConfirm}
        />
    );
};

export default ExpenseEditForm;
