import { FastifyRequest } from 'fastify';
import { OAuth2Namespace } from '@fastify/oauth2';
import { ApplicationError } from '../../types/errors/ApplicationError';

export async function getUserDataFromGoogle(
  req: FastifyRequest,
  googleOAuth2: OAuth2Namespace,
): Promise<{ username: string; email: string }> {
  try {
    const token: any = await googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${token.access_token}` },
    });
    const userInfo = await response.json();
    return {
      username: userInfo.name,
      email: userInfo.email,
    };
  } catch (e) {
    throw new ApplicationError('Get user from google error', e);
  }
}
