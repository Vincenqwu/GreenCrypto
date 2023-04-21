import React from "react";
import { LineChart } from "react-native-wagmi-charts";
import { Dimensions, StyleSheet } from "react-native";

export default function ChartView({ data, color }) {
  const screenWidth = Dimensions.get("window").width;
  return (
    <LineChart.Provider
      data={data.map(([timestamp, value]) => ({ timestamp, value }))}
    >
      <LineChart height={screenWidth / 1.6} width={screenWidth}>
        <LineChart.Path color={color}>
          <LineChart.Gradient color={color} />
        </LineChart.Path>
        <LineChart.CursorLine color={color} />
        <LineChart.CursorCrosshair>
          <LineChart.Tooltip textStyle={styles.lineChart} />
          <LineChart.Tooltip position="bottom">
            <LineChart.DatetimeText />
          </LineChart.Tooltip>
        </LineChart.CursorCrosshair>
      </LineChart>
    </LineChart.Provider>
  )
};

const styles = StyleSheet.create({
  lineChart: {
    backgroundColor: "black",
    borderRadius: 4,
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    padding: 4,
  },
});

