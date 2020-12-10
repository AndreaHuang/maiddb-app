import active from "./active.env"
const envs ={
    dev:{
        API_URL:"http://192.168.8.103:3001",
        PUSH_API:"https://exp.host/--/api/v2"
     },
    prod:{
        API_URL:"https://api-dot-maiddb.df.r.appspot.com",
        PUSH_API:"https://exp.host/--/api/v2"
    }
};

export default envs[active];