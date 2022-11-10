import moment from "moment";
import S3 from "react-aws-s3";
import { toast } from "react-toastify";

let payload = {
  bucketName: process.env.REACT_APP_BUCKET_NAME,
  region: process.env.REACT_APP_REGION,
  accessKeyId: process.env.REACT_APP_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  dirName: process.env.REACT_APP_DIRECTORY,
};

let awsClient = new S3(payload);
export const useUploadImage = () => {
  const uploadImage = async (file) => {
    if (file) {
      awsClient
        .uploadFile(
          file,
          `${process.env.REACT_APP_DIRECTORY}-${moment.now()}-${file.name}`
        )
        .then((data) => {
          return data.location;
        })
        .catch((error) => {
          console.log(error);
          toast.error("Something went wrong!");
        });
    }
  };

  return {
    uploadImage,
  };
};
