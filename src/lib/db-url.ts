// This app lives in its own Postgres schema so it can safely share a database
// with other apps (their tables stay in `public`, untouched).
export const APP_SCHEMA = "teas_prep";

/** Append `?schema=teas_prep` (used by the Prisma migration engine). */
export function withAppSchema(rawUrl: string): string {
  try {
    const url = new URL(rawUrl);
    url.searchParams.set("schema", APP_SCHEMA);
    return url.toString();
  } catch {
    return rawUrl;
  }
}

/** Strip `sslmode` (SSL is configured explicitly on the adapter). */
export function stripSslMode(rawUrl: string): string {
  try {
    const url = new URL(rawUrl);
    url.searchParams.delete("sslmode");
    return url.toString();
  } catch {
    return rawUrl;
  }
}

/**
 * Convert a Neon pooled host to the direct (unpooled) host. The runtime client
 * sets the schema via search_path, which Neon's PgBouncer pooler rejects, so we
 * connect directly. No-op for non-Neon / already-direct URLs.
 */
export function toDirectConnection(rawUrl: string): string {
  try {
    const url = new URL(rawUrl);
    url.hostname = url.hostname.replace("-pooler", "");
    return url.toString();
  } catch {
    return rawUrl;
  }
}
