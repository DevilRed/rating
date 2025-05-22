import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import App from "../src/App";

describe("App", () => {
  it("renders correctly", () => {
    render(<App />);
    expect(screen.getByText(/Star Rating/i)).toBeInTheDocument();
  });
});
