import { parse } from "@babel/parser"
import traverse from "@babel/traverse"
import generate from "@babel/generator"

const code = `let a = 'let'; let b = 2`
// code => ast
const ast = parse(code, { sourceType: 'module' })

// changfe ast
traverse(ast, {
    // 每进入一个节点 执行enter函数
    enter: item => {
        if(item.node.type === 'VariableDeclaration') {
            if(item.node.kind === 'let'){
                item.node.kind = 'var'
            }
        }
    }
})
// 通过ast 生成新的代码
const result = generate(ast, {}, code)
console.log(result.code)
