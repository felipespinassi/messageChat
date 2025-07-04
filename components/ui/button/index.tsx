"use client";
import React from "react";
import { ActivityIndicator, Pressable, PressableProps } from "react-native";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import { Theme } from "@/theme/theme";

// Configurações otimizadas com objetos
const BUTTON_SIZES = {
  xs: { paddingHorizontal: "s" as const, height: 32 },
  sm: { paddingHorizontal: "s" as const, height: 36 },
  md: { paddingHorizontal: "m" as const, height: 40 },
  lg: { paddingHorizontal: "m" as const, height: 44 },
  xl: { paddingHorizontal: "l" as const, height: 48 },
} as const;

const BUTTON_COLORS = {
  primary: "primary" as keyof Theme["colors"],
  secondary: "secondary" as keyof Theme["colors"],
  positive: "success" as keyof Theme["colors"],
  negative: "destructive" as keyof Theme["colors"],
  default: "primary" as keyof Theme["colors"],
} as const;

const VARIANT_STYLES = {
  solid: {
    backgroundColor: "primary" as keyof Theme["colors"],
  },
  outline: {
    backgroundColor: "transparent" as keyof Theme["colors"],
    borderWidth: 1,
    borderColor: "border" as keyof Theme["colors"],
  },
  link: {
    backgroundColor: "transparent" as keyof Theme["colors"],
  },
} as const;

interface ButtonProps extends PressableProps {
  variant?: "solid" | "outline" | "link";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  action?: "primary" | "secondary" | "positive" | "negative" | "default";
  disabled?: boolean;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "solid",
  size = "md",
  action = "primary",
  disabled = false,
  children,
  style,
  ...props
}) => {
  const sizeStyles = BUTTON_SIZES[size] || BUTTON_SIZES.md;
  const baseVariantStyles = VARIANT_STYLES[variant] || VARIANT_STYLES.solid;

  // Para variante solid, aplicar cor baseada na action
  const variantStyles =
    variant === "solid"
      ? {
          ...baseVariantStyles,
          backgroundColor: BUTTON_COLORS[action] || BUTTON_COLORS.primary,
        }
      : baseVariantStyles;

  return (
    <Pressable disabled={disabled} style={style} {...props}>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        borderRadius={8}
        opacity={disabled ? 0.4 : 1}
        gap="xs"
        {...sizeStyles}
        {...variantStyles}
      >
        {children}
      </Box>
    </Pressable>
  );
};

interface ButtonTextProps {
  children: React.ReactNode;
  color?: keyof Theme["colors"];
  style?: any;
}

const ButtonText: React.FC<ButtonTextProps> = ({ children, color, style }) => {
  return (
    <Text
      color={color || "white"}
      fontWeight="600"
      textAlign="center"
      style={style}
    >
      {children}
    </Text>
  );
};

interface ButtonSpinnerProps {
  color?: string;
}

const ButtonSpinner: React.FC<ButtonSpinnerProps> = ({ color = "white" }) => {
  return <ActivityIndicator color={color} size="small" />;
};

export { Button, ButtonText, ButtonSpinner };
