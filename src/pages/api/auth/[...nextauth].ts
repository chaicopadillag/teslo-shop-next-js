import NextAuth from 'next-auth';
import Github from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { auhtController } from '../../../app/controllers';

export default NextAuth({
  providers: [
    Credentials({
      name: 'Custom Credentials',
      credentials: {
        email: { label: 'Correo', type: 'email', placeholder: 'jsmith@gmail.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        return await auhtController.loginEmailPassword(credentials?.email, credentials?.password);
      },
    }),
    Github({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  jwt: {
    // secret: process.env.JWT_SECRET,
  },
  session: {
    maxAge: 86400, // 1 day
    strategy: 'jwt',
    updateAge: 7200, // 2 hours
  },
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        switch (account.type) {
          case 'oauth':
            token.user = await auhtController.loginOAuth(user?.email || '', user?.name || '');
            break;
          case 'credentials':
            token.user = user;
          default:
            break;
        }
      }

      return token;
    },
    async session({ session, user, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user as any;
      return session;
    },
  },
});
