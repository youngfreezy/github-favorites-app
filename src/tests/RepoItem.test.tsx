import React from "react";
import { render, fireEvent } from "@testing-library/react";
import RepoItem from "../components/RepoItem";

const mockRepo = {
  id: "1",
  fullName: "mock/repo",
  stargazersCount: 123,
  language: "TypeScript",
  url: "https://github.com/mock/repo",
  createdAt: "2022-01-01T00:00:00Z",
};

describe("RepoItem", () => {
  it("renders repo details correctly", () => {
    const { getByText } = render(
      <RepoItem repo={mockRepo} onRemove={() => {}} />
    );

    expect(getByText("mock/repo")).toBeInTheDocument();
  });

  it("triggers onRemove prop when remove button is clicked", () => {
    const handleRemove = jest.fn();
    const { getByText } = render(
      <RepoItem repo={mockRepo} onRemove={handleRemove} />
    );

    fireEvent.click(getByText("Remove"));
    expect(handleRemove).toHaveBeenCalledTimes(1);
  });

  it("renders repo without stars if stargazersCount is undefined", () => {
    const repoWithoutStars = { ...mockRepo, stargazersCount: undefined };
    const { queryByText } = render(
      <RepoItem repo={repoWithoutStars} onRemove={() => {}} />
    );

    expect(queryByText("Stars:")).toBeNull();
  });
});
