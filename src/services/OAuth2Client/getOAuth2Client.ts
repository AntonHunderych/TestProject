import { google } from 'googleapis';

export function getOAuth2Client() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://127.0.0.1:3000/api/ws/calendars/callback',
  );
}
