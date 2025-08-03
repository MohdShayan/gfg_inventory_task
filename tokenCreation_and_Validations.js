import jwt from 'jsonwebtoken';

export const createToken = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role 
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
  if (!token) {
    return null;  
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
};
