import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  pushed_at: string;
  default_branch: string;
  fork: boolean;
}

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  name: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

export type GitHubRepoResult = 
  | { success: true; data: GitHubRepo[] }
  | { success: false; error: string };

export type GitHubUserResult = 
  | { success: true; data: GitHubUser }
  | { success: false; error: string };

export async function getUserRepos(username: string): Promise<GitHubRepoResult> {
  try {
    const response = await octokit.request("GET /users/{username}/repos", {
      username,
      sort: "updated",
      per_page: 30,
      direction: "desc",
    });
    return { success: true, data: response.data as GitHubRepo[] };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch GitHub repos";
    console.error("Failed to fetch GitHub repos:", error);
    return { success: false, error: errorMessage };
  }
}

export async function getUserProfile(username: string): Promise<GitHubUserResult> {
  try {
    const response = await octokit.request("GET /users/{username}", {
      username,
    });
    return { success: true, data: response.data as GitHubUser };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch GitHub profile";
    console.error("Failed to fetch GitHub profile:", error);
    return { success: false, error: errorMessage };
  }
}
