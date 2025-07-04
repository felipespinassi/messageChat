import React from "react";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";

export default function ScreenTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Box gap="xs" padding="s">
      <Text fontSize={48} color="primary" fontWeight="600">
        {title}
      </Text>
      <Text fontWeight="600" fontSize={20}>
        {description}
      </Text>
    </Box>
  );
}
