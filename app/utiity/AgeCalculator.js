export const calculateAge =(birthDateString)=>{
    if(!birthDateString) return "";
    const birthDate = new Date(birthDateString);
    const today = new Date();

    var years = (today.getFullYear() - birthDate.getFullYear());

    if (today.getMonth() < birthDate.getMonth() || 
        today.getMonth() == birthDate.getMonth() && today.getDate() < birthDate.getDate()) {
        years--;
    }

    return years;        
 }