import { Text, TextInput, TextInputProps, View } from "react-native";

import { ClassInput } from "twrnc/dist/esm/types";
import tw from "../../lib/tailwind";

type Props = {
    label: string;
    textInputConfig?: TextInputProps;
    containerStyle?: ClassInput;
    isValid?: boolean;
};

const Input = ({ label, textInputConfig, containerStyle, isValid }: Props) => {
    return (
        <View style={tw.style(`mx-1 my-2`, containerStyle)}>
            <Text
                style={tw.style(
                    `text-xs text-primary-100 mb-1`,
                    !isValid && "text-error-500",
                )}
            >
                {label}
            </Text>

            <TextInput
                style={tw.style(
                    `bg-primary-100 text-primary-700 p-2 rounded-md text-lg`,
                    textInputConfig?.multiline && {
                        minHeight: 100,
                        textAlignVertical: "top",
                    },
                    !isValid && "bg-error-50",
                )}
                {...textInputConfig}
            />
        </View>
    );
};

export default Input;
