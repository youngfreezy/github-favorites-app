import { RawRepo, Repo } from "../App";

export const transformRepo = (repo: any): Repo => {
  return {
    id: repo.id.toString(),
    fullName: repo.fullName || repo.full_name || "",
    createdAt: repo.createdAt || repo.created_at || "",
    stargazersCount: repo.stargazersCount || repo.stargazers_count || 0,
    language: repo.language || "unknown",
    url: repo.url,
  };
};
