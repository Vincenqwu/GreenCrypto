import { StyleSheet } from "react-native";
import { Colors } from "./Color";

export const colors = {
  bgColor: "#3795BD",
  highlight: "#FDFF00",
  inactive: "#BDCDD6",
  barColor: "#5B8FB9",
  lightBg: "#ECF9FF",
  navy: "#00337C",
  lightText: "#ECF2FF",
  btnColor: "#569DAA",
};

const styles = StyleSheet.create({
  profileContainer: {
    marginTop: 50,
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
    justifyContent: "center",
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
    marginBottom: 6,
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
    width: "65%",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  button: {
    backgroundColor: Colors.buttonColor,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  btnText: {
    color: colors.lightText,
    fontSize: 18,
    fontWeight: "bold",
  },
  camera: {
    marginHorizontal: 10,
  },
  editLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 1,
  },
  locateMe: {
    marginLeft: 5,
    color: colors.btnColor,
    textDecorationLine: "underline",
  },
});

export default styles;
