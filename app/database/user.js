import _ from "lodash";
import {db} from '../services/firebase';

const usersRef = "/users";
export const saveOrUpdateFirebaseUser=(result)=>{
   
    const {user,additionalUserInfo} =result;
    const uid=user.uid;
    if(additionalUserInfo.isNewUser){
        let dbUser = {
            providerId: additionalUserInfo.providerId,
            email : user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            isAnonymous:user.isAnonymous,
            createdAt: Date.now(),
            emailVerified:user.emailVerified,
            phoneNumber:user.phoneNumber,
        };
        if(additionalUserInfo.profile){
            dbUser.firstName = additionalUserInfo.profile.given_name,
            dbUser.lastName = additionalUserInfo.profile.family_name
        };
       
        db.ref(usersRef+"/"+uid)
        .set(dbUser).then(()=>{
            console.log("Created the  user in firebase database");
        });
    }
    else{
        db.ref(usersRef+"/"+uid)
        .update({
            lastLoginAt:Date.now()
        });
        
    }
    return;
}

export const retrieveUserProfile=(firebaseUser,callBack)=>{
   const ref =  db.ref(usersRef+"/"+firebaseUser.uid).
    ref.on('value', (snapshot) =>{
        const userInDB = snapshot.val();
       // updateStarCount(postElement, data);
       callBack(_.assign(firebaseUser,userInDB));
    });

}
export const updateUserRole=(uid,updated)=>{
    db.ref(usersRef+"/"+uid)
        .update(updated);
    return;
}


