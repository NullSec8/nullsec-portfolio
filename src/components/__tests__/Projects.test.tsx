import { render, screen } from "@testing-library/react";
import Projects from "../Projects";
import { GitHubRepo } from "@/lib/github";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  useInView: () => true,
}));

const mockRepos: GitHubRepo[] = [
  {
    id: 1,
    name: "test-repo-1",
    full_name: "nullsec8/test-repo-1",
    description: "Test repository 1",
    html_url: "https://github.com/nullsec8/test-repo-1",
    stargazers_count: 10,
    language: "TypeScript",
    topics: ["test"],
    pushed_at: "2026-05-04T00:00:00Z",
    default_branch: "main",
    fork: false,
  },
  {
    id: 2,
    name: "test-repo-2",
    full_name: "nullsec8/test-repo-2",
    description: "Test repository 2",
    html_url: "https://github.com/nullsec8/test-repo-2",
    stargazers_count: 5,
    language: "Python",
    topics: ["test"],
    pushed_at: "2026-05-04T00:00:00Z",
    default_branch: "main",
    fork: false,
  },
];

describe("Projects Component", () => {
  it("should render projects header", () => {
    render(<Projects repos={mockRepos} />);
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  it("should render all projects", () => {
    render(<Projects repos={mockRepos} />);
    expect(screen.getByText("test-repo-1")).toBeInTheDocument();
    expect(screen.getByText("test-repo-2")).toBeInTheDocument();
  });

  it("should display project descriptions", () => {
    render(<Projects repos={mockRepos} />);
    expect(screen.getByText("Test repository 1")).toBeInTheDocument();
  });

  it("should show language filter buttons", () => {
    render(<Projects repos={mockRepos} />);
    expect(screen.getByText("All (2)")).toBeInTheDocument();
    expect(screen.getByText("TypeScript (1)")).toBeInTheDocument();
    expect(screen.getByText("Python (1)")).toBeInTheDocument();
  });

  it("should filter projects by language", () => {
    render(<Projects repos={mockRepos} />);
    const typescriptButton = screen.getByText("TypeScript (1)");
    typescriptButton.click();
    
    expect(screen.queryByText("test-repo-2")).not.toBeInTheDocument();
    expect(screen.getByText("test-repo-1")).toBeInTheDocument();
  });

  it("should show empty state when no projects match filter", () => {
    const emptyRepos: GitHubRepo[] = [];
    render(<Projects repos={emptyRepos} />);
    expect(screen.getByText("No projects found in this category.")).toBeInTheDocument();
  });
});
