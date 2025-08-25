const DatabaseConnection = require("../../DatabaseConnection/DbConnection");

const addCalenderModel = (date, event) => {
  return new Promise((resolve, reject) => {
    const query = `Insert into calender_tbl(event_date,event) values(?,?)`;
    DatabaseConnection.query(query, [date, event], (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};
const getCalenderModel = () => {
  return new Promise((resolve, reject) => {
    const query = `
        select id,event,event_date from calender_tbl;`;

    DatabaseConnection.query(query, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

module.exports = { addCalenderModel, getCalenderModel };
