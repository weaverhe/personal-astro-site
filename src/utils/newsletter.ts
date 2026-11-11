import type {D1Database} from "@cloudflare/workers-types";

export const createPendingContact = async (
  db: D1Database,
  name: string,
  email: string,
) => {
  const now = new Date().toISOString();
  const confirmationToken = crypto.randomUUID();
  const tokenExpirationMs = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  const tokenExpirationDate = new Date(
    Date.now() + tokenExpirationMs,
  ).toISOString(); // 24 hours from now

  await db
    .prepare(
      `INSERT INTO contacts (email, name, status, confirmationToken, tokenExpiration, createdAt)
      VALUES (?, ?, 'pending', ?, ?, ?)
      ON CONFLICT(email)
      DO UPDATE SET
        name = excluded.name,
        status = 'pending',
        confirmationToken = excluded.confirmationToken,
        tokenExpiration = excluded.tokenExpiration,
        confirmedAt = NULL,
        unsubscribedAt = NULL
      WHERE status != 'subscribed'
      `,
    )
    .bind(email, name, confirmationToken, tokenExpirationDate, now)
    .run();
};
