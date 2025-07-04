"use client";
import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { Box } from "@/components/RestyleComponents/RestyleComponents";
import { Theme } from "@/theme/theme";

// Configurações otimizadas com objetos
const INPUT_SIZES = {
  xs: { height: 32 },
  sm: { height: 36 },
  md: { height: 40 },
  lg: { height: 44 },
  xl: { height: 48 },
} as const;

const INPUT_VARIANTS = {
  outline: {
    borderWidth: 1,
    borderRadius: 8,
  },
  underlined: {
    borderBottomWidth: 1,
    borderRadius: 0,
  },
  rounded: {
    borderWidth: 1,
    borderRadius: 20,
  },
} as const;

const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
} as const;

interface InputProps {
  variant?: "outline" | "underlined" | "rounded";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  isInvalid?: boolean;
  isDisabled?: boolean;
  children?: React.ReactNode;
  style?: any;
}

const Input: React.FC<InputProps> = ({
  variant = "outline",
  size = "md",
  isInvalid = false,
  isDisabled = false,
  children,
  style,
  ...props
}) => {
  const sizeStyles = INPUT_SIZES[size] || INPUT_SIZES.md;
  const variantStyles = INPUT_VARIANTS[variant] || INPUT_VARIANTS.outline;

  const baseStyles = {
    backgroundColor: "white" as keyof Theme["colors"],
    borderColor: isInvalid
      ? ("destructive" as keyof Theme["colors"])
      : ("border" as keyof Theme["colors"]),
  };

  const combinedStyles = { ...baseStyles, ...variantStyles };

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      overflow="hidden"
      opacity={isDisabled ? 0.4 : 1}
      {...sizeStyles}
      {...combinedStyles}
      style={style}
    >
      {children}
    </Box>
  );
};

interface InputFieldProps extends TextInputProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const InputField: React.FC<InputFieldProps> = ({
  size = "md",
  style,
  ...props
}) => {
  const fontSize = FONT_SIZES[size] || FONT_SIZES.md;

  return (
    <TextInput
      style={[
        {
          flex: 1,
          paddingHorizontal: 12,
          fontSize,
          color: "#1e1e1e",
        },
        style,
      ]}
      placeholderTextColor="#6b7280"
      {...props}
    />
  );
};

export { Input, InputField };
