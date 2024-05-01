import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { useAppSelector } from "../hooks/store";
import { selectUser } from "../redux/userSlice";
import AuthStackNavigator from "./AuthStackNavigator";
import RootStackNavigator from "./RootStackNavigator";

const AppNavigation = () => {
    const { loading, token } = useAppSelector(selectUser);
    if (loading == "pending") return <LoadingSpinner />;

    return (
        <NavigationContainer>
            {token ? <RootStackNavigator /> : <AuthStackNavigator />}
        </NavigationContainer>
    );
};

export default AppNavigation;
