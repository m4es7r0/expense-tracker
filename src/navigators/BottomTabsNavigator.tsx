import {
    BottomTabNavigationOptions,
    createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
    ExpenseOverviewParamList,
    RootStackNavigationProps,
} from "../types/navigation";

import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { useAppDispatch } from "../hooks/store";
import tw from "../lib/tailwind";
import { logoutUser } from "../redux/userSlice";
import AllExpensesScreen from "../screens/AllExpenses";
import RecentExpensesScreen from "../screens/RecentExpenses";

const BottomTab = createBottomTabNavigator<ExpenseOverviewParamList>();

type IconProps = {
    size: number;
    color: string;
};
const RecentExpensesIcon = ({ size, color }: IconProps) => (
    <Ionicons name="hourglass" size={size} color={color} />
);

const AllExpensesIcon = ({ size, color }: IconProps) => (
    <Ionicons name="calendar" size={size} color={color} />
);
const AddIcon = ({
    color,
    onPress,
}: {
    color: string;
    onPress: () => void;
}) => <IconButton size={24} color={color} iconName="add" onPress={onPress} />;

const LogoutIcon = ({
    color,
    onPress,
}: {
    color: string;
    onPress: () => void;
}) => (
    <IconButton size={24} color={color} iconName="log-out" onPress={onPress} />
);

const BottomTabsNavigator = () => {
    const dispatch = useAppDispatch();
    const getScreenOptions: (props: {
        route: any;
        navigation: RootStackNavigationProps<"MangeExpense">;
    }) => BottomTabNavigationOptions = ({ navigation }) => {
        const handleAddExpensePress = () =>
            navigation.navigate("MangeExpense", {});
        const handleLogout = () => dispatch(logoutUser());

        return {
            headerStyle: tw`bg-primary-500`,
            headerTintColor: "white",
            tabBarStyle: tw`bg-primary-800`,
            tabBarActiveTintColor: tw.color("accent-500"),
            headerRight: ({ tintColor }) => {
                return (
                    <View style={tw`flex-row`}>
                        <AddIcon
                            color={tintColor!}
                            onPress={handleAddExpensePress}
                        />
                        <LogoutIcon color={tintColor!} onPress={handleLogout} />
                    </View>
                );
            },
        };
    };
    return (
        <BottomTab.Navigator screenOptions={getScreenOptions}>
            <BottomTab.Screen
                name="RecentExpenses"
                component={RecentExpensesScreen}
                options={{
                    title: "Останні Витрати",
                    tabBarIcon: RecentExpensesIcon,
                }}
            />
            <BottomTab.Screen
                name="AllExpenses"
                component={AllExpensesScreen}
                options={{ title: "Всі Витрати", tabBarIcon: AllExpensesIcon }}
            />
        </BottomTab.Navigator>
    );
};

export default BottomTabsNavigator;
