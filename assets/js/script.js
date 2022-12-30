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
    dadosFuncionarios.push(funcionario)
    setLocalStorage(dadosFuncionarios)
}

const lerFuncionario = () => getLocalStorage()

const atualizarFuncionario = (index, funcionario) => {
    const dadosFuncionarios = lerFuncionario()
    dadosFuncionarios[index] = funcionario
    setLocalStorage(dadosFuncionarios)
}

const deleteFuncionario = (index) => {
    const dadosFuncionarios = lerFuncionario()
    dadosFuncionarios.splice(index, 1)
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
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value,
            cargo: document.getElementById('cargo').value,
            setor: document.getElementById('setor').value
        }
        const index = document.getElementById('nome').dataset.index
        if (index == 'new') {
            criarFuncionario(funcionario)
            atualizarTabela()
            closeModal()
        } else {
            atualizarFuncionario(index, funcionario)
            atualizarTabela()
            closeModal()
        }
    }
}

document.getElementById('salvar')
    .addEventListener("click", salvarFuncionario)

// adicionando informações na tela //
const criarLinha = (funcionario, index) => {
    const novaLinha = document.createElement('tr')
    novaLinha.innerHTML = `
    <td>${funcionario.nome}</td>
    <td>${funcionario.email}</td>
    <td>${funcionario.celular}</td>
    <td>${funcionario.cidade}</td>
    <td>${funcionario.cargo}</td>
    <td>${funcionario.setor}</td>
    <td>
        <button type="button" class="botao editar" id="editar-${index}">Editar</button>
        <button type="button" class="botao excluir" id="delete-${index}">Excluir</button>
    </td>`
    document.querySelector('#tabelaFuncionario>tbody').appendChild(novaLinha)
}

const apagarTabela = () => {
    const linhas = document.querySelectorAll('#tabelaFuncionario>tbody tr')
    linhas.forEach(linha => linha.parentNode.removeChild(linha))
}

const atualizarTabela = () => {
    const dadosFuncionarios = lerFuncionario()
    apagarTabela()
    dadosFuncionarios.forEach(criarLinha)
}

atualizarTabela()

//funções dos botões editar e excluir//
const preencherCampos = (funcionario) => {
    document.getElementById('nome').value = funcionario.nome
    document.getElementById('email').value = funcionario.email
    document.getElementById('celular').value = funcionario.celular
    document.getElementById('cidade').value = funcionario.cidade
    document.getElementById('cargo').value = funcionario.cargo
    document.getElementById('setor').value = funcionario.setor
    document.getElementById('nome').dataset.index = funcionario.index
}

const editarFuncionario = (index) => {
    const funcionario = lerFuncionario()[index]
    funcionario.index = index
    preencherCampos(funcionario)
    openModal()
}

const editarDelete = (evento) => {
    if (evento.target.type == 'button') {

        const [action, index] = evento.target.id.split('-')

        if (action == 'editar') {
            editarFuncionario(index)
        } else {
            const funcionario = lerFuncionario()[index]
            const response = confirm(`Deseja realmente excluir o cliente ${funcionario.nome}`)
            if (response) {
                deleteFuncionario(index)
                atualizarTabela()
            }
        }
    }
}

document.querySelector('#tabelaFuncionario')
    .addEventListener("click", editarDelete)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)

