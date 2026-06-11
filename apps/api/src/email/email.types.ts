export type EmailSendResult = {
  error: { message: string } | null;
};

export type EmailClient = {
  emails: {
    send: (options: {
      from: string;
      to: string;
      subject: string;
      html: string;
      text: string;
    }) => Promise<EmailSendResult>;
  };
};
