const divisao = document.querySelector(".divisao")
const apagaEnter = document.querySelector("#apagar-e-enter")
const primeiraLinha = document.querySelector("#primeiraLinha")
const segundaLinha = document.querySelector("#segundaLinha")
const terceiraLinha = document.querySelector("#terceiraLinha")

const teclaPrimeira = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']

const teclaSegunda = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']

const teclaTerceira = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']

const linha = 6
const coluna = 5
let linhaAtual = 0
let colunaAtual = 0

let palavras = ['SENAI', 'MILHO', 'NOITE', 'LETRA', 'MOUSE', 'LIVRO', 'NEGRO', 'TERMO', 'MEXER','NOBRE','SENSO', 'AFETO', 'ETICA','AVIAO','AGUIA','FERRO','FAZER','VIGOR','MORAL','AMIGO','ANEXO','TEMPO','CASAL', 'GENRO','AINDA', 'CENSO','DEUSA','LINDA','SERVO','ONTEM','MEIGA','AFOGA','LUGAR','CISMA', 'GERAR','GENIO', 'PLENO', 'ENFIM','OLHAR','BRAVO']
let palavra = palavras[Math.floor(Math.random() * palavras.length)]
console.log(palavra)

let palavraMapa = {}
for (let i = 0; i < palavra.length; i++) {
    palavraMapa[palavra[i]] = i
}
const tentativas = []

for (let linhaIndex = 0; linhaIndex < linha; linhaIndex++) {
    tentativas[linhaIndex] = new Array(coluna)
    const divisaoLinha = document.createElement('div')
    divisaoLinha.setAttribute('id', 'linha' + linhaIndex)
    divisaoLinha.setAttribute('class', 'div-linha')
    for (let colunaIndex = 0; colunaIndex < coluna; colunaIndex++) {
        const divisaoColuna = document.createElement('div')
        divisaoColuna.setAttribute('id', 'linha' + linhaIndex + 'coluna' + colunaIndex)
        let classColuna
        if (linhaIndex === 0) {
            classColuna = 'div-coluna digitando'
        } else {
            classColuna = 'div-coluna desativado'
        }
        divisaoColuna.setAttribute('class', classColuna)
        divisaoLinha.append(divisaoColuna)
        tentativas[linhaIndex][colunaIndex] = ''
    }
    divisao.append(divisaoLinha)
}

const checkTentativas = () => {
    const tentativa = tentativas[linhaAtual].join("")
    if (tentativa.length !== coluna) {
        return;
    }
    let atColuna = document.querySelectorAll(".digitando")
    for (let i = 0; i < coluna; i++) {
        const letra = tentativa[i]
        if (palavraMapa[letra] === undefined) {
            atColuna[i].classList.add('errado')
        } else {
            if (palavraMapa[letra] === i) {
                atColuna[i].classList.add('certo')
            } else {
                atColuna[i].classList.add('deslocado')
            }
        }
    }
    if (tentativa === palavra) {
        window.alert("parabéns você é um/a grande campeão/ã")
        return
    } else {
        if (linhaAtual === linha - 1) {
            window.alert("Errou você é BETA")
        } else {
            proximaLinha()
        }
    }
}

const proximaLinha = () => {
    let digColuna = document.querySelectorAll(".digitando")
    for (let i = 0; i < digColuna.length; i++) {
        digColuna[i].classList.remove('digitando')
        digColuna[i].classList.add('desativado')
    }
    linhaAtual++
    colunaAtual = 0

    const linhaAtualElemento = document.querySelector('#linha' + linhaAtual)
    let atColuna = linhaAtualElemento.querySelectorAll('.div-coluna')
    for (let i = 0; i < atColuna.length; i++) {
        atColuna[i].classList.remove('desativado')
        atColuna[i].classList.add('digitando')
    }
}
const tecladoOnclick = key => {
    if (colunaAtual === coluna) {
        return
    }
    const divAtual = document.querySelector("#linha" + linhaAtual + "coluna" + colunaAtual)
    divAtual.textContent = key
    tentativas[linhaAtual][colunaAtual] = key
    colunaAtual++
}



const criarLinhaTeclado = (keys, linhaTeclado) => {
    keys.forEach(key => {
        let botaoElemento = document.createElement("button")
        botaoElemento.textContent = key
        botaoElemento.setAttribute('id', key)
        botaoElemento.addEventListener('click', () => tecladoOnclick(key))
        linhaTeclado.append(botaoElemento)
    })
}

criarLinhaTeclado(teclaPrimeira, primeiraLinha)
criarLinhaTeclado(teclaSegunda, segundaLinha)
criarLinhaTeclado(teclaTerceira, terceiraLinha)

const backspace = () => {
    if (colunaAtual === 0) {
        return
    }
    colunaAtual--
    tentativas[linhaAtual][colunaAtual] = ''
    const div = document.querySelector('#linha' + linhaAtual + "coluna" + colunaAtual)
    div.textContent = ''
}

const backspaceBotao = document.createElement('button')
backspaceBotao.addEventListener('click', backspace)
backspaceBotao.textContent = '<x'
apagaEnter.append(backspaceBotao)

const enterBotao = document.createElement('button')
enterBotao.addEventListener('click', checkTentativas)
enterBotao.textContent = 'ENTER'
apagaEnter.append(enterBotao)

document.onkeydown = function (evt) {
    evt = evt || window.evt
    if (evt.key === 'Enter') {
        checkTentativas()
    } else if (evt.key === 'Backspace') {
        backspace()
    } else {
        tecladoOnclick(evt.key.toUpperCase())
    }
}