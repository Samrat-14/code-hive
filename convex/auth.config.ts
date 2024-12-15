export default {
  providers: [
    {
      domain: process.env.CLERK_AUTH_URL,
      applicationID: 'convex',
    },
  ],
};
