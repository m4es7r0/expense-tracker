import React, { useEffect } from "react";

import { View } from "react-native";
import ExpenseDeleteButton from "../components/MangeExpense/ExpenseDeleteButton";
import ExpenseEditForm from "../components/MangeExpense/ExpenseForm/ExpenseEditForm";
import ExpenseNewForm from "../components/MangeExpense/ExpenseForm/ExpenseNewForm";
import tw from "../lib/tailwind";
import type { RootStackScreenProps } from "../types/navigation";

const ManageExpensesScreen = ({
    navigation,
    route: {
        params: { expenseId },
    },
}: RootStackScreenProps<"MangeExpense">) => {
    const isEditing = !!expenseId;

    useEffect(() => {
        // set title
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense",
        });
    }, [navigation, isEditing]);

    const handleFormCancel = () => {
        navigation.goBack();
    };

    const handleFormConfirm = () => {
        navigation.goBack();
    };

    return (
        <View style={tw`flex-1 p-6 bg-primary-800`}>
            {isEditing ? (
                <>
                    <ExpenseEditForm
                        expense={{ id: expenseId }}
                        onCancel={handleFormCancel}
                        onConfirm={handleFormConfirm}
                    />
                    <ExpenseDeleteButton expense={{ id: expenseId }} />
                </>
            ) : (
                <ExpenseNewForm
                    onConfirm={handleFormConfirm}
                    onCancel={handleFormCancel}
                />
            )}
        </View>
    );
};

export default ManageExpensesScreen;
