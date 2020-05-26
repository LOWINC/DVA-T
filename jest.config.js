module.exports = {
  collectCoverage: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.js?$": "babel-jest",
  },
  testRegex: "/__test__/.*.test.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
