import LoginForm, { Props as LoginFormProps } from "./LoginForm";
import SignUpForm, { Props as SignUpFormProps } from "./SignUpForm";

import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import tw from "../../lib/tailwind";
import { AuthStackNavigationProps } from "../../types/navigation";
import Button from "../UI/Button";

type Props =
    | {
          mode: "signUp";
          onAuth: SignUpFormProps["onSuccessfulSignUp"];
      }
    | { mode: "login"; onAuth: LoginFormProps["onSuccessfulLogin"] };

const AuthContent = ({ mode, onAuth }: Props) => {
    const navigation = useNavigation<AuthStackNavigationProps<"login">>();

    const handleAuthModeChange = () => {
        navigation.replace(mode === "signUp" ? "login" : "signUp");
    };

    return (
        <View
            style={tw`mt-16 mx-8 p-4 pb-8 rounded-lg bg-primary-800 shadow-md`}
        >
            {mode === "signUp" ? (
                <SignUpForm onSuccessfulSignUp={onAuth} />
            ) : (
                <LoginForm onSuccessfulLogin={onAuth} />
            )}
            <View style={tw`mt-2`}>
                <Button variant="flat" onPress={handleAuthModeChange}>
                    {mode === "signUp"
                        ? "Already have an account?"
                        : "Don't have an account?"}
                </Button>
            </View>
        </View>
    );
};

export default AuthContent;
