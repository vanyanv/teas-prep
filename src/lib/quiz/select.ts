import {
  sectionCountsFor,
  topicCountsFor,
  type Section,
} from "@/lib/teas-blueprint";

interface Selectable {
  id: string;
  section: Section;
  topic: string;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Pick a blueprint-balanced subset of `total` question ids from `pool`,
 * weighted across sections and topics, capped by availability. If the pool is
 * smaller than `total`, returns as many as exist.
 */
export function selectBalanced(pool: Selectable[], total: number): string[] {
  const want = Math.min(total, pool.length);
  const bySection = groupBy(pool, (q) => q.section);
  const sectionTargets = sectionCountsFor(want);

  const chosen: string[] = [];
  const leftovers: Selectable[] = [];

  for (const section of Object.keys(bySection) as Section[]) {
    const items = bySection[section];
    const target = sectionTargets[section] ?? 0;
    const byTopic = groupBy(items, (q) => q.topic);
    const topicTargets = topicCountsFor(section, target);

    for (const topic of Object.keys(byTopic)) {
      const bucket = shuffle(byTopic[topic]);
      const take = Math.min(topicTargets[topic] ?? 0, bucket.length);
      chosen.push(...bucket.slice(0, take).map((q) => q.id));
      leftovers.push(...bucket.slice(take));
    }
  }

  // Top up from leftovers if rounding/availability left us short.
  if (chosen.length < want) {
    const pad = shuffle(leftovers).slice(0, want - chosen.length);
    chosen.push(...pad.map((q) => q.id));
  }

  return shuffle(chosen).slice(0, want);
}

/**
 * Pick a blueprint-weighted subset of `total` ids from one section of `pool`,
 * topics weighted by their scored share (`topicCountsFor`), topped up from
 * leftovers when a topic runs thin. Returns fewer than `total` only when the
 * section's pool is smaller.
 */
export function selectSectionBalanced(
  pool: Selectable[],
  section: Section,
  total: number,
): string[] {
  const items = pool.filter((q) => q.section === section);
  const want = Math.min(total, items.length);
  const byTopic = groupBy(items, (q) => q.topic);
  const topicTargets = topicCountsFor(section, want);

  const chosen: string[] = [];
  const leftovers: Selectable[] = [];
  for (const topic of Object.keys(byTopic)) {
    const bucket = shuffle(byTopic[topic]);
    const take = Math.min(topicTargets[topic] ?? 0, bucket.length);
    chosen.push(...bucket.slice(0, take).map((q) => q.id));
    leftovers.push(...bucket.slice(take));
  }
  if (chosen.length < want) {
    const pad = shuffle(leftovers).slice(0, want - chosen.length);
    chosen.push(...pad.map((q) => q.id));
  }
  return shuffle(chosen).slice(0, want);
}

/** Random subset of up to `total` ids (used for already-filtered pools). */
export interface Exposure {
  timesServed: number;
  lastServedMs: number;
}

/**
 * Cooldown-aware selection for exam forms: unseen questions first (shuffled for
 * fairness), then previously-served ones ordered by fewest times served and
 * oldest first. A decaying preference, not a hard ban — a small pool still
 * fills `total`. Deterministic ordering among seen items keeps repeat forms
 * from recycling the same recent questions.
 */
export function selectWithCooldown(
  pool: { id: string }[],
  total: number,
  exposure: Map<string, Exposure>,
): string[] {
  const unseen: { id: string }[] = [];
  const seen: { id: string; exp: Exposure }[] = [];
  for (const q of pool) {
    const exp = exposure.get(q.id);
    if (exp) seen.push({ id: q.id, exp });
    else unseen.push(q);
  }
  seen.sort(
    (a, b) => a.exp.timesServed - b.exp.timesServed || a.exp.lastServedMs - b.exp.lastServedMs,
  );
  const ordered = [...shuffle(unseen).map((q) => q.id), ...seen.map((s) => s.id)];
  return ordered.slice(0, total);
}

export function selectFromPool(pool: { id: string }[], total: number): string[] {
  return shuffle(pool.map((p) => p.id)).slice(0, total);
}

function groupBy<T, K extends string>(arr: T[], key: (x: T) => K): Record<K, T[]> {
  const out = {} as Record<K, T[]>;
  for (const item of arr) {
    const k = key(item);
    (out[k] ??= []).push(item);
  }
  return out;
}
