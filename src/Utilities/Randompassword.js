const password=(n)=>{
    const characters="abcdefghijklmnopqrsTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    let randomPassword="";
    
        for(let i=0;i<n;i++){
             randomPassword += characters[Math.floor(Math.random()*characters.length)]
        }
 return randomPassword;   
}

module.exports={password}

