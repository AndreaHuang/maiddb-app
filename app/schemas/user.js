export const initialScheme={
    role:"",
    displayName:"",
    email:"",
    uid:"",
    providerId:"",      
    photoURL:"",
    isAnonymous:false,
    createdAt: "",
    lastLoginAt:"",
    emailVerified:false,
    phoneNumber:"",
}
export const profileIsNotCompleted = (user)=>{

       if (!user.role) return true;
       if (!user.displayName) return true;
       return false;
}