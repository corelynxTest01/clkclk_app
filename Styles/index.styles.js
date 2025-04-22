import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  button: {
    padding: 10,
    width: "100",
    borderRadius: 0,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  footer: {
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 16,
    color: "#555",
  },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  listItemText: {
    fontSize: 16,
    color: "#333",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalBody: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    width: "48%",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
  successText: {
    color: "green",
    fontSize: 14,
    marginTop: 5,
  },
  warningText: {
    color: "orange",
    fontSize: 14,
    marginTop: 5,
  },
  infoText: {
    color: "blue",
    fontSize: 14,
    marginTop: 5,
  },
  primaryButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  secondaryButton: {
    backgroundColor: "#6c757d",
    padding: 10,
    borderRadius: 5,
  },
  successButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
  },
  dangerButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 5,
  },
  warningButton: {
    backgroundColor: "#ffc107",
    padding: 10,
    borderRadius: 5,
  },
  infoButton: {
    backgroundColor: "#17a2b8",
    padding: 10,
    borderRadius: 5,
  },
  lightButton: {
    backgroundColor: "#f8f9fa",
    padding: 10,
    borderRadius: 5,
  },
  darkButton: {
    backgroundColor: "#343a40",
    padding: 10,
    borderRadius: 5,
  },
  linkButton: {
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 5,
  },
  linkButtonText: {
    color: "#007BFF",
    fontSize: 16,
    textAlign: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  disabledButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  activeButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  activeButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  inactiveButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  inactiveButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  loadingButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  loadingButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  spinner: {
    margin: 10,
  },
  spinnerText: {
    fontSize: 16,
    color: "#333",
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  spinnerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  spinnerOverlayText: {
    fontSize: 16,
    color: "#fff",
    marginTop: 10,
  },
  spinnerOverlayIcon: {
    fontSize: 50,
    color: "#fff",
  },
  spinnerOverlayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  spinnerOverlayIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  spinnerOverlayTextContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  spinnerOverlayTextIcon: {
    fontSize: 50,
    color: "#fff",
  },

  /**Text Default Colors**/
  textGreen: {
    color: "#459A00",
  },
  textBlue: {
    color: "#00679F",
  },
  textOrange: {
    color: "#F68832",
  },

  /**Button Default Colors**/
  btnBlue: {
    backgroundColor: "#00679F",
  },
  btnGreen: {
    backgroundColor: "#459A00",
  },
  btnOrange: {
    backgroundColor: "#F68832",
  },

  BoldFont: {
    fontWeight: "bold",
  },
  LightFont: {
    fontWeight: "300",
  },
  RegularFont: {
    fontWeight: "400",
  },
  SemiBoldFont: {
    fontWeight: "600",
  },
  ExtraBoldFont: {
    fontWeight: "800",
  },

  /**Font Family**/
  InterFont: {
    fontFamily: "Inter",
  },
  RobotoFont: {
    fontFamily: "Roboto",
  },
  MontserratFont: {
    fontFamily: "Montserrat",
  },
  PoppinsFont: {
    fontFamily: "Poppins",
  },
  LatoFont: {
    fontFamily: "Lato",
  },
  OpenSansFont: {
    fontFamily: "Open Sans",
  },

  /**Font Sizes**/
  FontSize16: {
    fontSize: 16,
  },
  FontSize18: {
    fontSize: 18,
  },
  FontSize20: {
    fontSize: 20,
  },
  FontSize22: {
    fontSize: 22,
  },
  FontSize24: {
    fontSize: 24,
  },
  FontSize26: {
    fontSize: 26,
  },
});
export default Styles;
// This is a simple StyleSheet for a React Native application using Expo.
