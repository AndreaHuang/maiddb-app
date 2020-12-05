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
            cantonese:0,
            english:0,
            mandarin:0,
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
      
        dutyPreference:[],
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