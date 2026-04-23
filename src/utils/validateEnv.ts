// Called at app startup to catch missing environment variables early.
// Expo uses EXPO_PUBLIC_ prefix for client-side variables.
// A missing API key causes silent failures deep in the app —
// this surfaces them immediately with a clear error message.

const REQUIRED_ENV_VARS = [
  // Add any required env vars here as the app grows
  // e.g. 'EXPO_PUBLIC_SOME_API_KEY'
] as const;

export function validateEnv(): void {
  const missing: string[] = [];

  for (const key of REQUIRED_ENV_VARS) {
    if (!process.env[key]) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missing.map(k => `  - ${k}`).join('\n')}\n\nCheck your .env.local file.`
    );
  }
}