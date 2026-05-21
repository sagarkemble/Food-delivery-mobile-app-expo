import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import useUserContext from "../hooks/useContext.hook";

const SignIn = () => {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const {
    email: userEmail,
    password: userPassword,
    setIsLoggedIn,
  } = useUserContext();

  const handleSignIn = () => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");
    setGeneralError("");

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Valid email is required");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    }

    if (isValid) {
      if (email === userEmail && password === userPassword) {
        setIsLoggedIn(true);
      } else {
        setGeneralError("Invalid email or password");
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError("");
          }}
          placeholder="Enter your email"
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
          autoCapitalize="none"
          style={[styles.input, emailError ? styles.inputError : null]}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <Text style={styles.label}>Password</Text>
        <TextInput
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setPasswordError("");
          }}
          placeholder="Enter your password"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          style={[styles.input, passwordError ? styles.inputError : null]}
        />
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}

        {generalError ? (
          <Text style={styles.generalErrorText}>{generalError}</Text>
        ) : null}

        <Pressable style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate("signup")}>
          <Text style={styles.SignUpPrompt}>
            Don't have an account? <Text style={styles.linkText}>Sign Up</Text>
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F3",
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#181C2E",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#686B78",
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#181C2E",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#181C2E",
  },
  inputError: {
    borderColor: "#FF4B4B",
  },
  errorText: {
    color: "#FF4B4B",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  generalErrorText: {
    color: "#FF4B4B",
    fontSize: 14,
    textAlign: "center",
    marginTop: 16,
    fontWeight: "600",
  },
  button: {
    marginTop: 28,
    backgroundColor: "#FC8019",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  SignUpPrompt: {
    marginTop: 20,
    textAlign: "center",
    color: "#686B78",
    fontSize: 14,
  },
  linkText: {
    color: "#FC8019",
    fontWeight: "700",
  },
});
