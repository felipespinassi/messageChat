import React from "react";
import { Image } from "react-native";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";

interface AvatarProps {
  size: number;
  uri?: string;
  fallbackText?: string | null;
  showBadge?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
  size,
  uri,
  fallbackText,
  showBadge,
}) => {
  const initials = fallbackText?.trim().charAt(0).toUpperCase() || "?";
  const badgeSize = Math.round(size * 0.25);

  return (
    <Box
      width={size}
      height={size}
      borderRadius={size / 2}
      backgroundColor="primary"
      justifyContent="center"
      alignItems="center"
      position="relative"
      overflow="hidden"
    >
      {uri ? (
        <Image
          source={{ uri }}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            position: "absolute",
            top: 0,
            left: 0,
          }}
          resizeMode="cover"
        />
      ) : (
        <Text
          color="white"
          fontWeight="600"
          fontSize={size * 0.375}
          textAlign="center"
        >
          {initials}
        </Text>
      )}

      {showBadge && (
        <Box
          width={badgeSize}
          height={badgeSize}
          borderRadius={badgeSize / 2}
          backgroundColor="success"
          position="absolute"
          bottom={4}
          right={4}
          borderWidth={2}
          borderColor="success"
        />
      )}
    </Box>
  );
};

export default Avatar;
