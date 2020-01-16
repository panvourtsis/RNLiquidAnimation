import React from "react";
import { View } from "react-native";
import { Feather as Icon } from "@expo/vector-icons"

const size = 50;
interface ButtonProps {}

export default () => {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: size,
        height: size,
        borderRadius: size / 2,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Icon name="chevron-left" color="black" size={40} />
    </View>
  );
};
