// Sync object
export default{
  // preset: "ts-jest/presets/default-esm",
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  // 是否收集覆盖率，开启会降低测试速度
  collectCoverage: false, 
  // 指出仅哪些文件需要收集覆盖率信息，可以使用通配模式
  collectCoverageFrom:[
    'src/controller/**/*.ts',
    'src/dioService/**/*.ts',
    'src/lib/utils.ts',
  ],
  // 测试覆盖率输出文件夹
  coverageDirectory: "coverage",
  // 提供覆盖率的引擎，v8或babel
  coverageProvider: "v8",
  // 覆盖率展示样式
  // coverageReporters:["clover", "json", "lcov", ["text", {"skipFull": true}]],
  // 开启ESM支持
  // extensionsToTreatAsEsm:['.ts'],
  // 测试环境
  testEnvironment: "node",
  // 指示是否应在运行期间报告每个单独的测试
  verbose: true,
};
