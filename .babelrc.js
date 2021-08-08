module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: 'defaults',
        useBuiltIns: 'usage',
        corejs: 3
      }
    ],
    // "@babel/preset-react"
  ],
  plugins: [
    ["@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": 3,
        "helpers": true,
        "regenerator": true,
      }],
    // [
    //   "import",
    //   {
    //     libraryName: "antd",
    //     libraryDirectory: "es",
    //     style: true,
    //   },
    //   'antd'
    // ],
    // [
    //   "import",
    //   {
    //     libraryName: "biosan-front",
    //     libraryDirectory: "es",
    //     style: true,
    //     camel2DashComponentName: false,
    //     customStyleName: (name) => {
    //       return `biosan-front/es/${name}/style/index.less`
    //     },
    //   },
    //   "biosan-front"
    // ]
  ]
}