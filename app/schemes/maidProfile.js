const initialScheme={
        basicInfo:{
            name:"",
            nationality:"",
            birthday:"",
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
        experience:
            [{
                location:"",
                from:"",
                to:"",
                peopleToTakecase:[],
                duties:[],
                employer:"",
                details:"",
                reasonOfLeaving:""
            }],
        training:[], 
    }

    export default {
        initialScheme
    }