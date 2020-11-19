import active from "./active.env"
const envs ={
    dev:{
        API_URL:"http://192.168.8.103:3001"
    },
    prod:{
        API_URL:"https://api-dot-maiddb.df.r.appspot.com"
    }
};

export default envs[active];