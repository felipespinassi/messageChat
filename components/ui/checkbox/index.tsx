"use client";
import React from "react";
import { Pressable, PressableProps } from "react-native";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import { Theme } from "@/theme/theme";

// Configurações otimizadas com objetos
const CHECKBOX_SIZES = {
  xs: { width: 16, height: 16 },
  sm: { width: 20, height: 20 },
  md: { width: 24, height: 24 },
  lg: { width: 28, height: 28 },
  xl: { width: 32, height: 32 },
} as const;

const ICON_SIZES = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
} as const;

interface CheckboxProps extends PressableProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  isChecked?: boolean;
  isDisabled?: boolean;
  colorScheme?: "primary" | "secondary" | "success" | "destructive";
  children?: React.ReactNode;
}

const Checkbox: React.FC<CheckboxProps> = ({
  size = "md",
  isChecked = false,
  isDisabled = false,
  colorScheme = "primary",
  children,
  style,
  ...props
}) => {
  const sizeStyles = CHECKBOX_SIZES[size] || CHECKBOX_SIZES.md;
  const iconSize = ICON_SIZES[size] || ICON_SIZES.md;

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
    <Pressable
      disabled={isDisabled}
      style={{ flexDirection: "row", alignItems: "center" }}
      {...props}
    >
      <Box
        borderWidth={2}
        borderRadius={4}
        justifyContent="center"
        alignItems="center"
        opacity={isDisabled ? 0.4 : 1}
        {...sizeStyles}
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
      {children && <Box marginLeft="xs">{children}</Box>}
    </Pressable>
  );
};

interface CheckboxIndicatorProps {
  children?: React.ReactNode;
}

const CheckboxIndicator: React.FC<CheckboxIndicatorProps> = ({ children }) => {
  return <>{children}</>;
};

interface CheckboxLabelProps {
  children: React.ReactNode;
  color?: keyof Theme["colors"];
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const LABEL_FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
} as const;

const CheckboxLabel: React.FC<CheckboxLabelProps> = ({
  children,
  color = "foreground",
  size = "md",
}) => {
  const fontSize = LABEL_FONT_SIZES[size] || LABEL_FONT_SIZES.md;

  return (
    <Text color={color} fontSize={fontSize} marginLeft="xs">
      {children}
    </Text>
  );
};

export { Checkbox, CheckboxIndicator, CheckboxLabel };
