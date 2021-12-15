import React, { useState } from "react";
import Chart from "chart.js/auto";
import { Box, Paper } from "@mui/material";
import { Bar } from "react-chartjs-2";
import monthlyData from "./DummyData";
const BarGraph = () => {
  return (
    <>
      <Box sx={{ marginTop: 10, marginLeft: "auto", marginRight: "auto" }}>
        <Paper elevation={7} sx={{ width: 650, height: 450 }}>
          <Bar
            data={monthlyData}
            options={{
              maintainAspectRatio: false,
            }}
          />
        </Paper>
      </Box>
    </>
  );
};

export default BarGraph;
