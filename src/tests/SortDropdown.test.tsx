// src/tests/SortDropdown.test.tsx

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SortDropdown from "../components/SortDropdown";

describe("SortDropdown", () => {
  const mockOnChange = jest.fn();

  it("renders the dropdown with correct options", () => {
    const { getByText } = render(
      <SortDropdown
        value={{ type: "none", direction: "asc" }}
        onChange={mockOnChange}
      />
    );

    // Check if the dropdown renders correct options
    expect(getByText("Stars")).toBeInTheDocument();
    expect(getByText("Created")).toBeInTheDocument();
    expect(getByText("Select Sort")).toBeInTheDocument();
  });

  it("toggles the sort direction when the button is clicked", () => {
    const { getByRole } = render(
      <SortDropdown
        value={{ type: "none", direction: "asc" }}
        onChange={mockOnChange}
      />
    );

    // Find the toggle button
    const button = getByRole("button");

    // Click the button
    fireEvent.click(button);

    // Check if the onChange function is called with the correct value
    expect(mockOnChange).toHaveBeenCalledWith({
      type: "none",
      direction: "desc",
    });

    // Click the button again
    fireEvent.click(button);

    // Check if the onChange function is called again with the opposite value
    expect(mockOnChange).toHaveBeenCalledWith({
      type: "none",
      direction: "asc",
    });
  });
});
