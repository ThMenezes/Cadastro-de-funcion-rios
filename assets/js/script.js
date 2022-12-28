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
    nome: "Ryan",
    email: "ryan@gmail.com",
    celular: "11967583922",
    cargo: "Chefe",
    cidade: "São Paulo"
}

// envio e retorno dos dados ao localStorage //
const getLocalStorage = () => JSON.parse(localStorage.getItem("dados_funcionarios")) ?? []
const setLocalStorage = (dadosFuncionarios) => localStorage.setItem("dados_funcionarios", JSON.stringify(dadosFuncionarios))

// crud - Creat- (Criar) //
const criarFuncionario = (funcionario) => {
    const dadosFuncionarios = getLocalStorage() 
    dadosFuncionarios.push (funcionario)
    setLocalStorage(dadosFuncionarios)   
}
