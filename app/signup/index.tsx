import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { Input, InputField } from "@/components/ui/input";
import { ChevronLeft, Key } from "lucide-react-native";
import { router } from "expo-router";
import { Button, ButtonText } from "@/components/ui/button";
import Signup from "@/views/Signup/Signup";

export default function index() {
  return <Signup />;
}
