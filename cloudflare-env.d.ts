interface EmailAddress {
  email: string;
  name?: string;
}

interface EmailMessageBuilder {
  to: string | EmailAddress | (string | EmailAddress)[];
  from: string | EmailAddress;
  subject: string;
  html?: string;
  text?: string;
  replyTo?: string | EmailAddress;
}

interface EmailSendResult {
  messageId: string;
}

interface SendEmail {
  send(message: EmailMessageBuilder): Promise<EmailSendResult>;
}

declare global {
  interface CloudflareEnv {
    EMAIL: SendEmail;
  }
}

export {};
