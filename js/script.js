const content = document.querySelector('.content')
const btnSearch = document.getElementById('search')

const getCep = cep => `https://viacep.com.br/ws/${cep}/json/`


btnSearch.addEventListener('click', getCepValue)

function getCepValue(event) {
    event.preventDefault()
    const cep = document.querySelector('#cep').value
    validadeCep(cep)
}

function validadeCep(cep) {
    if (!cep) {
        document.getElementById("aviso")
            .innerText = 'Campo vazio, preencha o campo com um CEP'
            return
    } 
    else if (cep.length != 8) {
        document.getElementById("aviso")
            .innerText = 'Preencha o campo corretamente'
            return
    }
       
    const cepValidated = cep.split("-").join("")
    generateCep(cepValidated)
}

const generateCep = (cepValidated) => fetch(getCep(cepValidated))
    .then(response => response.json())
    .then(data => {
        if(data.erro == true) {
            document.getElementById("aviso")
                .innerText = 'CPF inválido'
        } else {
            document.getElementById("aviso")
                .innerText = 'Infome o CEP sem (-) e letras'

            document.getElementById('uf')
                .innerText = data.uf ? data.uf : ""
            document.getElementById('localidade')
                .innerText = data.localidade ? data.localidade : ""
            document.getElementById('bairro')
                .innerText = data.bairro ? data.bairro : ""
            document.getElementById('complemento')
                .innerText = data.complemento ? data.complemento : "(sem complemento)"
            document.getElementById('logradouro')
                .innerText = data.logradouro ? data.logradouro : ""
            document.getElementById('ddd')
                .innerText = data.ddd ? data.ddd : ""
        }
    })
    .catch(() => {
        console.log('Erro ao regastar o CEP, tente novamente');
    })
