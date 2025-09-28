import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  ViewStyle,
} from "react-native";
import { Theme } from "@/theme/theme";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";

interface ButtonProps extends PressableProps {
  children: React.ReactNode;
  size?: number; // altura do botão
  loading?: boolean;
  variant?: "solid" | "outline" | "link";
  action?: "primary" | "secondary" | "positive" | "negative";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = 48,
  loading = false,
  variant = "solid",
  action = "primary",
  disabled = false,
  style,
  ...props
}) => {
  const bgColors: Record<string, keyof Theme["colors"]> = {
    primary: "primary",
    secondary: "secondary",
    positive: "success",
    negative: "destructive",
  };

  const backgroundColor =
    variant === "solid" ? bgColors[action] || "primary" : "none";

  const textColor =
    variant === "solid" ? "white" : bgColors[action] || "primary";

  return (
    <Pressable disabled={disabled || loading} style={style} {...props}>
      <Box
        height={size}
        px="m"
        borderRadius={8}
        backgroundColor={backgroundColor}
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        borderWidth={variant === "outline" ? 1 : 0}
        borderColor={variant === "outline" ? "border" : "none"}
        opacity={disabled ? 0.5 : 1}
      >
        {loading ? (
          <ActivityIndicator color={textColor} size="small" />
        ) : typeof children === "string" ? (
          <Text color={textColor} fontWeight="600" fontSize={16}>
            {children}
          </Text>
        ) : (
          children
        )}
      </Box>
    </Pressable>
  );
};

export default Button;
