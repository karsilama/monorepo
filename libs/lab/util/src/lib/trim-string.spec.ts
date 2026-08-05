import { trimString } from "./trim-string";

describe("Trim string util", () => {
  it("should remove leading and trailing spaces", () => {
    expect(trimString(" 5 ")).toBe("5");
  });

  it("should not change a string without surrounding spaces", () => {
    expect(trimString("hello")).toBe("hello");
  });

  it("should return an empty string when input is only spaces", () => {
    expect(trimString("   ")).toBe("");
  });
});
