import { View, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { axios, getToken, securityCheck } from "../../Utils";
import styles from "../../Styles/login.styles";
import Button from "../../Elements/button";
import Input from "../../Elements/input";
import config from "../../constants/config";
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
  const navigation = useNavigation();
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
  });

  useEffect(() => {
    if (isFocused) getProfile();
  }, [isFocused]);

  const getProfile = async (refreshToken = null) => {
    securityCheck(navigation); //logout if token expire
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
    if (!validateFields()) return;
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
    /*axios
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
    //securityCheck();
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
    //securityCheck();
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
    //securityCheck();

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
    //securityCheck();

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
    //securityCheck();

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

  

  getDateErr = (isErr) => {
    setState({ errMsgDate: isErr });
  };*/

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
          style={styles.input}
          placeholderTxt="phone number"
          value={profile.phone[0]}
          handleChange={handleInput}
          keyboardType="phone-pad"
          name="phone"
          isRequired={true}
        />
        <Input
          name="gender"
          style={styles.input}
          placeholderTxt="gender"
          value={profile.gender}
          handleChange={handleInput}
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
        <Button label="Submit" handleSubmit={updateProfile} />
      </View>
    </KeyboardAvoidingView>
  );
}
