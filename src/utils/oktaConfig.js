const config = {
  issuer: process.env.REACT_APP_OKTA_ISSUER_URI,
  redirectUri: window.location.origin + '/implicit/callback',
  clientId: process.env.REACT_APP_CLIENT_ID,
  pkce: true,
  scopes: ['openid', 'email', 'profile'],
  idps: { type: 'Facebook', id: '446964073111312' },
  idpDisplay: 'SECONDARY',
};

export { config };
