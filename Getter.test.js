import {Getter, Poster, Putter, Deletter} from "./Getter";

describe("Getter", () => {
  test("should return the number greater than this one", async () => {
    const result = await Getter();
    // I've added this for troubleshooting
    console.log(result);
    expect(result).toBeGreaterThan(1623280800);
  });
});

describe("Poster", () => {
  test("should return the number greater than this one", async () => {
    const result = await Poster();
    // I've added this for troubleshooting
    console.log(result);
    expect(result).toBeGreaterThan(1623280800);
  });
});

describe("Putter", () => {
  test("should return the number greater than this one", async () => {
    const result = await Putter();
    // I've added this for troubleshooting
    console.log(result);
    expect(result).toBeGreaterThan(1623280800);
  });
});

describe("Deletter", () => {
  test("should return the number greater than this one", async () => {
    const result = await Deletter();
    // I've added this for troubleshooting
    console.log(result);
    expect(result).toBeGreaterThan(1623280800);
  });
});
