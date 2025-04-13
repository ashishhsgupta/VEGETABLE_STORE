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
    "SELECT phone, otp, user_role FROM userData WHERE phone = ? AND otp = ?",
    [phone, otp]
  );
  console.log("Query:", row);
  if (row?.length > 0) {
    let role = phone === "8928039177" ? "Admin" : "User";
    await db.execute("UPDATE userData SET user_role = ? WHERE phone = ?", [
      role,
      phone,
    ]);
    console.log(`Role assign: ${role}`);
    return {
      success: true,
      phone: phone,
      role: role,
    };
  }
  return { sucess: false, message: "Invalid OTP" };
};
