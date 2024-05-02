import { View } from "react-native";
import { useAppSelector } from "../../hooks/store";
import tw from "../../lib/tailwind";
import { useDeleteExpenseByIdMutation } from "../../redux/expensesAPI";
import { selectUser } from "../../redux/userSlice";
import { Expense } from "../../types/types";
import IconButton from "../UI/IconButton";
import LoadingSpinner from "../UI/LoadingSpinner";

type Props = {
    expense: Pick<Expense, "id">;
    callback: () => void;
};

const ExpenseDeleteButton = ({ expense, callback }: Props) => {
    const user = useAppSelector(selectUser);
    if (!user.id) return <LoadingSpinner />;
    const [deleteExpense, { isLoading }] = useDeleteExpenseByIdMutation();
    const handleExpenseDelete = () => {
        deleteExpense({
            expenseId: expense.id,
            token: user.token,
            userId: user.id,
        });
        callback();
    };

    return (
        <View
            style={tw`mt-4 pt-2 border-t-2 border-t-primary-200 items-center`}
        >
            {isLoading ? (
                <LoadingSpinner text="Зачекайте, видалення витрат" />
            ) : (
                <IconButton
                    iconName="trash"
                    color={tw.color("error-500")!}
                    size={36}
                    onPress={handleExpenseDelete}
                />
            )}
        </View>
    );
};

export default ExpenseDeleteButton;
