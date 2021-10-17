import nodemailer from "nodemailer";
const stmpTransporter = nodemailer.createTransport({
  service: "aol",
  secure: false,
  auth: {
    user: "myproject2019@aol.com",
    pass: "ojix vldu pufy ajqj"
  }
});

export const sendMail = async (options: {
  to: string,
  from: string,
  subject:string,
  text?: string,
  html?: string,
  attachments?:{ path: string } []
}) => {
  return stmpTransporter.sendMail(options);
}