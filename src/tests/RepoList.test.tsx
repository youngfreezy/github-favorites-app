import React from "react";
import { render, fireEvent } from "@testing-library/react";
import RepoList from "../components/RepoList";
import { RepoItemProps } from "../components/RepoItem";
// Mock RepoItem component to prevent its actual logic from running during the test.
jest.mock("../components/RepoItem", () => (props: RepoItemProps) => {
  return (
    <div data-testid={`repo-item-${props.repo.id}`}>
      {props.repo.fullName}
      <button onClick={() => props.onRemove(props.repo.id)}>Remove</button>
    </div>
  );
});

const mockRepos = [
  {
    id: "1",
    fullName: "mock/repo1",
    stargazersCount: 123,
    language: "TypeScript",
    url: "https://github.com/mock/repo1",
    createdAt: "2022-01-01T00:00:00Z",
  },
  {
    id: "2",
    fullName: "mock/repo2",
    stargazersCount: 50,
    language: "JavaScript",
    url: "https://github.com/mock/repo2",
    createdAt: "2021-01-01T00:00:00Z",
  },
];

describe("RepoList", () => {
  it("renders a list of repositories", () => {
    const { getByTestId } = render(
      <RepoList
        repos={mockRepos}
        sortType={{ type: "none", direction: "asc" }}
        onRepoRemove={() => {}}
      />
    );

    expect(getByTestId("repo-item-1")).toBeInTheDocument();
    expect(getByTestId("repo-item-2")).toBeInTheDocument();
  });

  it("sorts repositories based on stargazersCount", () => {
    const { container } = render(
      <RepoList
        repos={mockRepos}
        sortType={{ type: "stargazersCount", direction: "desc" }}
        onRepoRemove={() => {}}
      />
    );

    const items = container.querySelectorAll('[data-testid^="repo-item"]');
    expect(items[0]).toHaveTextContent("mock/repo1");
    expect(items[1]).toHaveTextContent("mock/repo2");
  });

  it("sorts repositories based on createdAt", () => {
    const { container } = render(
      <RepoList
        repos={mockRepos}
        sortType={{ type: "createdAt", direction: "asc" }}
        onRepoRemove={() => {}}
      />
    );

    const items = container.querySelectorAll('[data-testid^="repo-item"]');
    expect(items[0]).toHaveTextContent("mock/repo2");
    expect(items[1]).toHaveTextContent("mock/repo1");
  });

  it("triggers onRepoRemove prop when remove button is clicked", () => {
    const handleRemove = jest.fn();
    const { getAllByText } = render(
      <RepoList
        repos={mockRepos}
        sortType={{ type: "none", direction: "asc" }}
        onRepoRemove={handleRemove}
      />
    );
    const [removeButton] = getAllByText("Remove");
    fireEvent.click(removeButton);

    expect(handleRemove).toHaveBeenCalled();
  });
});
