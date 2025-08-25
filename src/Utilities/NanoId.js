
const nanoid=(num)=>{
    const Id="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let NanoId=""
    for(let i=0;i<num;i++){
        NanoId+=Id[Math.floor(Math.random()*Id.length)]
      
    }
    return NanoId
}


module.exports={nanoid}