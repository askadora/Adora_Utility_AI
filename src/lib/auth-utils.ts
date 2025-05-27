import { Session } from "next-auth";
import jwt from "jsonwebtoken";

export const storeTokenInLocalStorage = (session: Session | null) => {
  if (session?.user) {
    const token = jwt.sign(
      {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        accessToken: session.accessToken
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "1d" }
    );
    localStorage.setItem('token', token);
  }
};

export const getTokenFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
        return decoded;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
  }
  return null;
};

export const removeTokenFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
}; 