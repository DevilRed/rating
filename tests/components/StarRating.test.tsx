import { render, screen } from "@testing-library/react";
import { StarRating } from "../../src/components/StarRating";

vi.mock("./StarRating.css", () => ({}));

describe("StarRating", () => {
  it("renders the correct number of stars", () => {
    render(<StarRating totalStars={5} />);
    const starContainers = screen.getAllByTestId(/star-/i);
    expect(starContainers).toHaveLength(5);
  });
});
