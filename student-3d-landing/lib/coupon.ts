import { randomBytes } from "crypto";

export function generateCouponCode() {
  const raw = process.env.COUPON_CODE?.trim() || "KARAZ";
  const prefix = raw.replace(/[^A-Za-z0-9]/g, "").slice(0, 8).toUpperCase() || "KARAZ";
  const token = randomBytes(3).toString("hex").toUpperCase();
  return `${prefix}-${token}`;
}
