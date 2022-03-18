import bcryptjs from 'bcryptjs';

interface SeedUser {
  name: string;
  email: string;
  password: string;
  role: string;
}

export const users: SeedUser[] = [
  {
    name: 'Code Codero',
    email: process.env.ADMIN_EMAIL || 'code@gmail.com',
    password: bcryptjs.hashSync(process.env.ADMIN_PASSWORD || '123456'),
    role: 'ADMIN',
  },
  {
    name: 'Clara Effertz',
    email: 'phyllis.leuschke55@hotmail.com',
    password: bcryptjs.hashSync('123456'),
    role: 'CLIENT',
  },
  {
    name: 'Luella Schowalter',
    email: 'aylin9@gmail.com',
    password: bcryptjs.hashSync('123456'),
    role: 'CLIENT',
  },
];
