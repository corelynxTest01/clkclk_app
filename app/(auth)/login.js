import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { Image } from "react-native";
import COLORS from "../../constants/colors";
import styles from "../../Styles/login.styles";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";
import loginImage from "../../assets/images/login.png";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../Redux/Reducer/authReducer";
import language from "../../Language";
import {
  Platform,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { axios, setToken, getToken, getContacts } from "../../Utils";
import config from "../../constants/config";

const initialState = {
  phone: "",
  password: "",
  forceLogin: false,
};

const initialErrState = {
  type: "",
  message: "",
}

export default function Login() {
  const Router = useRouter();
  const dispatch = useDispatch();
  const { setAccessToken } = authActions;
  const auth = useSelector(({ auth }) => auth);
  const [errObj, setErrObj] = useState(initialErrState);
  const [state, setState] = useState(initialState);
  const [showPwd, setShowPwd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const setFormValue = (name, value) => {
    setState((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    (async () => {
      const authToken = await getToken("authToken");
      if (!!authToken && auth.accesToken) return Router.push(config.member_redirect_after_login);
      const data = await getContacts();
      if (data.length > 0) setState((prev) => ({ ...prev, phone: auth.loginNo, password: "1111111111" }));
    })();
    return () => {
      setState(initialState);
      setErrObj(initialErrState);
    }
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      let loginObj = state;
      loginObj["forceLogin"] = !!(errObj?.type === "alreadyLogin");
      const responce = await axios.post("/members/login", loginObj);
      const { success, token } = responce?.data || {};
      if (success && token) {
        setIsLoading(false);
        setState(initialState);
        dispatch(setAccessToken(token));
        await setToken("authToken", token);
        Router.push(config.member_redirect_after_login);
      }
    } catch (error) {
      setErrObj(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
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

            {(errObj?.type !== "alreadyLogin") &&
              <View style={styles.forgotPassword}>
                <TouchableOpacity
                  onPress={() => Router.push("/pwdReset")}
                >
                  <Text style={styles.forgotPasswordText}>forgot password?</Text>
                </TouchableOpacity>
              </View>
            }

            {(errObj?.type === "alreadyLogin") &&
              <View style={styles.err}>
                <Text style={styles.errTxt}>{errObj?.message} {language.forceLogin}</Text>
              </View>
            }

            {(errObj?.type !== "alreadyLogin") && errObj?.message &&
              <View style={styles.err}>
                <Text style={styles.errTxt}>{errObj?.message}</Text>
              </View>
            }

            <TouchableOpacity
              onPress={handleLogin}
              style={styles.button}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.white} />
              ) : (
                <Text style={styles.buttonText}>{(errObj?.type === "alreadyLogin") ? "Proceed" : "Login"}</Text>
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