import {Getter, Poster, Putter, Deleter} from "./Getter";

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

describe("Deleter", () => {
  test("should return the number greater than this one", async () => {
    const result = await Deleter();
    // I've added this for troubleshooting
    console.log(result);
    expect(result).toBeGreaterThan(1623280800);
  });
});
