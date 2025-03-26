import { getDB } from "../config/database.js";

export const insertPhoneOtp = async (phone, otp) => {
  const db = getDB();
  const [result] = await db.execute(
    "INSERT INTO userData (phone, otp) VALUES (?, ?) ON DUPLICATE KEY UPDATE otp = ? ",
    [phone, otp, otp]
  );
  return result;
};

export const verifyPhoneOtp = async (phone, otp) => {
  const db = getDB();
  const [row] = await db.execute(
    "SELECT * FROM userData WHERE phone = ? AND otp = ?",
    [phone, otp]
  );
  return row?.length > 0;
};
