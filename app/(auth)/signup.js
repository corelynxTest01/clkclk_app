import { useState } from "react";
// import { Image } from "react-native";
import { useRouter } from "expo-router";
import COLORS from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../Styles/login.styles";
import { ActivityIndicator } from "react-native";
// import signUpImage from "../../assets/images/SignUp.png";
import {
  Platform,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
};

export default function SignUp() {
  const Router = useRouter();
  const [state, setState] = useState(initialState);
  const [showPwd, setShowPwd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const setFormValue = (name, value) => {
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    setIsLoading(!isLoading);
    setTimeout(() => {
      setIsLoading(false);
      Router.push("/login");
    }, 3000);
    setState(initialState);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        {/* <View style={styles.illustrationImage}>
          <Image source={signUpImage} style={styles.illustrationImage} resizeMode="contain"/>
        </View> */}
        <View style={styles.card}>
          <View style={styles.formContainer}>
            {/* email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>First Name</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="text"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your First name"
                  placeholderTextColor={COLORS.placeholderText}
                  value={state.firstName}
                  onChangeText={(value) => setFormValue("firstName", value)}
                  keyboardType="email-address"
                />
              </View>
            </View>
            {/* email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Last Name</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="text"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your Lat Name"
                  placeholderTextColor={COLORS.placeholderText}
                  value={state.lastName}
                  onChangeText={(value) => setFormValue("lastName", value)}
                  keyboardType="email-address"
                />
              </View>
            </View>

            {/* email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mobile</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your Email Address"
                  placeholderTextColor={COLORS.placeholderText}
                  value={state.email}
                  onChangeText={(value) => setFormValue("email", value)}
                  keyboardType="email-address"
                />
              </View>
            </View>

            {/* mobile */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mobile</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="call-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your mobile number"
                  placeholderTextColor={COLORS.placeholderText}
                  value={state.phone}
                  onChangeText={(value) => setFormValue("phone", value)}
                  keyboardType="number-pad"
                  maxLength={10}
                />
              </View>
            </View>

            {/* password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor={COLORS.placeholderText}
                  value={state.password}
                  onChangeText={(value) => setFormValue("password", value)}
                  keyboardType="default"
                  secureTextEntry={!showPwd}
                  maxLength={25}
                />
                <TouchableOpacity
                  onPress={() => setShowPwd(!showPwd)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showPwd ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleLogin}
              style={styles.button}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.white} />
              ) : (
                <Text style={styles.buttonText}>Sign Up</Text>
              )}
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already has a account </Text>

              <TouchableOpacity onPress={() => Router.push("/login")}>
                <Text style={styles.link}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
