import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "dvpivkty2",
  api_key: "348688488297848",
  api_secret: "_2HGiffRrsEMLGoTZHm-n8O3uzs",
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.log("CLOUDN: path is null");
      return null;
    }
    //upload file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //file has been uploaded on cloudinary
    console.log("CLOUDN: File uploaded on cloudinary", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.log("CLOUDN: error", error);
    fs.unlinkSync(localFilePath); //remove the locally saved temp file as the upload failed
    return null;
  }
};

export { uploadOnCloudinary };
