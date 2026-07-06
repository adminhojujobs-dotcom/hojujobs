export type UserJobRow = {
  id: number;
  title: string | null;
  location: string[] | null;
  industry: string | null;
  contact: string | null;
  email: string | null;
  kakaoid: string | null;
  uploaded_at: string | null;
};

export type UserJobSortKey = "title" | "uploaded_at" | "industry";
export type UserJobSortDirection = "asc" | "desc";

export const USER_JOB_SELECT =
  "id, title, location, industry, contact, email, kakaoid, uploaded_at";

export function formatUserJobContact(job: UserJobRow) {
  return job.contact || job.email || job.kakaoid || "-";
}

export function formatUserJobLocation(job: UserJobRow) {
  const locations = job.location?.filter(Boolean) ?? [];
  return locations.length > 0 ? locations.join(" · ") : "-";
}

export function userJobSearchHaystack(job: UserJobRow) {
  return [
    job.title,
    job.industry,
    formatUserJobLocation(job),
    formatUserJobContact(job),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}
