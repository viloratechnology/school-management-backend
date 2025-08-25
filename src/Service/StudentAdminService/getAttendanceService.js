const AttendanceModel=require("../../Model/StudentAdminModal/getAttendenceModel")


const getAttendanceService = async (id) => {
 
    const getdata = await AttendanceModel.getAttendanceModel(id);
    if (!getdata || getdata.length === 0) {
      return { getdata: [], datevalue: null };
    }

    const monthData = {};

    getdata.forEach(item => {
      const date = new Date(item.DateOfAtt);
      const month = date.toLocaleString('default', { month: 'long' }); // Example: "June"
      const year = date.getFullYear(); // Example: 2025
      const monthKey = `${month}-${year}`; // Unique key for the month

      if (!monthData[monthKey]) {
        monthData[monthKey] = {
          monthName: month,
          year: year,
          totalDays: 0,
          absent: 0,
          details: [],
        };
      }

      if (item.FORENOON === 1 && item.AFTERNOON === 1) {
        monthData[monthKey].totalDays += 1;
      } else if (item.FORENOON === 1 || item.AFTERNOON === 1) {
        monthData[monthKey].totalDays += 0.5;
      } else {
        monthData[monthKey].absent += 1;
      }

      monthData[monthKey].details.push(item);
    });

    return Object.values(monthData);

};

module.exports = { getAttendanceService };

// const AttendanceModel = require("../../Model/StudentAdminModal/getAttendenceModel");

// const getAttendanceService = async (id) => {
//   try {
//     const getdata = await AttendanceModel.getAttendanceModel(id);

//     // Get current year
//     const currentYear = new Date().getFullYear();

//     // Prepare list of all months
//     const allMonthsList = Array.from({ length: 12 }, (_, index) => {
//       const date = new Date(currentYear, index, 1);
//       return date.toLocaleDateString('default', { month: 'long', year: 'numeric' });
//     });

//     const monthData = {};

//     // Process existing attendance data
//     getdata.forEach(item => {
//       const date = new Date(item.DateOfAtt);
//       const monthKey = date.toLocaleDateString('default', { month: 'long', year: 'numeric' });

//       if (!monthData[monthKey]) {
//         monthData[monthKey] = {
//           monthName: monthKey,
//           totalDays: 0,
//           absent: 0,
//           details: [],
//         };
//       }

//       if (item.FORENOON === 1 && item.AFTERNOON === 1) {
//         monthData[monthKey].totalDays += 1;
//       } else if (item.FORENOON === 1 || item.AFTERNOON === 1) {
//         monthData[monthKey].totalDays += 0.5;
//       } else {
//         monthData[monthKey].absent += 1;
//       }

//       monthData[monthKey].details.push(item);
//     });

//     // Fill months with no data
//     const finalData = allMonthsList.map(month => {
//       if (monthData[month]) {
//         return monthData[month];
//       } else {
//         return {
//           monthName: month,
//           totalDays: 0,
//           absent: 0,
//           details: [],
//         };
//       }
//     });

//     // Sort months in descending order (latest first)
//     finalData.sort((a, b) => {
//       const [monthA, yearA] = a.monthName.split(' ');
//       const [monthB, yearB] = b.monthName.split(' ');
//       return new Date(`${monthB} 1, ${yearB}`) - new Date(`${monthA} 1, ${yearA}`);
//     });

//     return finalData;
//   } catch (error) {
//     console.error("Error in getAttendanceService:", error);
//     throw error;
//   }
// };

// module.exports = { getAttendanceService };
