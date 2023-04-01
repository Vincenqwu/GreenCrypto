import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  profileContainer: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  card: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  userIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
  },
  body: {
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    width: 100,
  },
  value: {
    fontSize: 16,
    flex: 1,
  },
  input: {
    fontSize: 16,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 5,
  },
  saveButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "blue",
    marginTop: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    fontSize: 18,
    fontWeight: "bold",
    color: "blue",
  },
});

export default styles;
