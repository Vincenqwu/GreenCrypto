import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  userIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: "auto",
  },
  editButton: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  body: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
    padding: 10,
  },
  saveButton: {
    color: "#007AFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default styles;
