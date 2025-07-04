"use client";
import React from "react";
import { Image, ImageProps } from "react-native";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import { Theme } from "@/theme/theme";

interface AvatarProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  children?: React.ReactNode;
}

// Configurações otimizadas usando objetos
const AVATAR_SIZES = {
  xs: { width: 24, height: 24 },
  sm: { width: 32, height: 32 },
  md: { width: 48, height: 48 },
  lg: { width: 64, height: 64 },
  xl: { width: 96, height: 96 },
  "2xl": { width: 128, height: 128 },
} as const;

const FONT_SIZES = {
  xs: 10,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  "2xl": 32,
} as const;

const Avatar: React.FC<AvatarProps> = ({ size = "md", children }) => {
  const sizeStyles = AVATAR_SIZES[size] || AVATAR_SIZES.md;

  return (
    <Box
      borderRadius={sizeStyles.width / 2}
      justifyContent="center"
      alignItems="center"
      backgroundColor="primary"
      position="relative"
      overflow="hidden"
      {...sizeStyles}
    >
      {children}
    </Box>
  );
};

interface AvatarImageProps extends ImageProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

const AvatarImage: React.FC<AvatarImageProps> = ({
  size = "md",
  style,
  ...props
}) => {
  const sizeStyles = AVATAR_SIZES[size] || AVATAR_SIZES.md;

  return (
    <Image
      style={[
        {
          ...sizeStyles,
          position: "absolute",
          top: 0,
          left: 0,
        },
        style,
      ]}
      {...props}
    />
  );
};

interface AvatarFallbackTextProps {
  children: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

const AvatarFallbackText: React.FC<AvatarFallbackTextProps> = ({
  children,
  size = "md",
}) => {
  const fontSize = FONT_SIZES[size] || FONT_SIZES.md;

  // Extrair apenas a primeira letra
  const getInitials = (text: string) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase();
  };

  const displayText =
    typeof children === "string" ? getInitials(children) : children;

  return (
    <Text color="white" fontWeight="600" fontSize={fontSize} textAlign="center">
      {displayText}
    </Text>
  );
};

interface AvatarBadgeProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

const BADGE_SIZES = {
  xs: { width: 8, height: 8 },
  sm: { width: 10, height: 10 },
  md: { width: 12, height: 12 },
  lg: { width: 16, height: 16 },
  xl: { width: 20, height: 20 },
  "2xl": { width: 24, height: 24 },
} as const;

const AvatarBadge: React.FC<AvatarBadgeProps> = ({ size = "md" }) => {
  const badgeSize = BADGE_SIZES[size] || BADGE_SIZES.md;

  return (
    <Box
      position="absolute"
      bottom={0}
      right={0}
      backgroundColor="success"
      borderRadius={badgeSize.width / 2}
      borderWidth={2}
      borderColor="white"
      {...badgeSize}
    />
  );
};

export { Avatar, AvatarImage, AvatarFallbackText, AvatarBadge };
