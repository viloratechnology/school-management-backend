const AdminroleModel=require("../../Model/SuperAdminModel/SuperAdminModel")
const bcrypt=require('bcrypt')
const {nanoid}=require('../../Utilities/NanoId')
const {password}=require("../../Utilities/Randompassword")

const addSuperAdminService = async(Loginans)=>{
   const id= nanoid(10)
   const Randompassword=password(8) 
   const hashedPassword=await bcrypt.hash(Randompassword,2)
    const getdata=AdminroleModel.addSuperAdminModel(id,Loginans.name,Loginans.email,hashedPassword)
    return {Randompassword,getdata};


}

const getSuperAdminService = async (id) => {
      const data = await AdminroleModel.getSuperAdminModel(id);
      return data;
}




module.exports={addSuperAdminService,getSuperAdminService}

