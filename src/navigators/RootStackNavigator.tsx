import { createNativeStackNavigator } from "@react-navigation/native-stack";
import tw from "../lib/tailwind";
import ManageExpensesScreen from "../screens/ManageExpenses";
import { RootStackParamList } from "../types/navigation";
import BottomTabsNavigator from "./BottomTabsNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="ExpenseOverview"
            screenOptions={{
                headerStyle: tw`bg-primary-500`,
                headerTintColor: "white",
            }}
        >
            <Stack.Screen
                name="ExpenseOverview"
                component={BottomTabsNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="MangeExpense"
                component={ManageExpensesScreen}
                options={{ presentation: "modal" }}
            />
        </Stack.Navigator>
    );
};

export default RootStackNavigator;