// Object {
//   "additionalUserInfo": cg {
//     "isNewUser": false,
//     "profile": Object {
//       "at_hash": "Zo6qGP1094yezhxocPk6bA",
//       "aud": "621363690446-nfh9q1gvr7q443mklkm2nk87f1cglgnv.apps.googleusercontent.com",
//       "azp": "621363690446-nfh9q1gvr7q443mklkm2nk87f1cglgnv.apps.googleusercontent.com",
//       "email": "maiddb.001@gmail.com",
//       "email_verified": true,
//       "exp": 1605799475,
//       "family_name": "Admin",
//       "given_name": "Maid DB",
//       "iat": 1605795875,
//       "iss": "https://accounts.google.com",
//       "locale": "en",
//       "name": "Maid DB Admin",
//       "nonce": "sHhS1pb1I4izVZMKJQx0f4EhWTh3QXtcgpKxHhLBcFs",
//       "picture": "https://lh5.googleusercontent.com/-rCHI9L_EOEg/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmnBwVSAjey8-HjCmNYYJoAY4_J_Q/s96-c/photo.jpg",
//       "sub": "104030445796972323001",
//     },
//     "providerId": "google.com",
//   },
//   "credential": Object {
//     "oauthAccessToken": "ya29.a0AfH6SMDxCBRHZmZOsgpBL_dpcJNoNCdqRIWwuBOKy-kpqFNB6JoF9wyitnc2CgEVyCo4cRirtMxynMD9nQh8axGp57etEAJuQCQlqspSSZ21LKggU59GRl7P7z9CDrtn6rHnDmOZ1bI58_6oLHkkQCdAe_DRoiPJTX_LPrRRk6c",
//     "oauthIdToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImRlZGMwMTJkMDdmNTJhZWRmZDVmOTc3ODRlMWJjYmUyM2MxOTcyNGQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2MjEzNjM2OTA0NDYtbmZoOXExZ3ZyN3E0NDNta2xrbTJuazg3ZjFjZ2xnbnYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2MjEzNjM2OTA0NDYtbmZoOXExZ3ZyN3E0NDNta2xrbTJuazg3ZjFjZ2xnbnYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDQwMzA0NDU3OTY5NzIzMjMwMDEiLCJlbWFpbCI6Im1haWRkYi4wMDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJabzZxR1AxMDk0eWV6aHhvY1BrNmJBIiwibm9uY2UiOiJzSGhTMXBiMUk0aXpWWk1LSlF4MGY0RWhXVGgzUVh0Y2dwS3hIaExCY0ZzIiwibmFtZSI6Ik1haWQgREIgQWRtaW4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDUuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1yQ0hJOUxfRU9FZy9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BTVp1dWNtbkJ3VlNBamV5OC1IakNtTllZSm9BWTRfSl9RL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJNYWlkIERCIiwiZmFtaWx5X25hbWUiOiJBZG1pbiIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjA1Nzk1ODc1LCJleHAiOjE2MDU3OTk0NzV9.ktsejlgquSLugjBqLk_j0ZjlkiOO_8Afxr_m93bfrSxu03bqn_NGvh0_xHoiAkdylQypklsKEsUoHBgTfu2i9B3mthzQ5wATdqTRh-fo5mdmINqQ88MnljMLmz7TLkJjE8M5n2a7r4HqOYXK7h4pTfV5WiYF9aJmjN04ZjZyMLhb9oAniYTVps4s64tW86m_Xp1FuzVjitCMfWhT2NNp8SXClcV0xwMfYbYa48nT01s3ihRkufjNobYysCRHWF8VG4TErX1Mrhh-bLqTs32vr1UTRor5PwYSImY3s7ivxLLiggBymhEVCqiPgsWjivr3jtul4PxZieAikTsEIqSjgA",
//     "providerId": "google.com",
//     "signInMethod": "google.com",
//   },
//   "operationType": "signIn",
//   "user": Object {
//     "apiKey": "AIzaSyCQqgTSGxnlZAzSFvg7J0XB91TJhsNpndk",
//     "appName": "[DEFAULT]",
//     "authDomain": "maiddb.firebaseapp.com",
//     "createdAt": "1605713296142",
//     "displayName": "Maid DB Admin",
//     "email": "maiddb.001@gmail.com",
//     "emailVerified": true,
//     "isAnonymous": false,
//     "lastLoginAt": "1605795876112",
//     "phoneNumber": null,
//     "photoURL": "https://lh5.googleusercontent.com/-rCHI9L_EOEg/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmnBwVSAjey8-HjCmNYYJoAY4_J_Q/s96-c/photo.jpg",
//     "providerData": Array [
//       Object {
//         "displayName": "Maid DB Admin",
//         "email": "maiddb.001@gmail.com",
//         "phoneNumber": null,
//         "photoURL": "https://lh5.googleusercontent.com/-rCHI9L_EOEg/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmnBwVSAjey8-HjCmNYYJoAY4_J_Q/s96-c/photo.jpg",
//         "providerId": "google.com",
//         "uid": "104030445796972323001",
//       },
//     ],
//     "redirectEventId": null,
//     "stsTokenManager": Object {
//       "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjNlNTQyN2NkMzUxMDhiNDc2NjUyMDhlYTA0YjhjYTZjODZkMDljOTMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTWFpZCBEQiBBZG1pbiIsInBpY3R1cmUiOiJodHRwczovL2xoNS5nb29nbGV1c2VyY29udGVudC5jb20vLXJDSEk5TF9FT0VnL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FNWnV1Y21uQndWU0FqZXk4LUhqQ21OWVlKb0FZNF9KX1Evczk2LWMvcGhvdG8uanBnIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL21haWRkYiIsImF1ZCI6Im1haWRkYiIsImF1dGhfdGltZSI6MTYwNTc5NTg3NiwidXNlcl9pZCI6InN4aHZ6YTBPZE1TNzQxQU1tTWJSN1lBRWNUMTIiLCJzdWIiOiJzeGh2emEwT2RNUzc0MUFNbU1iUjdZQUVjVDEyIiwiaWF0IjoxNjA1Nzk1ODc2LCJleHAiOjE2MDU3OTk0NzYsImVtYWlsIjoibWFpZGRiLjAwMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwNDAzMDQ0NTc5Njk3MjMyMzAwMSJdLCJlbWFpbCI6WyJtYWlkZGIuMDAxQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.ZpD80qtUfF75-Gzh3FSwDpbFXK7dxl-IJ9F-N-Vja3WLIuOk7kPzVYai6XQf3zDL1DB10qZJKy-yZ7QrCcVJNcNXYHGV47Bow8Pr9lv7PuFaBWhoaoc5aLXPuqbsBNCGwlUIpM3f1DVgCgiGSc3RzeNLdxorPey2xAQtSWIoxCdfHqxqaiBOACaQDs2LRPjEx3yMlZ0Ff29viPzs2GMnIO3U53U2aJN-kcTXR92e_jQU93GehKoxAUEqidNEbAd09ChYhdbzvQKFeYH0U0ZSPbCiZ0dWL8f65mhqkxcI9VFH9XXfoz1fIkIG3U_YSih39XuVNHXxFFaAUpKcEfb9ig",
//       "apiKey": "AIzaSyCQqgTSGxnlZAzSFvg7J0XB91TJhsNpndk",
//       "expirationTime": 1605799476286,
//       "refreshToken": "AG8BCnf8EVy9hjYYM1v2o3b6NDoZh-uztoPF8zpg4WqsnjexOhTw8F3hZLSqFtZOtORGKL0PlRqRlHpydvEcXCzOnFFhf3l3NE2IPf28jXySZ54fIAia2LViPyfTwWwASATxGof6dE4Qqz5TG_0ksaG_BorcGzAreACpTpCQnK1M-y9YonrkUbyhk7czs2g8TJwjBgrqwE8PbpAgw3-cQvMQl7MjRySVR9BLn3iRMrw5J_NJwS-BRPVMfWY-A5lmqqj81Iq6rzRAFAo9EzeDaYWz68WJYojN5q53RjSrbE-nY1QOL4pPaE2IVnb8as6OFublXJ72T7O4U_Lf4z-rgbYzAb43bLO1e4IYUI3P3m7Uf6iGs30spEmCR0x1MD01GiJmbcjGgynGWY3ZjrxwQOIC2Tq4_82yuEOSmePwO0IE0qCEpqE1rJuVEIVbCQkdL3X4bXx9uXqX",
//     },
//     "tenantId": null,
//     "uid": "sxhvza0OdMS741AMmMbR7YAEcT12",
//   },
// }