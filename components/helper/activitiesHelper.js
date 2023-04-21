import { Colors } from "../../styles/Color";

export function getActionText(activity) {
  if (activity.action === "buy") {
    const totalPrice = (activity.price * activity.amount).toFixed(2);
    return `Bought ${activity.amount} ${activity.coinId} at $${totalPrice}`;
  } else if (activity.action === "sell") {
    const totalPrice = (activity.price * activity.amount).toFixed(2);
    return `Sold ${activity.amount} ${activity.coinId} at $${totalPrice}`;
  }
}

export function getActionColor(activity) {
  if (activity.action === "buy") {
    return Colors.buyColor;
  } else if (activity.action === "sell") {
    return Colors.sellColor;
  }
}