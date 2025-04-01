export const isCodeSandbox = process.env.SANDBOX_URL !== undefined;

export const config = {
  baseUrl: isCodeSandbox ? process.env.SANDBOX_URL : 'http://localhost:8081',
  // Autres configurations...
};
