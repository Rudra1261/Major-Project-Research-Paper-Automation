const year = "2020";
const data = [65, 59, 80, 81, 56, 73, 53, 25, 11, 13, 91, 69, 45];
const monthlyData = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      label: `Year- ${year}`,
      backgroundColor: "rgba(75,192,192,1)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 2,
      data,
    },
  ],
};

export default monthlyData;
