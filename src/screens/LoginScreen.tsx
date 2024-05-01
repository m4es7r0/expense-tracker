import AuthContent from "../components/Auth/AuthContent";
import type { Props as LoginFormProps } from "../components/Auth/LoginForm";
import { useAppDispatch } from "../hooks/store";
import { loginUser } from "../redux/userSlice";

const LoginScreen = () => {
    const dispatch = useAppDispatch();

    const handleLoginUser: LoginFormProps["onSuccessfulLogin"] = data =>
        dispatch(loginUser(data));

    return <AuthContent mode="login" onAuth={handleLoginUser} />;
};

export default LoginScreen;
