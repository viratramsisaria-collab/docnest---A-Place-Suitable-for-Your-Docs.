import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export function createToken(userId) {
  return jwt.sign(
    { userId: userId.toString() },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export function requireAuth(request) {
  const token =
    request.cookies.get("patra_token")?.value ||
    request.headers.get("authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new Error("Authentication required");
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    throw new Error("Invalid or expired token");
  }

  return decoded;
}