const initialScheme={
        basicInfo:{
            name:"",
            nationality:"",
            birthdate:"",
            religion:"",
            height:"",
            weight:"",
            education:"",
            gender:"f",
            heightUnit:"cm",
            weightUnit:"kg",
            eatPork:"false",
            cantonese:"",
            english:"",
            mandarin:"",
            currentLocation:""


        },
        family:{
            brothers:0,
            sisters:0,
            marriageStatus:"",
            boys:[],
            girls:[]
        },
        language:{
            cantonese:"",
            english:"",
            mandarin:""
        },
        preference:{
            eatPork:false,
            dutyPreference:[]
        },
        workHistory:[],
        training:[], 
    }
const workHistoryInitialScheme ={
    startDate:"",
    endDate:"",
    isCurrentJob:false,
    location:"",
    duties:[],
    reasongOfLeaving:""
}

    export default {
        initialScheme,
        workHistoryInitialScheme
    }