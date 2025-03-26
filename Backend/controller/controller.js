import { insertPhoneOtp, verifyPhoneOtp } from "../modal/userSchema.js";

export const sendOTP = async (req, res) => {
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  try {
    await insertPhoneOtp(phone, otp);
    console.log(`Generated OTP for ${phone}: ${otp}`);
    res.status(201).json({ message: "OTP send successfully" });
  } catch (error) {
    console.error("Error while login:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyOTP = async (req, res) => {
  const { phone, otp } = req.body;
  try {
    const isMatch = await verifyPhoneOtp(phone, otp);
    if (isMatch) {
      return res.status(200).json({ message: "OTP verified successfully" });
    } else {
      return res.status(400).json({ message: "Please enter valid OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error.message);
    return res.status(500).json({ message: "Internal Error" });
  }
};
