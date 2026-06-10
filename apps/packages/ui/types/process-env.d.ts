// `process.env.*` references are inlined by the consuming bundlers
// (Next.js / Expo), so we only need a minimal ambient declaration here
// instead of depending on @types/node.
declare const process: {
  env: Record<string, string | undefined>;
};
