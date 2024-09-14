import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useRouter } from "next/navigation";
import SignForm from "@/app/sign-up/signForm";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

describe("SignForm Component", () => {
  it("renders the form with all inputs and button", () => {
    render(<SignForm />);

    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign Up/i })
    ).toBeInTheDocument();
  });

  it("displays validation errors when inputs are empty and form is submitted", async () => {
    render(<SignForm />);

    fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

    expect(await screen.findAllByText(/This field is required/i)).toHaveLength(
      3
    );
  });

  it("calls onSubmit with form data when form is submitted", async () => {
    const consoleSpy = vi.spyOn(console, "log");
    render(<SignForm />);

    fireEvent.input(screen.getByLabelText(/Email Address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.input(screen.getByLabelText(/Full Name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.input(screen.getByLabelText(/Password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

    expect(consoleSpy).toHaveBeenCalledWith({
      email: "test@example.com",
      name: "John Doe",
      password: "password123",
    });
  });

  // it("navigates to login page when 'Log in' is clicked", () => {
  //   const push = vi.fn();
  //   (useRouter as vi.Mock).mockReturnValue({ push });

  //   render(<SignForm />);

  //   fireEvent.click(screen.getByText(/Log in/i));

  //   expect(push).toHaveBeenCalledWith("/login");
  // });
});
