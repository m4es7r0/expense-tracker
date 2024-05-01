import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Provider } from "react-redux";
import tw from "./src/lib/tailwind";
import AppNavigation from "./src/navigators";
import { store } from "./src/redux/store";

export default function App() {
    return (
        <View style={tw`flex-1`}>
            <Provider store={store}>
                <AppNavigation />
            </Provider>
            <StatusBar style="light" />
        </View>
    );
}
