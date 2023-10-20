// src/tests/App.test.tsx

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "../src/App";
import { useMutation, useQueryClient } from "react-query";

// Mocking necessary parts
jest.mock("react-query", () => ({
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

describe("App", () => {
  beforeEach(() => {
    // Mock global fetch function to avoid making actual HTTP requests during the test
    global.fetch = jest
      .fn()
      .mockResolvedValue({ json: jest.fn().mockResolvedValue({ repos: [] }) });

    // Mock react-query hooks
    (useMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      data: null,
      error: null,
      isSuccess: false,
      isLoading: false,
    });
    (useQueryClient as jest.Mock).mockReturnValue({
      invalidateQueries: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the SearchBar component", () => {
    const { getByPlaceholderText } = render(<App />);
    const searchBarInput = getByPlaceholderText("Search GitHub repos...");
    expect(searchBarInput).toBeInTheDocument();
  });

  it.skip("shows an alert when trying to add more than 10 repositories", async () => {
    const mockRepos = new Array(11).fill(null).map((_, index) => ({
      id: index,
      fullName: `repo${index}`,
      createdAt: new Date().toISOString(),
      stargazersCount: 100 + index,
      language: "JavaScript",
      url: `https://github.com/user/repo${index}`,
    }));

    const handleSelect = jest.fn();

    // Render App with mock repos
    const { getByPlaceholderText } = render(<App />);

    // Simulate user searching for a repo
    fireEvent.change(getByPlaceholderText("Search GitHub repos..."), {
      target: { value: "mockRepo" },
    });

    // Select a repo to add to the list
    handleSelect(mockRepos[10]);

    // Check for alert
    expect(window.alert).toHaveBeenCalledWith(
      "You can save up to 10 repositories only."
    );
  });
});
