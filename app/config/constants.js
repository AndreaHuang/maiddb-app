export default{
    route:{
        stack:{
            common:"Common",
            maid:"Maid",
            employer:"Employer",
            admin:"Admin"
        },
        auth:{
            registration:"Registration",
            login:"Login",
            resetPassword:"ResetPassword",
        },
        admin:{
            manageMaidList:"ManageMaidList",
            manageMaid:"manageMaid"
        },
        common:{
            inbox:"inbox",
            settings:"settings",
            accountInfo:"accountInfo",
            accountInitialization:"accountInitialization",
        },
        employer:{
            maidList:"maidList",
            maidDetails:"maidDetails",
            maidProfileDetails:"maidProfileDetails",
            maidRating:"maidRating",
            favoriteMaidList:"favoriteMaidList",
        },
        maid:{
            maidProfile:"MaidProfile",
            editMaidProfile:"EditMaidProfile",
            editMaidProfileBasicInfo:"editMaidProfileBasicInfo",
            editWorkHistory:"editWorkHistory",
            editImage:"editImage",
        } 
       
    },
    cache:{
        maidProfile:"maidProfile",
        favoriteMaidList:"favoriteMaidList",
        user:"user"
    }
   

}