import { useState, useCallback } from "react";
import { useRouter } from "expo-router";
import COLORS from "../../constants/colors";
import debounce from "lodash/debounce";
import styles from "../../Styles/login.styles";
import { ActivityIndicator } from "react-native";
import Input from "../../Elements/input";
import Select from "../../Elements/select";
import config from "../../constants/config";
import { axios } from "../../Utils";
import {
  Platform,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";

const initialState = {
  firstName: "",
  lastName: "",
  birthDate: "",
  gender: "",
  zip: "",
  phone: [""],
  email: [""],
  password: "",
  deleted: 0,
  status: "Active",
  country: "United States",
  editBirthDate: false,
};

const emailRegExp = new RegExp(
  /^([^\s@]+@[^\s@]+\.[^\s@!+%^?&#<>=`~{\\[+}|"'"\]$*():;/-]+)*$/
);
const phoneRegExp = new RegExp(/^[0-9\b]+$/);

export default function SignUp() {
  const Router = useRouter();
  const [member, setMember] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    phoneCheckErr: false,
    emailCheckErr: false,
    emailErr: false,
    phoneErr: false,
  });

  const handleInput = (name, value) => {
    setMember((prev) => ({ ...prev, [name]: value }));
  };

  const searchUniqueMatch = useCallback(
    debounce(async ({ url, errName, type }) => {
      let duplicateVal = false;
      setState({ [errName]: false, apiError: false, [type]: false });
      try {
        const { data = null } = await axios.get(url);
        if (data?.success && data?.data?.length > 0) duplicateVal = true;
        else duplicateVal = false;
        setState((prev) => ({ ...prev, [errName]: duplicateVal }));
      } catch (error) {
        setState((prev) => ({ ...prev, apiError: true }));
      }
    }, 1000),
    []
  );

  const handleCustomfield = (name, value) => {
    let field = value.trim();

    if (name === "email") {
      field = field.toLowerCase();
      if (emailRegExp.test(field)) {
        !!field &&
          searchUniqueMatch({
            url: `/members/check?email=${field}`,
            errName: "emailCheckErr",
            type: "emailErr",
          });
      } else
        setState((prev) => ({ ...prev, emailErr: true, emailCheckErr: false }));
    } else if (name === "phone") {
      // phone case
      field = field.replace(/[^\d]/g, "");
      if (phoneRegExp.test(field)) {
        field?.length < 11 &&
          searchUniqueMatch({
            url: `/members/check?phone=${field}`,
            errName: "phoneCheckErr",
            type: "phoneErr",
          });
      } else
        setState((prev) => ({ ...prev, phoneErr: true, phoneCheckErr: false }));
    }
    setMember((prev) => ({ ...prev, [name]: [field] }));
  };

  const handleSubmit = () => {
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
        <View style={styles.card}>
          <View style={styles.formContainer}>
            <Input
              name="firstName"
              isRequired={true}
              style={styles.input}
              keyboardType="number-pad"
              handleChange={handleInput}
              placeholderTxt="First Name"
              value={member.firstName}
            />
            <Input
              name="lastName"
              isRequired={true}
              style={styles.input}
              handleChange={handleInput}
              placeholderTxt="Last Name"
              value={member.lastName}
            />
            <Input
              name="phone"
              maxLength={12}
              isRequired={true}
              style={styles.input}
              keyboardType="number-pad"
              handleChange={handleCustomfield}
              placeholderTxt="mobile"
              value={member.phone[0]?.replace(
                /(\d{3})(\d{3})(\d{4})/,
                "$1-$2-$3"
              )}
              errMsg={"This phone number is already in use"}
              isErr={state.phoneCheckErr}
            />
            <Input
              name="email"
              isRequired={true}
              style={styles.input}
              handleChange={handleCustomfield}
              placeholderTxt="email"
              value={member.email[0]}
              errMsg={"This email is already in use"}
              isErr={state.emailCheckErr}
            />
            <Select
              name="gender"
              label="gender"
              value={member.gender}
              options={config.genderOptions}
              handleChange={(value) => handleInput("gender", value)}
              placeholder="Select gender"
              isRequired={true}
            />
            <Input
              name="password"
              maxLength={25}
              isRequired={true}
              style={styles.input}
              handleChange={handleInput}
              placeholderTxt="password"
              value={member.password}
              isSecure={true}
            />
            <TouchableOpacity
              onPress={handleSubmit}
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