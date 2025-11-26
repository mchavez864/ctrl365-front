'use server';

import nodemailer from 'nodemailer';

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
  SMTP_PASS,
  SMTP_FROM,
  CONTACT_DEFAULT_TO,
  CONTACT_DEFAULT_SUBJECT,
} = process.env;

function getTransporter() {
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error('SMTP credentials are not fully configured.');
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE ? SMTP_SECURE !== 'false' : true,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

function buildMessageBody(fields) {
  const rows = Object.entries(fields)
    .map(([key, value]) => {
      const printable = Array.isArray(value) ? value.join(', ') : value ?? '';
      return `<tr><td style="padding:4px 8px;font-weight:600;text-transform:capitalize;">${key}</td><td style="padding:4px 8px;">${printable}</td></tr>`;
    })
    .join('');

  return `<!doctype html>
  <html><body style="font-family:Inter,Arial,sans-serif;color:#161616;">
    <h1 style="font-size:18px;margin-bottom:16px;">Nuevo mensaje del formulario</h1>
    <table style="border-collapse:collapse;min-width:320px;">
      ${rows}
    </table>
  </body></html>`;
}

export async function sendContactEmail({ subject, to, fields }) {
  const transporter = getTransporter();

  const resolvedSubject =
    subject || CONTACT_DEFAULT_SUBJECT || 'Formulario de contacto';
  const resolvedTo = to || CONTACT_DEFAULT_TO || SMTP_USER;

  const textBody = Object.entries(fields)
    .map(
      ([key, value]) =>
        `${key}: ${Array.isArray(value) ? value.join(', ') : value ?? ''}`
    )
    .join('\n');

  const message = {
    from: SMTP_FROM || SMTP_USER,
    to: resolvedTo,
    subject: resolvedSubject,
    text: textBody,
    html: buildMessageBody(fields),
  };

  await transporter.sendMail(message);
}
