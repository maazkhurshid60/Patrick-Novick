/* Awards and recognition shown at /index_themall_awards.
 *
 * DELIBERATELY EMPTY until real entries are supplied.
 *
 * This is a recruiting site, and an award is a credential a client will act
 * on — so nothing goes in here that can't be named, dated and checked.
 * Inventing plausible-sounding awards would be the single fastest way to
 * damage the trust the rest of the site is built on, and it is the kind of
 * thing that gets noticed precisely when it matters most.
 *
 * While the list is empty the page renders an honest placeholder and sets
 * itself to noindex, so an empty awards page never reaches search results.
 * Add entries below and it publishes itself — no other change needed.
 *
 * Fields:
 *   title   — the award exactly as it was given
 *   issuer  — who gave it
 *   year    — as a string, so "2024–2025" and "2024" both work
 *   summary — one or two sentences on what it was for. Optional.
 *   href    — a public page confirming it, if one exists. Optional, but the
 *             difference between a claim and a verifiable one.
 */

export type Award = {
  title: string;
  issuer: string;
  year: string;
  summary?: string;
  href?: string;
};

export const AWARDS: Award[] = [
  // Example of the shape — uncomment and replace with a real award:
  // {
  //   title: "Recruiter of the Year",
  //   issuer: "Top Echelon Network",
  //   year: "2024",
  //   summary: "Awarded for the highest split-placement volume in the network.",
  //   href: "https://www.topechelon.com/…",
  // },
];
