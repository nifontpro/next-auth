import type { NextAuthOptions } from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';
import axios, { AxiosError } from 'axios';

declare module 'next-auth/jwt' {
  interface JWT {
    id_token?: string;
    provider?: string;
  }
}

const KEYCLOAK_CLIENT_ID = process.env.KEYCLOAK_CLIENT_ID;
const KEYCLOAK_CLIENT_SECRET = process.env.KEYCLOAK_CLIENT_SECRET;
const KEYCLOAK_URL = process.env.KEYCLOAK_URL;
const KEYCLOAK_REALM = process.env.KEYCLOAK_REALM;

const KEYCLOAK_ISSUER = `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}`;

export const options: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      id: 'keycloak',
      name: 'keycloak',
      clientId: KEYCLOAK_CLIENT_ID as string,
      clientSecret: KEYCLOAK_CLIENT_SECRET as string,
      issuer: KEYCLOAK_ISSUER as string,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.id_token = account.id_token;
        token.provider = account.provider;
      }
      return token;
    },
  },
  events: {
    signOut: async ({ session, token }) => {
      const { provider, id_token } = token;
      try {
        // Add the id_token_hint to the query string
        const params = new URLSearchParams();
        params.append('id_token_hint', id_token as string);
        const { status, statusText } = await axios.get(
          `${KEYCLOAK_ISSUER}/protocol/openid-connect/logout?${params.toString()}`
        );
        // The response body should contain a confirmation that the user has been logged out
        console.log('Completed post-logout handshake', status, statusText);
      } catch (e: any) {
        console.error(
          'Unable to perform post-logout handshake',
          (e as AxiosError)?.code || e
        );
      }
    },
  },
};
