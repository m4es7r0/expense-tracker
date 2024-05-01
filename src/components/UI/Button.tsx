import { Pressable, Text, View } from "react-native";

import type { ClassInput } from "twrnc/dist/esm/types";
import tw from "../../lib/tailwind";

type Props = {
    children: React.ReactNode;
    onPress: () => void;
    variant: "flat" | "default";
    outerViewStyle?: ClassInput;
};

const Button = ({ children, onPress, variant, outerViewStyle }: Props) => {
    return (
        <View style={tw.style(outerViewStyle)}>
            <Pressable
                style={({ pressed }) =>
                    tw.style(pressed && `opacity-75 bg-primary-100 rounded-md`)
                }
                onPress={onPress}
            >
                <View
                    style={tw.style(
                        `rounded-md p-2 bg-primary-500`,
                        variant === "flat" && "bg-transparent",
                    )}
                >
                    <Text
                        style={tw.style(
                            `text-white text-center`,
                            variant === "flat" && "text-primary-200",
                        )}
                    >
                        {children}
                    </Text>
                </View>
            </Pressable>
        </View>
    );
};

export default Button;
