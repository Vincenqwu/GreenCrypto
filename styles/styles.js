import { StyleSheet } from "react-native";
import { Colors } from "./Color";

const basicContainer = {
  flex: 1,
  backgroundColor: Colors.bgColor,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor,
    justifyContent: "center",
  },
  portContainer: {
    ...basicContainer,
    backgroundColor: Colors.bgColor,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    marginBottom: 20,
    width: "90%",
    alignItems: "center",
  },
  headerItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  headerValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  balanceWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  totalBalanceContainer: {
    paddingHorizontal: 18,
    marginBottom: 10,
  },
  totalBalanceLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  totalBalanceValue: {
    fontSize: 40,
    fontWeight: "bold",
    justifyContent: "flex-start",
  },
  title: {
    color: Colors.coinTextColor,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 3,
  },
  text: {
    color: Colors.coinTextColor,
    marginRight: 5,
  },
  coinContainer: {
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#282828",
    padding: 15,
  },
  coinTextColor: {
    color: Colors.coinTextColor,
  },
  rank: {
    fontWeight: "bold",
    color: Colors.coinTextColor,
  },
  rankContainer: {
    backgroundColor: "#585858",
    paddingHorizontal: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  coinIndex: {
    alignItems: "flex-end",
    marginLeft: "auto",
  },
  portfolioBtn: {
    backgroundColor: Colors.buttonColor,
    padding: 10,
    borderRadius: 10,
  },
  portfolioBtnLabel: {
    color: "white",
    fontWeight: "bold",
  },
  fundInputContainer: {
    width: "80%",
    alignSelf: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  fundInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  confirmButton: {
    backgroundColor: "green",
    padding: 10,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    backgroundColor: "#ddd",
  },
  tabLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  activeTab: {
    backgroundColor: "#f2f2f2",
  },
  list: {
    flex: 3,
  },
});

export default styles;
