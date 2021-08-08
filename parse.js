const { parse } = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default
const t = require('@babel/types')
let code = `
function fn (a, b) {
  function f1 () {
    let a = 1
    return a
  }
  function f2 () {
    let b = 2
    return b
  }
  let c = f1()
  return c
}
// fn()
`

let ast = parse(code)


// 自定义插件
traverse(ast, {

  // enter (path) {
  //   if (t.isFunctionDeclaration(path.node)) {
  //     console.log(path.node.id.name, t.isReferenced(path.node, path.parent))
  //   }
  // },
  FunctionDeclaration (path) {
    console.log(path.node.id.name)
  }
})
console.log(generate(ast, {}, code))