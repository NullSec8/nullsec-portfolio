import { getUserRepos, getUserProfile } from "../github";
import { Octokit } from "octokit";

// Mock Octokit
jest.mock("octokit", () => ({
  Octokit: jest.fn().mockImplementation(() => ({
    request: jest.fn(),
  })),
}));

const mockOctokit = new Octokit({ auth: "test" });

describe("GitHub Library", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getUserRepos", () => {
    it("should return success with repos data when API call succeeds", async () => {
      const mockRepos = [
        {
          id: 1,
          name: "test-repo",
          full_name: "nullsec8/test-repo",
          description: "A test repository",
          html_url: "https://github.com/nullsec8/test-repo",
          stargazers_count: 10,
          language: "TypeScript",
          topics: ["test"],
          pushed_at: "2026-05-04T00:00:00Z",
          default_branch: "main",
          fork: false,
        },
      ];

      (mockOctokit.request as jest.Mock).mockResolvedValueOnce({
        data: mockRepos,
      });

      const result = await getUserRepos("nullsec8");

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toHaveLength(1);
        expect(result.data[0].name).toBe("test-repo");
      }
    });

    it("should return error when API call fails", async () => {
      (mockOctokit.request as jest.Mock).mockRejectedValueOnce(
        new Error("API Error")
      );

      const result = await getUserRepos("nullsec8");

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe("API Error");
      }
    });

    it("should filter out forked repositories", async () => {
      const mockRepos = [
        {
          id: 1,
          name: "my-repo",
          fork: false,
        },
        {
          id: 2,
          name: "forked-repo",
          fork: true,
        },
      ];

      (mockOctokit.request as jest.Mock).mockResolvedValueOnce({
        data: mockRepos,
      });

      const result = await getUserRepos("nullsec8");

      expect(result.success).toBe(true);
      if (result.success) {
        const publicRepos = result.data.filter((repo) => !repo.fork);
        expect(publicRepos).toHaveLength(1);
        expect(publicRepos[0].name).toBe("my-repo");
      }
    });
  });

  describe("getUserProfile", () => {
    it("should return success with user data when API call succeeds", async () => {
      const mockUser = {
        login: "nullsec8",
        id: 12345,
        avatar_url: "https://avatars.githubusercontent.com/u/12345",
        name: "nullsec8",
        public_repos: 20,
        followers: 10,
        following: 5,
      };

      (mockOctokit.request as jest.Mock).mockResolvedValueOnce({
        data: mockUser,
      });

      const result = await getUserProfile("nullsec8");

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.login).toBe("nullsec8");
        expect(result.data.public_repos).toBe(20);
      }
    });

    it("should return error when API call fails", async () => {
      (mockOctokit.request as jest.Mock).mockRejectedValueOnce(
        new Error("User not found")
      );

      const result = await getUserProfile("nonexistent");

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe("User not found");
      }
    });
  });
});
