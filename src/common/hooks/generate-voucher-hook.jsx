import voucher from "voucher-code-generator";

export const useGenerateVoucher = () => {
  return voucher
    .generate({
      length: 8,
      count: 1,
      prefix: "PROMO",
      charset: voucher.charset("alphanumeric"),
    })
    .toString()
    .toLocaleUpperCase();
};
