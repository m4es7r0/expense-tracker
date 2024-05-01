import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { selectUser, signUpUser } from "../redux/userSlice";

import AuthContent from "../components/Auth/AuthContent";
import { Props as SignUpFormProps } from "../components/Auth/SignUpForm";

const SignUpScreen = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);

    const handleSignUpUser: SignUpFormProps["onSuccessfulSignUp"] = data =>
        dispatch(signUpUser(data));

    useEffect(() => {
        console.log("user", JSON.stringify(user, null, 2));
    }, [user]);

    return <AuthContent mode="signUp" onAuth={handleSignUpUser} />;
};

export default SignUpScreen;
