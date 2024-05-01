import { ActivityIndicator, Text, View } from "react-native";

import tw from "../../lib/tailwind";

type Props = {
    text?: string;
};

const LoadingSpinner = ({ text }: Props) => {
    return (
        <View
            style={tw`flex-1 flex-col gap-4 justify-center items-center bg-primary-700 p-6`}
        >
            <ActivityIndicator size="large" color="white" />
            <Text style={tw`text-white font-bold tracking-wider text-2xl`}>
                {text ? text : "Loading..."}
            </Text>
        </View>
    );
};

export default LoadingSpinner;
