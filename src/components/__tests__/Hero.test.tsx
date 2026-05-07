import { render, screen } from "@testing-library/react";
import Hero from "../Hero";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  },
  useScroll: () => ({
    scrollYProgress: { get: () => 0 },
  }),
  useTransform: () => "0%",
}));

// Mock useRef
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useRef: () => ({ current: null }),
  useState: jest.fn(),
  useEffect: jest.fn(),
}));

describe("Hero Component", () => {
  it("should render the component", () => {
    render(<Hero />);
    // Hero component should render without crashing
    expect(document.querySelector("section")).toBeInTheDocument();
  });
});
