import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import NewReportPage from "./page";
import { useEmployeeState, useShiftState } from "@/store/zustand";
import { useRouter } from "next/navigation";

// Mock external dependencies
jest.mock("@/store/zustand", () => ({
  useEmployeeState: jest.fn(),
  useShiftState: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/components/share/Whatsapp", () => ({
  encodeWhatsAppMessage: jest.fn(),
}));

jest.mock("@/hooks/use-is-mounted", () => ({
  useIsMounted: () => true,
}));

describe("NewReportPage", () => {
  const mockRouter = {
    back: jest.fn(),
    push: jest.fn(),
  };

  const mockEmployeeState = {
    items: [],
    add: jest.fn(),
    remove: jest.fn(),
  };

  const mockShiftState = {
    data: {
      date: "2024-03-04",
      total: 1000,
      tips: 200,
    },
    update: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useEmployeeState as unknown as jest.Mock).mockReturnValue(
      mockEmployeeState,
    );
    (useShiftState as unknown as jest.Mock).mockReturnValue(mockShiftState);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders main sections correctly", () => {
    render(<NewReportPage />);

    expect(screen.getByText("דוח טיפים")).toBeInTheDocument();
    expect(screen.getByText("קופה")).toBeInTheDocument();
    expect(screen.getByText("טיפים")).toBeInTheDocument();
    expect(screen.getByText("תאריך")).toBeInTheDocument();
  });

  test("adds employee correctly", () => {
    render(<NewReportPage />);

    const input = screen.getByPlaceholderText("הוסף איש צוות");
    const addButton = screen.getByLabelText("add-employee");

    fireEvent.change(input, { target: { value: "John 8" } });
    fireEvent.click(addButton);

    expect(mockEmployeeState.add).toHaveBeenCalledWith({
      name: "John",
      hours: 8,
    });
  });

  test("shows error for invalid employee input", () => {
    render(<NewReportPage />);

    const input = screen.getByPlaceholderText("הוסף איש צוות");
    const addButton = screen.getByLabelText("add-employee");

    expect(addButton).toBeDisabled();

    // Invalid format
    fireEvent.change(input, { target: { value: "InvalidInput" } });
    fireEvent.click(addButton);
    expect(
      screen.getByText("יש להזין שעות בפורמט שעתי או עשרוני"),
    ).toBeInTheDocument();
  });

  test("updates shift details", () => {
    render(<NewReportPage />);

    const dateInput = screen.getByPlaceholderText("בחר תאריך");
    const inputs = screen.getAllByPlaceholderText("0");
    const totalInput = inputs[0];
    const tipsInput = inputs[1];

    fireEvent.change(dateInput, {
      target: { value: "2024-03-05", name: "date" },
    });
    fireEvent.change(totalInput, { target: { value: "1500", name: "total" } });
    fireEvent.change(tipsInput, { target: { value: "300", name: "tips" } });

    expect(mockShiftState.update).toHaveBeenCalledTimes(3);
  });

  test("toggles time display", () => {
    render(<NewReportPage />);

    const numberDisplay = screen.getByText("מספר");
    const timeDisplay = screen.getByText("שעות");

    fireEvent.click(timeDisplay);
    expect(numberDisplay).not.toHaveClass("bg-white");
    expect(timeDisplay).toHaveClass("bg-white");
  });

  test("opens employee menu modal", () => {
    const employees = [{ id: "1", name: "John", hours: 8, image: "" }];
    (useEmployeeState as unknown as jest.Mock).mockReturnValue({
      ...mockEmployeeState,
      items: employees,
    });

    render(<NewReportPage />);

    const employeeButton = screen.getByText("John");
    fireEvent.click(employeeButton);

    expect(screen.getByText(`הסר את John`)).toBeInTheDocument();
  });
});
