import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import useUserContext from "../hooks/useContext.hook";

const SignUp = () => {
  const navigation = useNavigation<any>();
  const { setName, setEmail, setPassword } = useUserContext();

  const [name, set_Name] = useState("");
  const [email, set_Email] = useState("");
  const [password, set_Password] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = () => {
    setNameError("");
    setEmailError("");
    setPasswordError("");

    let hasError = false;

    if (name.trim() === "") {
      setNameError("Name is required");
      hasError = true;
    }

    if (email.trim() === "") {
      setEmailError("Email is required");
      hasError = true;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        setEmailError("Enter a valid email");
        hasError = true;
      }
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      hasError = true;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      hasError = true;
    }

    if (hasError) return;

    setName(name);
    setEmail(email);
    setPassword(password);

    navigation.goBack();
  };

  const handleSignIn = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollGrow}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop" }}
            style={styles.headerImage}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay} />
        </View>

        <View style={styles.contentCard}>
          <View>
            <View style={styles.headerTextContainer}>
              <Text style={styles.title}>Getting Started</Text>
              <Text style={styles.subtitle}>Create an account to continue your food journey.</Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>FULL NAME</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  placeholderTextColor="#A0A5BA"
                  value={name}
                  onChangeText={(text) => {
                    set_Name(text);
                    setNameError("");
                  }}
                />
                {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>EMAIL ADDRESS</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#A0A5BA"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={(text) => {
                    set_Email(text);
                    setEmailError("");
                  }}
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>PASSWORD</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Enter your password"
                    placeholderTextColor="#A0A5BA"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={(text) => {
                      set_Password(text);
                      setPasswordError("");
                    }}
                  />
                  <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                    <Text style={styles.eyeText}>{showPassword ? "HIDE" : "SHOW"}</Text>
                  </Pressable>
                </View>
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
              </View>
            </View>
          </View>

          <View style={styles.bottomActions}>
            <Pressable
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
              onPress={handleSignUp}
            >
              <Text style={styles.buttonText}>SIGN UP</Text>
            </Pressable>

            <View style={styles.signinContainer}>
              <Text style={styles.signinText}>Already have an account? </Text>
              <Pressable onPress={handleSignIn}>
                <Text style={styles.signinLink}>Login</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollGrow: {
    flexGrow: 1,
  },
  imageContainer: {
    width: "100%",
    flex: 1,
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  contentCard: {
    backgroundColor: "#FFFFFF",
    marginTop: -40,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  headerTextContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#181C2E",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: "#A0A5BA",
    lineHeight: 22,
  },
  formContainer: {
    width: "100%",
  },
  inputWrapper: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#32343E",
    marginBottom: 8,
    letterSpacing: 1,
  },
  input: {
    height: 56,
    backgroundColor: "#F0F5FA",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#32343E",
    fontWeight: "500",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F5FA",
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
  },
  passwordInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: "#32343E",
    fontWeight: "500",
  },
  eyeBtn: {
    paddingLeft: 10,
    paddingVertical: 10,
  },
  eyeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FC8019",
    letterSpacing: 0.5,
  },
  errorText: {
    color: "#E43B4F",
    fontSize: 13,
    fontWeight: "500",
    marginTop: 6,
  },
  bottomActions: {
    marginTop: 32,
  },
  button: {
    backgroundColor: "#FC8019",
    borderRadius: 14,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FC8019",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonPressed: {
    backgroundColor: "#E36B00",
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  signinContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  signinText: {
    fontSize: 15,
    color: "#A0A5BA",
  },
  signinLink: {
    fontSize: 15,
    color: "#FC8019",
    fontWeight: "700",
  },
});
