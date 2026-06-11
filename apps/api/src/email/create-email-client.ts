import { createRequire } from 'node:module';
import type { EmailClient } from './email.types';

const loadModule = createRequire(__filename);

type ResendConstructor = new (key: string) => EmailClient;

export function createEmailClient(apiKey: string): EmailClient {
  const { Resend } = loadModule('resend') as { Resend: ResendConstructor };
  return new Resend(apiKey);
}
