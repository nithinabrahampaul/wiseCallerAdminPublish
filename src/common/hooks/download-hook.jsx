import { convertToBase64 } from "../utils/convert-base64";

export const useDownload = () => {
  const downloadCSV = async (data, filename, extention) => {
    let base64 = new Blob([data], { type: "utf-8" });
    let url = await convertToBase64(base64);
    let anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${filename}.${extention}`;
    anchor.click();
  };
  return [downloadCSV];
};
