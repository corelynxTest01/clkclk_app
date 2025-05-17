import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { Image } from "react-native";
import COLORS from "../../constants/colors";
import styles from "../../Styles/login.styles";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";
import {
    Platform,
    Text,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    TextInput,
} from "react-native";

const initialState = { phone: "" };

export default function Login() {
    const Router = useRouter();
    const [state, setState] = useState(initialState);
    const [errMsg, setErrMsg] = useState("");
    const [showIcon, setShowIcon] = useState("mail-outline");
    const [isLoading, setIsLoading] = useState(false);

    const setFormValue = (name, value) => {
        if (/^[0-9]+$/.test(value)) setShowIcon("call-outline");
        else if (/^(?=.*[0-9])(?=.*[^0-9]).+$/.test(value)) setShowIcon("mail-outline");
        setState((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        return () => {
            setState(initialState);
            setErrMsg(null);
            setShowIcon("mail-outline");
            setIsLoading(false);
        }
    }, []);

    const handleLogin = async () => {
        setIsLoading(true);
        try {
        } catch (error) {
            console.log("Error in Forgot password:", error);
            setErrMsg(error?.response?.data?.message);
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
                        source={require("../../assets/images/clkclk.png")}
                        style={styles.illustrationImage}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.card}>
                    <View style={styles.formContainer}>
                        {/* mobile or email */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Mobile</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons
                                    name={showIcon}
                                    size={20}
                                    color={COLORS.primary}
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="enter email or mobile#"
                                    placeholderTextColor={COLORS.placeholderText}
                                    value={state.phone}
                                    onChangeText={(value) => setFormValue("phone", value)}
                                />
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
                                <Text style={styles.buttonText}>Submit</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}