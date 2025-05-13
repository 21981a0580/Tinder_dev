const validator=require('validator');

const validateSignUpData =(data)=>{
    const{firstName,lastName,emailId,password}=data;
    if(!firstName || !lastName){
        throw new Error("Name is not valid");
    }
    if(firstName.length<4 && firstName.length>50){
        throw new Error("enter a valid name with min length 8")
    }
    if(!validator.isEmail(emailId)){
        throw new Error("Email is Not valid");
    }
    if(!validator.isStrongPassword(password))
    {
        throw new Error("Please enter a strong password");
    }
};

module.exports={
    validateSignUpData,
}