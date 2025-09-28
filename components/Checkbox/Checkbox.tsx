import React from "react";
import { Pressable, PressableProps } from "react-native";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import { Theme } from "@/theme/theme";

interface CheckboxProps extends PressableProps {
  size?: number;
  isChecked?: boolean;
  isDisabled?: boolean;
  colorScheme?: "primary" | "secondary" | "success" | "destructive";
}

const Checkbox: React.FC<CheckboxProps> = ({
  size = 24,
  isChecked = false,
  isDisabled = false,
  colorScheme = "primary",
  style,
  ...props
}) => {
  const iconSize = Math.floor(size * 0.6);

  const getColorScheme = () => {
    if (isChecked) {
      return {
        backgroundColor: `${colorScheme}` as keyof Theme["colors"],
        borderColor: `${colorScheme}` as keyof Theme["colors"],
      };
    }
    return {
      backgroundColor: "white" as keyof Theme["colors"],
      borderColor: "border" as keyof Theme["colors"],
    };
  };

  const colorStyles = getColorScheme();

  return (
    <Pressable disabled={isDisabled} style={style} {...props}>
      <Box
        width={size}
        height={size}
        borderWidth={2}
        borderRadius={4}
        justifyContent="center"
        alignItems="center"
        opacity={isDisabled ? 0.4 : 1}
        {...colorStyles}
      >
        {isChecked && (
          <Text
            color="white"
            fontSize={iconSize}
            fontWeight="600"
            textAlign="center"
          >
            ✓
          </Text>
        )}
      </Box>
    </Pressable>
  );
};

export default Checkbox;
