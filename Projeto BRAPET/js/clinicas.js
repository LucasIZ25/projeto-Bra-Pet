let clinicas = [
    {
        nome: "Clínica Veterinária Pet Vida",
        cidade: "Brasília",
        endereco: "Clinica Veterinaria Pet Vida Brasilia DF"
    },
    {
        nome: "Hospital Veterinário Brasília",
        cidade: "Brasília",
        endereco: "Hospital Veterinario Brasilia DF"
    },
    {
        nome: "Clínica Animal Care",
        cidade: "Goiânia",
        endereco: "Clinica Animal Care Goiania"
    }
];

function buscarCep() {

    let cep = document.getElementById("cep").value;

    fetch("https://viacep.com.br/ws/" + cep + "/json/")
    .then(res => res.json())
    .then(dados => {

        let cidadeUsuario = dados.localidade;

        let resultado = `
        <b>Seu endereço:</b><br>
        ${dados.logradouro} - ${dados.bairro}<br>
        ${dados.localidade} - ${dados.uf}
        <br><br>
        <b>Clínicas próximas:</b><br>
        `;

        clinicas.forEach(clinica => {

            if(clinica.cidade === cidadeUsuario){

                resultado += `
                🐶 ${clinica.nome}
                <br>
                <button onclick="abrirMapa('${clinica.endereco}')">
                Ver no mapa
                </button>
                <br><br>
                `;
            }

        });

        document.getElementById("resultado").innerHTML = resultado;

    });

}

function abrirMapa(endereco){

    let enderecoFormatado = endereco.replace(/ /g, "+");

    let url = "https://www.google.com/maps/search/?api=1&query=" + enderecoFormatado;

    window.open(url, "_blank");

}
