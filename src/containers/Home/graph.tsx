// import { Bar } from "react-chartjs-2";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store";
// import { NewCar as NewCarType } from "../../../types";

// const NewCarBarChart: React.FC = () => {
//   const newCarData = useSelector(
//     (state: RootState) => state.newCar.newCarsData as NewCarType[]
//   );

//   const newCarStatusData = {
//     labels: ["Available", "Pending", "Sold Out"],
//     datasets: [
//       {
//         label: "New Cars",
//         data: [
//           newCarData.filter((item) => item.status === 1).length,
//           newCarData.filter((item) => item.status === 0).length,
//           newCarData.filter((item) => item.status === -1).length,
//         ],
//         backgroundColor: ["green", "yellow", "red"],
//       },
//     ],
//   };

//   return (
//     <div className="bg-white shadow-xl px-6 py-8">
//       <Bar
//         data={newCarStatusData}
//         options={{
//           responsive: true,
//           scales: { x: { stacked: true }, y: { stacked: true } },
//         }}
//       />
//     </div>
//   );
// };

// export default NewCarBarChart;
