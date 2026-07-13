const LINKEDIN_CLIENT_ID = "778we1fuvooq5g";
const REDIRECT_URI = "http://localhost:5173/linkedin/callback";

export const linkedInLogin = () => {
  const state = Math.random().toString(36).substring(2);

  localStorage.setItem("linkedin_state", state);

  const authUrl =
    `https://www.linkedin.com/oauth/v2/authorization` +
    `?response_type=code` +
    `&client_id=${LINKEDIN_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&scope=openid%20profile%20email` +
    `&state=${state}`;

  window.location.href = authUrl;
};