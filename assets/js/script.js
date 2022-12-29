// abrir modal de novo cadastramento //
const openModal = () => document.getElementById('modal')
.classList.add('active')

const closeModal = () => {
    apagarCampos()
    document.getElementById('modal')
.classList.remove('active')
}

document.getElementById('cadastrarFuncionario')
.addEventListener("click", openModal)

document.getElementById("modalClose")
.addEventListener("click", closeModal)

// envio e retorno dos dados ao localStorage //
const getLocalStorage = () => JSON.parse(localStorage.getItem("dados_funcionarios")) ?? []
const setLocalStorage = (dadosFuncionarios) => localStorage.setItem("dados_funcionarios", JSON.stringify(dadosFuncionarios))

//CRUD - Creat- (Criar), Read (ler), Update (atualizar), Delete (excluir) //
const criarFuncionario = (funcionario) => {
    const dadosFuncionarios = getLocalStorage() 
    dadosFuncionarios.push (funcionario)
    setLocalStorage(dadosFuncionarios)   
}

const readFuncionario = () => getLocalStorage()

const updateFuncionario = (index, funcionario) => {
    const dadosFuncionarios = readFuncionario()
    dadosFuncionarios[index] = funcionario
    setLocalStorage(dadosFuncionarios)
}

const deleteFuncionario = (index) => {
    const dadosFuncionarios = readFuncionario()
    dadosFuncionarios.splice(index,1)
    setLocalStorage(dadosFuncionarios)
}

// validando e adicionando evento ao salvar //
const campoValido = () => {
    return document.getElementById("formulario").reportValidity()
}

const apagarCampos = () => {
    const campos = document.querySelectorAll('.modal-field')
    campos.forEach(campo => campo.value = "")
}

const salvarFuncionario = () => {
    if (campoValido()) {
        const funcionario = {
        nome: document.getElementById('nome').value,
        email:document.getElementById('email').value,
        celular:document.getElementById('celular').value,
        cargo:document.getElementById('cargo').value,
        cidade:document.getElementById('cidade').value
    }
    criarFuncionario(funcionario)
    atualizarTabela()
     closeModal()
    }
}

document.getElementById('salvar')
.addEventListener("click", salvarFuncionario)

// adicionando informações na tela //
const criarLinha = (funcionario) => {
    const novaLinha = document.createElement('tr')
    novaLinha.innerHTML = `
    <td>${funcionario.nome}</td>
    <td>${funcionario.email}</td>
    <td>${funcionario.celular}</td>
    <td>${funcionario.cargo}</td>
    <td>${funcionario.cidade}</td>
    <td>
        <button type="button" class="botao editar">Editar</button>
        <button type="button" class="botao excluir">Excluir</button>
    </td>`
    document.querySelector('#tabelaFuncionario>tbody').appendChild(novaLinha)
}

const apagarTabela = () => {
    const linhas = document.querySelectorAll('#tabelaFuncionario>tbody tr')
    linhas.forEach(linha => linha.parentNode.removeChild(linha))
}

const atualizarTabela = () => {
    const dadosFuncionarios = readFuncionario()
    apagarTabela()
    dadosFuncionarios.forEach(criarLinha)
}

atualizarTabela()