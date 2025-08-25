const RoleModel=require("../../Model/SuperAdminModel/RoleModel")


const addRoleService = async(Loginans)=>{
    const data=  await RoleModel.addRoleModel(Loginans.Role,Loginans.id)
    return data
}

const getRoleService = async () => {
      const data = await RoleModel.getRoleModel();
      if (!data || data.length === 0) {
        return  data=[];
      }
      return data; 
};



const editRoleService=async(editans)=>{
    const data=await RoleModel.editRoleModel(editans.Role,editans.id,editans.updatedBy)
    return data;;
}

const deleteRoleService=async(id)=>{
    const data=await RoleModel.deleteRoleModel(id)
    return data;;
}


module.exports={addRoleService,getRoleService,editRoleService,deleteRoleService}

