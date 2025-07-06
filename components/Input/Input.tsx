import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { Box } from "@/components/RestyleComponents/RestyleComponents";
import { Theme } from "@/theme/theme";
import { useTheme } from "@shopify/restyle";

interface InputProps extends TextInputProps {
  size?: number; // altura
  variant?: "outline" | "underlined" | "rounded";
  isInvalid?: boolean;
  isDisabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  size = 48,
  variant = "outline",
  isInvalid = false,
  isDisabled = false,
  style,
  ...props
}) => {
  const variantStyles = {
    outline: {
      borderWidth: 0.4,
      borderRadius: 8,
    },
    underlined: {
      borderBottomWidth: 0.4,
      borderRadius: 0,
    },
    rounded: {
      borderWidth: 0.4,
      borderRadius: 999,
    },
  }[variant];

  const borderColor: keyof Theme["colors"] = isInvalid
    ? "destructive"
    : "border";

  const theme = useTheme<Theme>();

  return (
    <Box
      height={size}
      backgroundColor="muted"
      borderColor={borderColor}
      opacity={isDisabled ? 0.4 : 1}
      flexDirection="row"
      alignItems="center"
      px="m"
      {...variantStyles}
    >
      <TextInput
        editable={!isDisabled}
        style={[
          {
            flex: 1,
            fontSize: size * 0.375, // proporcional à altura
            color: theme.colors.foreground,
          },
          style,
        ]}
        placeholderTextColor={theme.colors.gray}
        {...props}
      />
    </Box>
  );
};

export default Input;
