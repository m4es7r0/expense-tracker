import ExpenseForm, { ExpenseFormProps } from ".";

import { useAppSelector } from "../../../hooks/store";
import { useAddExpenseMutation } from "../../../redux/expensesAPI";
import { selectUser } from "../../../redux/userSlice";
import LoadingSpinner from "../../UI/LoadingSpinner";

type Props = {
    onCancel: () => void;
    onConfirm: () => void;
};

const ExpenseNewForm = ({ onCancel, onConfirm }: Props) => {
    const user = useAppSelector(selectUser);
    if (!user.id) return <LoadingSpinner />;

    const [addExpense, { isLoading }] = useAddExpenseMutation();
    const handleFormConfirm: ExpenseFormProps["onConfirm"] = newExpense => {
        addExpense({
            expense: newExpense,
            token: user.token,
            userId: user.id,
        });
        onConfirm();
    };

    if (isLoading) return <LoadingSpinner text="Adding your expense" />;

    return <ExpenseForm onCancel={onCancel} onConfirm={handleFormConfirm} />;
};

export default ExpenseNewForm;
