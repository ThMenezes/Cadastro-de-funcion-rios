// abrir modal de novo cadastramento //
const openModal = () => document.getElementById('modal')
.classList.add('active')

const closeModal = () => document.getElementById('modal')
.classList.remove('active')

document.getElementById('cadastrarFuncionario')
.addEventListener("click", openModal)

document.getElementById("modalClose")
.addEventListener("click", closeModal)

const informacoesFuncionarios = {
    nome: "Luan",
    email: "luan@gmail.com",
    celular: "11967583922",
    cargo: "Administrativo",
    cidade: "São Paulo"
}

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
