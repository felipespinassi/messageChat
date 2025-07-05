import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { createBox } from "@shopify/restyle";
import { PropsWithChildren } from "react";
import { Theme } from "@/theme/theme";

const TouchableOpacityBoxBase = createBox<Theme, TouchableOpacityProps>(
  TouchableOpacity
);

type TouchableOpacityBoxProps = PropsWithChildren<TouchableOpacityProps> &
  React.ComponentProps<typeof TouchableOpacityBoxBase>;

export const TouchableOpacityBox = ({
  children,
  ...rest
}: TouchableOpacityBoxProps) => {
  return (
    <TouchableOpacityBoxBase activeOpacity={0.7} {...rest}>
      {children}
    </TouchableOpacityBoxBase>
  );
};
