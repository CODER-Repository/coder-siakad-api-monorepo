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


export const getUserFromToken = (token: any) => {
  const { JWT_SECRET } = process.env;

  if (!token) {
    throw new Error('Token not found')
  }
  
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET not found')
  }

  try {
    const authUser = jwt.verify(token.split(' ')[1], JWT_SECRET) as TokenPayload;
    
    if (authUser) {
      return authUser;
    } else {
      throw new Error('Tidak dapat mengambil email dari token.')
    }
  } catch (error) {
    throw new Error('Error saat memverifikasi token:' + error)
  }
};