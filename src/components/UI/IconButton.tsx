import { Pressable, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import tw from "../../lib/tailwind";

type Props = {
    iconName: keyof typeof Ionicons.glyphMap;
    size: number;
    color: string;
    onPress: () => void;
};

const IconButton = ({ iconName, size, color, onPress }: Props) => {
    return (
        <Pressable
            style={({ pressed }) => tw.style(pressed && "opacity-50")}
            onPress={onPress}
        >
            <View style={tw`rounded-full p-1 m-2`}>
                <Ionicons name={iconName} size={size} color={color} />
            </View>
        </Pressable>
    );
};

export default IconButton;
