
const db = require('../../DatabaseConnection/DbConnection');

class ChatbotDataService {
  
  // Get student info from parent user ID
  async getStudentInfo(studentId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          id AS student_id, 
          name AS student_name, 
          standard_id AS standard, 
          section_id AS section
        FROM student_tbl
        WHERE id = ?
      `;
  
      db.query(query, [studentId], (err, results) => {
        if (err) reject(err);
        else resolve(results[0] || null);
      });
    });
  }
  

  // Get today's homework
  async getTodaysHomework(parentUserId) {
    try {
      const student = await this.getStudentInfo(parentUserId);
      
      if (!student) {
        return "I couldn't find your child's information. Please contact the school.";
      }

      return new Promise((resolve, reject) => {
        const today = new Date().toISOString().split('T')[0];
        
        const query = `
SELECT h.title, h.content, h.due_date
FROM homework_tbl h
WHERE h.standard_id = ? AND h.section_id = ? 
`;

        db.query(query, [student.standard, student.section], (err, results) => {
          if (err) {
            reject(err);
          } else if (results.length === 0) {
            resolve("No homework assigned for today! ");
          } else {
            let response = `📝 Today's Homework for ${student.student_name}:\n\n`;
            results.forEach((hw, index) => {
              response += `${index + 1}. ${hw.title}\n`;
              response += `   ${hw.content}\n`;
              response += `   Due: ${new Date(hw.due_date).toLocaleDateString()}\n\n`;
            });
            resolve(response);
          }
        });
      });
    } catch (error) {
      console.error('Error getting homework:', error);
      return "Sorry, I couldn't fetch today's homework. Please try again later.";
    }
  }

  async getLatestCircular(parentUserId) {
    try {
      const student = await this.getStudentInfo(parentUserId);
  
      if (!student) {
        return "I couldn't find your child's information. Please contact the school.";
      }
  
      return new Promise((resolve, reject) => {
        const circularQuery = `
          SELECT title, content, createdAt, 'Circular' AS type
          FROM student_circular_tbl
          WHERE isDeleted = 0
        `;
  
        // const eventQuery = `
        //   SELECT event AS title, '' AS content, createdAt, 'Event' AS type
        //   FROM calender_tbl
        //   WHERE isDeleted = 0
        // `;
  
        // const combinedQuery = `
        //   (${circularQuery})
        //   UNION
        //   (${eventQuery})
        //   ORDER BY createdAt DESC
        //   LIMIT 5
        // `;
  
        db.query(circularQuery, (err, results) => {
          if (err) {
            reject(err);
          } else if (results.length === 0) {
            resolve("No recent circulars or found. ");
          } else {
            let response = ` Latest Circulars for ${student.student_name}:\n\n`;
            results.forEach((item, index) => {
              response += `${index + 1}. ${item.title} (${item.type})\n`;
              if (item.content) response += `   ${item.content}\n`;
              response += `   ${new Date(item.createdAt).toLocaleDateString()}\n\n`;
            });
            resolve(response);
          }
        });
      });
    } catch (error) {
      console.error('Error getting circular:', error);
      return "Sorry, I couldn't fetch circulars and events. Please try again later.";
    }  
  }
  
  // Get today's activity
async getTodaysActivity(parentUserId) {
  console.log("🔥 Called getTodaysActivity with userId:", parentUserId);

  try {
    const student = await this.getStudentInfo(parentUserId);
    console.log("Student Info:", student);

    if (!student) {
      return "I couldn't find your child's information. Please contact the school.";
    }

    return new Promise((resolve, reject) => {
      const today = new Date().toISOString().split('T')[0];

      const query = `
        SELECT title AS activity_name, content AS description, activities_date AS activity_date
        FROM activities_tbl
        WHERE standard_id = ? AND section_id = ? AND DATE(activities_date) = ?
      `;

      db.query(query, [student.standard, student.section, today], (err, results) => {
        if (err) {
          console.error("DB Error:", err);
          return reject("Something went wrong while fetching activities.");
        }

        if (results.length === 0) {
          return resolve("No activities scheduled for today!");
        }

        let response = `Today's Activities for ${student.student_name}:\n\n`;

        results.forEach((activity, index) => {
          response += `${index + 1}. ${activity.activity_name}\n`;
          response += `   ${activity.description}\n`;
          response += `   Date: ${new Date(activity.activity_date).toLocaleDateString('en-IN')}\n\n`;
        });

        resolve(response);
      });
    });

  } catch (error) {
    console.error("Error in getTodaysActivity:", error);
    return "Something went wrong while getting today's activity.";
  }
}

  // Get attendance status
  async getAttendanceStatus(parentUserId) {
    try {
      const student = await this.getStudentInfo(parentUserId);
      
      if (!student) {
        return "I couldn't find your child's information. Please contact the school.";
      }

      return new Promise((resolve, reject) => {
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
        
        const query = `
    SELECT 
  COUNT(*) AS total_days,
  SUM(CASE WHEN FORENOON = 1 OR AFTERNOON = 1 THEN 1 ELSE 0 END) AS present_days,
  SUM(CASE WHEN FORENOON = 0 AND AFTERNOON = 0 THEN 1 ELSE 0 END) AS absent_days
FROM attendance_tbl
WHERE student_id = ?
AND MONTH(DateOfAtt) = ? 
AND YEAR(DateOfAtt) = ?
        `;
        
        db.query(query, [student.student_id, currentMonth, currentYear], (err, results) => {
          if (err) {
            reject(err);
          } else {
            const attendance = results[0];
            const attendancePercentage = attendance.total_days > 0 
              ? ((attendance.present_days / attendance.total_days) * 100).toFixed(1)
              : 0;
              const monthNames = [
                "January", "February", "March", "April", "May", "June", 
                "July", "August", "September", "October", "November", "December"
              ];
              
              const monthIndex = new Date().getMonth();
              const monthName = monthNames[monthIndex];
              console.log(monthName); // e.g. "June"
              
            let response = `Attendance Status for ${student.student_name}(Month-${monthName}):\n\n`;
            response += ` Present: ${attendance.present_days} days\n`;
            response += ` Absent: ${attendance.absent_days} days\n`;
            response += `Attendance Percentage: ${attendancePercentage}%\n\n`;
            
            if (attendancePercentage >= 95) {
              response += " Excellent attendance! Keep it up!";
            } else if (attendancePercentage >= 85) {
              response += "Good attendance, but can be improved.";
            } else {
              response += " Low attendance. Please ensure regular school attendance.";
            }
            
            resolve(response);
          }
        });
      });
    } catch (error) {
      console.error('Error getting attendance:', error);
      return "Sorry, I couldn't fetch attendance information. Please try again later.";
    }
  }

}

module.exports = new ChatbotDataService();