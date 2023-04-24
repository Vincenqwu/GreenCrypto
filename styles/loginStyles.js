import { StyleSheet } from "react-native";
import { Colors } from "./Color";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
    fontSize: 18,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  error: {
    backgroundColor: Colors.errorColor,
    padding: 10,
    width: "100%",
  },
  errorText: {
    color: Colors.bgColor,
    fontWeight: "bold",
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    alignSelf: "center",
  },
});

export default styles;
