-- Migration number: 0001 	 2026-10-26T14:08:25.388Z
CREATE TABLE contacts (
  -- contact info 
  email TEXT PRIMARY KEY COLLATE NOCASE,
  firstName TEXT,
  lastName TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'subscribed', 'unsubscribed')),
  -- tokens for confirmation/unsubscribe
  confirmationToken TEXT UNIQUE,
  tokenExpiration TEXT,
  unsubscribeToken TEXT UNIQUE,
  -- timestamps
  createdAt TEXT NOT NULL,
  confirmedAt TEXT,
  unsubscribedAt TEXT
) STRICT;

CREATE TABLE sends (
  issueNumber INTEGER NOT NULL,
  email TEXT NOT NULL references contacts(email)  ON DELETE CASCADE COLLATE NOCASE,
  resendId TEXT,
  sentAt TEXT NOT NULL,
  PRIMARY KEY(issueNumber, email)
) STRICT;