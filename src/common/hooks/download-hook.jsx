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

  const downloadImage = async (url) => {
    let extention = url.split(".")[url.split(".").length - 1];
    let anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `download.${extention}`;
    anchor.click();
  };

  const downloadPDF = async (data) => {
    let blob = new Blob([data]);

    let url = await convertToBase64(blob);
    let anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `invoice.pdf`;
    anchor.click();
  };
  return { downloadCSV, downloadImage, downloadPDF };
};
