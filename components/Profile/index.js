import {
  View,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { axios, getToken } from "../../Utils";
import styles from "../../Styles/login.styles";
import Button from "../../Elements/button";
import Input from "../../Elements/input";
import config from "../../constants/config";
import Select from "../../Elements/select";
//import DatePickerInput from "../../Elements/dateInput";
import { useIsFocused } from "@react-navigation/native";

const InitialState = {
  firstName: "",
  lastName: "",
  phone: [""],
  email: [""],
  password: "",
  gender: "Male",
  zip: "",
  birthDate: "",
  deleted: 0,
  status: "Active",
  isPhoneVerified: false,
  isEmailVerified: false,
  altEmail: [""],
  editBirthDate: true,
};

export default function Profile() {
  const isFocused = useIsFocused();
  const [profile, setProfile] = useState(InitialState);
  const [state, setState] = useState({
    dispMessage: null,
    dispMessageFlag: false,
    dispErrMessage: null,
    dispErrMessageFlag: false,
    id: "",
    errMsgDate: false,
    errorFieldPhone: false,
    errorFieldEmail: false,
    isPhoneVerified: false,
    isEmailVerified: false,
    error: "",
    genderOption: [],
    tempNumber: [], //hold existing phone array for edit
    tempEmail: [], //hold existing email array for edit
    tempLoyalty: [],
    phoneOtp: "",
    emailOtp: "",
    verifyFlag: false,
    otpMsgErr: false,
    openOtpInput: false,
    errorFromAPI: false,
    emailOption: null,
    otherEmail: false,
    inputType: "password",
    isDatePickerOpen: false,
    loading: false,
  });

  useEffect(() => {
    if (isFocused) getProfile();
  }, [isFocused]);

  const getProfile = async (refreshToken = null) => {
    const token = await getToken("authToken");
    const headers = { Authorization: refreshToken || token };
    axios
      .get("/members/profile", headers)
      .then(async (response) => {
        let userData = response.data[0];
        const profileDto = {};
        config.memberReqFields.forEach((key) => {
          if (Object.prototype.hasOwnProperty.call(userData, key))
            profileDto[key] = userData[key];
        });
        setProfile((prev) => ({ ...prev, ...profileDto }));
        setState((prev) => ({
          ...prev,
          id: userData._id,
          tempEmail: userData.email,
          tempNumber: userData.phone,
          isPhoneVerified: userData.isPhoneVerified,
          isEmailVerified: userData.isEmailVerified,
          isDatePickerOpen: !!userData?.birthDate && !userData?.editBirthDate,
          emailOption:
            userData?.altEmail?.map((item) => ({ value: item, label: item })) ||
            [],
        }));
      })
      .catch((error) => {
        console.error("Error On Fetch Member Profile Data", error.message);
      });
  };

  const handleInput = (name, value) => {
    if (name === "email" || name === "phone") value = [value];
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const updateProfile = async () => {
    setState((prev) => ({ ...prev, loading: true }));
    setTimeout(() => {
      ToastAndroid.show("Your Profile has been updated!", ToastAndroid.SHORT);
      setState((prev) => ({ ...prev, loading: false }));
    }, 3000);
    /*if (!validateFields()) return;
    const token = await getToken("authToken");
    const updatedData = {
      ...profile,
      phone: state.tempNumber.splice(0, 1, profile.phone[0]),
      email: state.tempEmail.splice(0, 1, profile.email[0]),
      //modifiedDate: getCurrDate(),
      isPhoneVerified: state.isPhoneVerified,
      isEmailVerified: state.isEmailVerified,
      editBirthDate: false,
    };
    const editedBy = ""; //this.props.auth?.user?.accessBy;
    axios
      .put("/api/members", {
        data: updatedData,
        id: state.id,
        editedBy,
      })
      .then((res) => {
        const { token } = res.data;
        const updatedMember = JWTDecode(token);
        if (!updatedMember) return;
        getProfile(token);
      })
      .catch(() => {});*/
  };

  /*
  sendOtp = () => {
    let accessToken = getToken();
    setProfile({ errorFromAPI: false }, () => {
      axios
        .get("/api/members/getotp?phone=" + state.member.phone[0], {
          headers: { Authorization: accessToken },
        })
        .then((result) => {
          if (result.data.success) {
            setProfile({ verifyFlag: true });
          }
        })
        .catch(() => {
          setProfile({ errorFromAPI: true });
        });
    });
  };

  sendVerifyEmail = () => {
    let accessToken = getToken();

    setProfile({ errorFromAPI: false }, () => {
      axios
        .post(
          `/api/members/verification-email?email=${state.member.email[0]}`,
          {},
          {
            headers: { Authorization: accessToken },
          }
        )
        .then((result) => {
          if (result.data.success) {
            setProfile({ openOtpInput: true });
          }
        })
        .catch(() => {
          setProfile({ errorFromAPI: true });
        });
    });
  };

  errorHandler = (error) => {
    if (error.response) {
      if (error?.response?.data?.message === "invalid code") {
        setProfile({
          emailOtp: "",
          phoneOtp: "",
          otpMsgErr: true,
        });

        return;
      }

      setProfile({
        emailOtp: "",
        phoneOtp: "",
        errorFromAPI: true,
      });
    }
  };

  verifyPhone = () => {
    let accessToken = getToken();

    setProfile({ errorFromAPI: false }, () => {
      axios
        .post(
          "/api/members/verifyphone",
          { code: state.phoneOtp },
          {
            headers: { Authorization: accessToken },
          }
        )
        .then((result) => {
          if (result.data.success) {
            setProfile({
              verifyFlag: false,
              otpMsgErr: false,
              phoneOtp: "",
              isPhoneVerified: true,
            });
            this.updateProfile();
          }
        })
        .catch((err) => {
          this.errorHandler(err);
        });
    });
  };

  verifyEmail = () => {

    setProfile({ errorFromAPI: false }, () => {
      axios
        .post("/api/members/verify-email", {
          id: state.id,
          code: state.emailOtp,
        })
        .then((result) => {
          if (result.data.success) {
            setProfile({
              otpMsgErr: false,
              openOtpInput: false,
              emailOtp: "",
              isEmailVerified: true,
            });
            this.updateProfile();
          }
        })
        .catch((err) => {
          this.errorHandler(err);
        });
    });
  };

  handleCustomFields = (e) => {
    let accessToken = getToken();

    let { name, value } = e.target;
    let fields = [];
    let tempData = [];
    let error = "";
    let regExp = new RegExp(
      /^([^\s@]+@[^\s@]+\.[^\s@!+%^?&#<>=`~{\\[+}|"'"\]$*():;/-]+)*$/
    ); //new Email regex

    switch (name) {
      case "email":
        if (regExp.test(value.trim())) {
          error = "";
          axios
            .get("/api/members?email=" + value, {
              headers: { Authorization: accessToken },
            })
            .then((result) => {
              if (result.data.success) {
                if (result.data.data.length > 0) {
                  tempData = result.data.data[0];
                  if (tempData.email.includes(value)) {
                    if (tempData._id !== state.id)
                      setProfile({ errorFieldEmail: true });
                  } else setProfile({ errorFieldEmail: false });
                } else setProfile({ errorFieldEmail: false });
              }
            })
            .catch((err) => {});
        } else error = "invalid email address";

        fields.push(value);
        break;

      case "phone":
        let preTxt = value.replace(/[^\d]/g, "");
        let valid = validatePhone(preTxt);
        if (valid) {
          if (preTxt.length === 10) {
            axios
              .get("/api/members?phone=" + preTxt, {
                headers: { Authorization: accessToken },
              })
              .then((result) => {
                if (result.data.success) {
                  if (result.data.data.length > 0) {
                    tempData = result.data.data[0];
                    if (tempData.phone.includes(preTxt)) {
                      if (tempData._id !== state.id)
                        setProfile({ errorFieldPhone: true });
                    } else setProfile({ errorFieldPhone: false });
                  } else setProfile({ errorFieldPhone: false });
                }
              })
              .catch((err) => {});
          }
          fields.push(preTxt);
        } else fields.push(state.member.phone[0]);
        break;

      default:
        break;
    }

    setProfile(
      (prevState) => ({
        member: { ...prevState.member, [name]: fields },
        error: error,
      }),
      () => {
        if (name === "phone") {
          if (state.tempNumber[0] !== state.member.phone[0]) {
            setProfile((prevState) => ({
              member: { ...prevState.member },
              isPhoneVerified: false,
            }));
          } else {
            setProfile((prevState) => ({
              member: { ...prevState.member },
              isPhoneVerified: state.member.isPhoneVerified ? true : false,
            }));
          }
        } else if (name === "email") {
          if (state.tempEmail[0] !== state.member.email[0]) {
            setProfile((prevState) => ({
              member: { ...prevState.member },
              isEmailVerified: false,
            }));
          } else {
            setProfile((prevState) => ({
              member: { ...prevState.member },
              isEmailVerified: state.member.isEmailVerified ? true : false,
            }));
          }
        }
      }
    );
  };
  const getDateErr = (isErr) => {
    setState((prev) => ({ ...prev, errMsgDate: isErr }));
  };
  */

  const validateFields = () => {
    const requiredFields = config.memberReqFields;
    const isValid = requiredFields.every((key) => {
      if (!profile[key]) return false;
      return (
        profile.zip.length === 5 &&
        profile.phone[0].length === 10 &&
        profile.email[0].length > 0 &&
        profile.password.length >= 10
      );
    });

    return (
      isValid &&
      !state.error &&
      !state.verifyFlag &&
      !state.errMsgDate &&
      !state.errorFieldPhone &&
      !state.errorFieldEmail &&
      !state.openOtpInput
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ position: "relative" }}>
        <Input
          style={styles.input}
          placeholderTxt="first name"
          value={profile.firstName}
          handleChange={handleInput}
          name="firstName"
          isRequired={true}
        />
        <Input
          style={styles.input}
          placeholderTxt="last name"
          value={profile.lastName}
          handleChange={handleInput}
          name="lastName"
          isRequired={true}
        />
        <Input
          style={styles.input}
          placeholderTxt="email"
          value={profile.email[0]}
          handleChange={handleInput}
          keyboardType="email-address"
          name="email"
          isRequired={true}
        />
        <Input
          name="phone"
          maxLength={12}
          isRequired={true}
          style={styles.input}
          keyboardType="phone-pad"
          handleChange={handleInput}
          placeholderTxt="phone number"
          value={profile.phone[0]?.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}
        />
        {/* <DatePickerInput
          readOnly={false}
          name="birthDate"
          isRequired={true}
          style={styles.input}
          id="memberBirthDate"
          sendDateErr={getDateErr}
          value={profile.birthDate}
          handleChange={handleInput}
          placeholderTxt="birthday (mm/dd/yyyy)"
        /> */}
        <Select
          name="gender"
          label="gender"
          value={profile.gender}
          options={config.genderOptions}
          handleChange={(value) => handleInput("gender", value)}
          placeholder="Select gender"
          isRequired={true}
        />
        <Input
          name="zip"
          style={styles.input}
          placeholderTxt="zip code"
          value={profile.zip}
          handleChange={handleInput}
          maxLength={5}
          isRequired={true}
        />
        <Input
          style={styles.input}
          name="password"
          placeholderTxt="password"
          value={profile.password}
          handleChange={handleInput}
          isRequired={true}
          isSecure={true}
        />
        <Button
          label="SUBMIT"
          handleSubmit={updateProfile}
          isLoading={state.loading}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
