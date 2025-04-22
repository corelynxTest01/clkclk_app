import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import COLORS from "../constants/colors";

export default Button = ({
  label,
  handleSubmit,
  isLoading = false,
  ...rest
}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={handleSubmit}
        style={styles.button}
        disabled={isLoading}
        {...rest}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.white} />
        ) : (
          <Text style={styles.buttonStyle}>{label}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

// Add this style to the inputStyle
const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
