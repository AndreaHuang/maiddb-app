import active from "./active.env"
export const googleAuthConfig={
  dev:{
    behavior:"web",
    iosClientId: "621363690446-nfh9q1gvr7q443mklkm2nk87f1cglgnv.apps.googleusercontent.com",
    androidClientId: "621363690446-96m19r7oorj8u0g3ki5djg530hsh3957.apps.googleusercontent.com",
    //   iosStandaloneAppClientId: `<YOUR_IOS_CLIENT_ID>`,
    //   androidStandaloneAppClientId: `<YOUR_ANDROID_CLIENT_ID>`,
      scopes:["profile","email"]
  }
 
}

export default googleAuthConfig[active]