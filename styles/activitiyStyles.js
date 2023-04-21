import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  actionContainer: {
    justifyContent: 'space-between',
    marginLeft: 45,
  },
  actionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timestampText: {
    marginTop: 5,
    fontSize: 14,
    color: '#999',
  },
  labelText: {
    width: 80,
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  contentText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  userIcon: {
    width: 35,
    height: 35,
    borderRadius: 25,
    marginRight: 10,
  },
  emailName: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 14,
    color: "#999",
  },
});

export default styles;