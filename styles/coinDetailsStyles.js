import { StyleSheet } from "react-native";
import { Colors } from "./Color";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 15,
    fontWeight: "bold",
    color: Colors.headerTextColor,
  },
  headerIcon: {
    width: 28,
    height: 28,
    marginRight: 5,
  },
  nameStyle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  buyButtonStyle: {
    marginTop: 10,
    backgroundColor: Colors.buttonColor,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
    width: 120,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  sellButtonStyle: {
    marginTop: 10,
    backgroundColor: Colors.removeButtonColor,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
    width: 120,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTextStyle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  priceChange: {
    color: Colors.headerTextColor,
    fontSize: 17,
    fontWeight: "bold",
  },
  infoContainer: {
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 20,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  infoItemTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  infoItemValue: {
    fontSize: 16,
    color: Colors.coinInfoValue,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});

export default styles;
