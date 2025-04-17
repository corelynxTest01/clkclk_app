import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { Image } from "react-native";
import COLORS from "../../constants/colors";
import styles from "../../Styles/login.styles";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";
import loginImage from "../../assets/images/login.png";
import {
  Platform,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { axios, setToken, getToken } from "../../Utils";
import config from "../../constants/config";

const initialState = {
  forceLogin: true,
  password: "1111111111",
  phone: "9564621375",
};

export default function Login() {
  const Router = useRouter();
  const [state, setState] = useState(initialState);
  const [showPwd, setShowPwd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const setFormValue = (name, value) => {
    setState((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    async () => {
      const authToken = await getToken("authToken");
      if (!!authToken) Router.push(config.member_redirect_after_login);
    };
  }, []);

  const handleLogin = () => {
    setIsLoading(true);
    axios.post("/members/login/", state).then(async (res) => {
      if (res.data.success) {
        const { token } = res.data;
        await setToken("authToken", token);
        setState(initialState);
        setTimeout(() => {
          Router.push(config.member_redirect_after_login);
          setIsLoading(false);
        }, 3000);
      }
    });
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={styles.illustrationImage}>
          <Image
            source={loginImage}
            style={styles.illustrationImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.card}>
          <View style={styles.formContainer}>
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
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have and account </Text>
              <TouchableOpacity onPress={() => Router.push("/signup")}>
                <Text style={styles.link}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
