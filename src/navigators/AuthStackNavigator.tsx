import { createNativeStackNavigator } from "@react-navigation/native-stack";
import tw from "../lib/tailwind";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import { AuthStackParamList } from "../types/navigation";

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
    return (
        <AuthStack.Navigator
            initialRouteName="login"
            screenOptions={{
                headerStyle: tw`bg-primary-500`,
                headerTintColor: "white",
                contentStyle: tw`bg-primary-100`,
            }}
        >
            <AuthStack.Screen
                name="login"
                component={LoginScreen}
                options={{
                    headerTitle: "Login",
                }}
            />
            <AuthStack.Screen
                name="signUp"
                component={SignUpScreen}
                options={{
                    headerTitle: "Sign Up",
                }}
            />
        </AuthStack.Navigator>
    );
};

export default AuthStackNavigator;
