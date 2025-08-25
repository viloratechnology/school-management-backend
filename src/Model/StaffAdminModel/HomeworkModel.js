const DatabaseConnection=require("../../DatabaseConnection/DbConnection")

const AddHomeworkModel=(id,content,title,standard_id,section_id,PhotoName,PhotoPath,createdBy,duedate)=>{

    return new Promise((resolve,reject)=>{
        const query=`Insert into homework_tbl(id,content,title,standard_id,section_id,PhotoName,PhotoPath,createdBy,due_date) values(?,?,?,?,?,?,?,?,?)`;
        DatabaseConnection.query(query,[id,content,title,standard_id,section_id,PhotoName,PhotoPath,createdBy,duedate],(error)=>{
            if(error){
                reject(error)
            }
            resolve("ok")
        })
    })

}

const getHomeworkModel=()=>{
    return new Promise((resolve,reject)=>{
        const query=`
        select homework_tbl.id,homework_tbl.content,homework_tbl.homework_date,homework_tbl.title,standard_tbl.name as std,section_tbl.name as section,homework_tbl.due_date
        from homework_tbl
        join standard_tbl
        on homework_tbl.standard_id=standard_tbl.id
        join section_tbl
        on homework_tbl.section_id=section_tbl.id
        `
        DatabaseConnection.query(query,(error,result)=>{
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}
const editHomeworkModel = (id, content, title, standard_id, section_id, PhotoName, PhotoPath, duedate) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE homework_tbl SET content=?, title=?, standard_id=?, section_id=?, PhotoName=?, PhotoPath=?, due_date=? WHERE id=?`;
    DatabaseConnection.query(query, [content, title, standard_id, section_id, PhotoName, PhotoPath, duedate, id], (error) => {
      if (error) {
        reject(error);
      }
      resolve("editHomework");
    });
  });
};



module.exports={AddHomeworkModel,getHomeworkModel,editHomeworkModel};
