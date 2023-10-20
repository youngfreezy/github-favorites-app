// src/tests/SearchBar.test.tsx

import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import SearchBar from "../components/SearchBar";
import axios from 'axios';

// Mocking axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("SearchBar", () => {
  it("renders a list of repositories upon a successful search", async () => {
    // Prepare a fake response for the axios call
    const fakeResponse = {
      data: {
        items: [
          { id: "1", name: "repo1", full_name: "user/repo1", description: "description1", language: "JavaScript", stargazers_count: 100 },
          { id: "2", name: "repo2", full_name: "user/repo2", description: "description2", language: "TypeScript", stargazers_count: 50 }
        ]
      }
    };
    mockedAxios.get.mockResolvedValue(fakeResponse);

    const handleSearch = jest.fn();
    const handleSelect = jest.fn();
    const setSearchTerm = jest.fn();

    const { getByPlaceholderText, findByText } = render(<SearchBar onSearch={handleSearch} onSelect={handleSelect} value="" setSearchTerm={setSearchTerm} />);

    // Simulate user typing into the input field
    fireEvent.change(getByPlaceholderText("Search GitHub repos..."), {
      target: { value: "test-repo" },
    });

    // Wait for the debounced API call and subsequent rendering of the list items
    const repo1 = await findByText("user/repo1");
    const repo2 = await findByText("user/repo2");

    // Assertions
    expect(repo1).toBeInTheDocument();
    expect(repo2).toBeInTheDocument();
  });
});
