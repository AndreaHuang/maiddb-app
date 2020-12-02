import * as ImageManipulator from 'expo-image-manipulator';
import defaultStyles from "../config/styles";



const defaultNewWidth = defaultStyles.image.resizeToWidth;
const resize = async (originalUrl,newWidth = defaultNewWidth) => {
    console.debug("to Resize",originalUrl);  
    try{

        const result = await ImageManipulator.manipulateAsync(
        originalUrl,
        [ {resize:{width:newWidth}}],
        { compress: 1, 
          format: ImageManipulator.SaveFormat.PNG }
        );
        console.debug("resize result",result);
        return {data:result.uri};      
    }catch(error){
         console.error('image resizing error => ', error);
         return {
             error:true,
             errorCode:error.errorCode,
         }
    }
  };

export default{
    resize
}