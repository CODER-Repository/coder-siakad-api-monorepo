import jwt from 'jsonwebtoken';

export function generateUniqueRandomString(length: number): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

interface TokenPayload {
  userId: string;
  email: string;
  username: string;
  role: string;
  roleId: string;
}


export const getEmailFromToken = (token: any) => {
  if (!token) {
    return;
  }

  const { JWT_SECRET } = process.env;
  
  if (!JWT_SECRET) {
    console.error('JWT_SECRET tidak ditemukan dalam environment variables.');
    return null;
  }

  try {
    const authUser = jwt.verify(token.split(' ')[1], JWT_SECRET) as TokenPayload;
    
    if (authUser && typeof authUser === 'object' && authUser.email) {
      return authUser.email;
    } else {
      console.error('Tidak dapat mengambil email dari token.');
      return null;
    }
  } catch (error) {
    console.error('Error saat memverifikasi token:', error);
    return null;
  }
};