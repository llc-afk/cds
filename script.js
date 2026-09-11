```javascript
/* =========================================
   CONFIGURAÇÕES
========================================= */


/*
   IMPORTANTE:

   Quando você criar o Instagram oficial da empresa,
   substitua o valor abaixo.

   Exemplo:

   const INSTAGRAM_EMPRESA =
   "https://www.instagram.com/nexoraweb/";
*/

const INSTAGRAM_EMPRESA =
    "https://www.instagram.com/SEU_INSTAGRAM_AQUI/";


/* =========================================
   DADOS DO PEDIDO
========================================= */

const pedido = {

    servico: "",

    recursos: [],

    precoBase: 0,

    precoRecursos: 0,

    precoTotal: 0,

    nome: "",

    telefone: "",

    empresa: "",

    descricao: ""

};


/* =========================================
   PREÇOS DOS SERVIÇOS
========================================= */

const precosServicos = {

    "Site Básico": 500,

    "Landing Page": 700,

    "Loja Virtual": 1500,

    "Projeto Completo": 2500,

    "Manutenção de Site": 0

};


/* =========================================
   MENU MOBILE
========================================= */

const menuButton =
    document.getElementById("menuButton");

const nav =
    document.getElementById("nav");


if (menuButton) {

    menuButton.addEventListener(
        "click",
        () => {

            nav.classList.toggle("open");

        }
    );

}


/* =========================================
   IR PARA PEDIDO
========================================= */

function irParaPedido() {

    document
        .getElementById("pedido")
        .scrollIntoView({

            behavior: "smooth"

        });

}


/* =========================================
   ESCOLHER SERVIÇO PELOS CARDS
========================================= */

function escolherServico(servico) {

    pedido.servico = servico;

    pedido.precoBase =
        precosServicos[servico] || 0;


    document
        .querySelectorAll(
            ".selection-card"
        )
        .forEach(card => {

            card.classList.remove(
                "selected"
            );

            if (
                card.dataset.service === servico
            ) {

                card.classList.add(
                    "selected"
                );

            }

        });


    irParaPedido();

}


/* =========================================
   SELECIONAR SERVIÇO NO FORMULÁRIO
========================================= */

function selecionarServicoFormulario(card) {

    const servico =
        card.dataset.service;


    pedido.servico =
        servico;


    pedido.precoBase =
        precosServicos[servico] || 0;


    document
        .querySelectorAll(
            ".selection-card"
        )
        .forEach(item => {

            item.classList.remove(
                "selected"
            );

        });


    card.classList.add(
        "selected"
    );

}


/* =========================================
   PRÓXIMA ETAPA
========================================= */

function nextStep(numero) {

    /*
       ETAPA 1
    */

    if (numero === 2) {

        if (
            pedido.servico === ""
        ) {

            alert(
                "Escolha o tipo de serviço que você precisa."
            );

            return;

        }

    }


    /*
       ETAPA 3
    */

    if (numero === 3) {

        atualizarRecursos();

    }


    /*
       ETAPA 4
    */

    if (numero === 4) {

        const nome =
            document
                .getElementById(
                    "clientName"
                )
                .value
                .trim();


        const telefone =
            document
                .getElementById(
                    "clientPhone"
                )
                .value
                .trim();


        if (
            nome === "" ||
            telefone === ""
        ) {

            alert(
                "Preencha seu nome e telefone para continuar."
            );

            return;

        }


        atualizarDadosCliente();

        atualizarResumo();

        calcularPreco();

    }


    trocarEtapa(numero);

}


/* =========================================
   VOLTAR ETAPA
========================================= */

function previousStep(numero) {

    trocarEtapa(numero);

}


/* =========================================
   TROCAR ETAPA
========================================= */

function trocarEtapa(numero) {

    /*
       ESCONDER ETAPAS
    */

    document
        .querySelectorAll(
            ".form-step"
        )
        .forEach(step => {

            step.classList.remove(
                "active"
            );

        });


    /*
       MOSTRAR ETAPA ATUAL
    */

    document
        .getElementById(
            "step" + numero
        )
        .classList.add(
            "active"
        );


    /*
       ATUALIZAR INDICADOR
    */

    document
        .querySelectorAll(
            ".step"
        )
        .forEach(step => {

            const stepNumber =
                Number(
                    step.dataset.step
                );


            step.classList.remove(
                "active"
            );


            if (
                stepNumber <= numero
            ) {

                step.classList.add(
                    "active"
                );

            }

        });


    /*
       VOLTAR PARA O TOPO
       DO FORMULÁRIO
    */

    document
        .getElementById(
            "pedido"
        )
        .scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

}


/* =========================================
   ATUALIZAR RECURSOS
========================================= */

function atualizarRecursos() {

    const checkboxes =
        document.querySelectorAll(
            ".feature-option input"
        );


    pedido.recursos = [];

    pedido.precoRecursos = 0;


    checkboxes.forEach(
        checkbox => {

            if (
                checkbox.checked
            ) {

                pedido.recursos.push({

                    nome:
                        checkbox.value,

                    preco:
                        Number(
                            checkbox.dataset.price
                        )

                });


                pedido.precoRecursos +=
                    Number(
                        checkbox.dataset.price
                    );

            }

        }
    );

}


/* =========================================
   ATUALIZAR DADOS DO CLIENTE
========================================= */

function atualizarDadosCliente() {

    pedido.nome =
        document
            .getElementById(
                "clientName"
            )
            .value
            .trim();


    pedido.telefone =
        document
            .getElementById(
                "clientPhone"
            )
            .value
            .trim();


    pedido.empresa =
        document
            .getElementById(
                "clientBusiness"
            )
            .value
            .trim();


    pedido.descricao =
        document
            .getElementById(
                "clientDescription"
            )
            .value
            .trim();

}


/* =========================================
   CALCULAR PREÇO
========================================= */

function calcularPreco() {

    /*
       MANUTENÇÃO
       NÃO TEM PREÇO AUTOMÁTICO
    */

    if (
        pedido.servico ===
        "Manutenção de Site"
    ) {

        document
            .getElementById(
                "priceEstimate"
            )
            .innerHTML = `

                <span>
                    ORÇAMENTO PERSONALIZADO
                </span>

                <strong>
                    Sob consulta
                </strong>

                <small>
                    O valor será definido de acordo
                    com as alterações e melhorias
                    necessárias.
                </small>

            `;

        pedido.precoTotal = 0;

        return;

    }


    pedido.precoTotal =
        pedido.precoBase +
        pedido.precoRecursos;


    const valor =
        pedido.precoTotal
        .toLocaleString(
            "pt-BR",
            {

                style:
                    "currency",

                currency:
                    "BRL"

            }
        );


    document
        .getElementById(
            "priceEstimate"
        )
        .innerHTML = `

            <span>
                ESTIMATIVA INICIAL
            </span>

            <strong>
                ${valor}
            </strong>

            <small>
                Esta é uma estimativa baseada
                nas opções selecionadas.
                O valor final pode variar
                conforme a complexidade
                do projeto.
            </small>

        `;

}


/* =========================================
   ATUALIZAR RESUMO
========================================= */

function atualizarResumo() {

    let recursosHTML =
        "Nenhum recurso adicional selecionado";


    if (
        pedido.recursos.length > 0
    ) {

        recursosHTML =
            pedido.recursos
                .map(
                    recurso =>
                        `<div>• ${recurso.nome}</div>`
                )
                .join("");

    }


    document
        .getElementById(
            "orderSummary"
        )
        .innerHTML = `

            <div class="summary-row">

                <span class="summary-label">
                    Serviço
                </span>

                <div class="summary-value">
                    ${pedido.servico}
                </div>

            </div>


            <div class="summary-row">

                <span class="summary-label">
                    Recursos selecionados
                </span>

                <div class="summary-value">
                    ${recursosHTML}
                </div>

            </div>


            <div class="summary-row">

                <span class="summary-label">
                    Nome
                </span>

                <div class="summary-value">
                    ${pedido.nome}
                </div>

            </div>


            <div class="summary-row">

                <span class="summary-label">
                    Telefone
                </span>

                <div class="summary-value">
                    ${pedido.telefone}
                </div>

            </div>


            <div class="summary-row">

                <span class="summary-label">
                    Empresa / Projeto
                </span>

                <div class="summary-value">
                    ${
                        pedido.empresa ||
                        "Não informado"
                    }
                </div>

            </div>


            <div class="summary-row">

                <span class="summary-label">
                    Descrição
                </span>

                <div class="summary-value">
                    ${
                        pedido.descricao ||
                        "Não informado"
                    }
                </div>

            </div>

        `;

}


/* =========================================
   GERAR MENSAGEM
========================================= */

function gerarMensagemPedido() {

    let recursosTexto =
        "Nenhum recurso adicional selecionado";


    if (
        pedido.recursos.length > 0
    ) {

        recursosTexto =
            pedido.recursos
                .map(
                    recurso =>
                        "- " + recurso.nome
                )
                .join("\n");

    }


    let valorTexto =
        "Orçamento personalizado";


    if (
        pedido.servico !==
        "Manutenção de Site"
    ) {

        valorTexto =
            pedido.precoTotal
            .toLocaleString(
                "pt-BR",
                {

                    style:
                        "currency",

                    currency:
                        "BRL"

                }
            );

    }


    return `
Olá! Gostaria de solicitar um projeto pela NEXORA WEB.

━━━━━━━━━━━━━━━━

SERVIÇO:
${pedido.servico}

RECURSOS:
${recursosTexto}

━━━━━━━━━━━━━━━━

NOME:
${pedido.nome}

TELEFONE:
${pedido.telefone}

EMPRESA / PROJETO:
${pedido.empresa || "Não informado"}

DESCRIÇÃO:
${pedido.descricao || "Não informado"}

━━━━━━━━━━━━━━━━

ESTIMATIVA:
${valorTexto}

Aguardo o retorno para continuar o projeto.
`;

}


/* =========================================
   ENVIAR SOLICITAÇÃO
========================================= */

async function sendOrder() {

    const mensagem =
        gerarMensagemPedido();


    /*
       TENTAR COPIAR
       A MENSAGEM
    */

    try {

        await navigator
            .clipboard
            .writeText(
                mensagem
            );

        alert(
            "Sua solicitação foi preparada e a mensagem foi copiada. O Instagram oficial da empresa será aberto agora."
        );

    }

    catch (erro) {

        alert(
            "Sua solicitação foi preparada. O Instagram oficial da empresa será aberto."
        );

    }


    /*
       VERIFICAR SE O LINK
       FOI CONFIGURADO
    */

    if (
        INSTAGRAM_EMPRESA.includes(
            "SEU_INSTAGRAM_AQUI"
        )
    ) {

        alert(
            "O Instagram da empresa ainda não foi configurado no arquivo script.js."
        );

        return;

    }


    /*
       ABRIR INSTAGRAM
    */

    window.open(
        INSTAGRAM_EMPRESA,
        "_blank"
    );

}


/* =========================================
   MÁSCARA DE TELEFONE
========================================= */

const telefoneInput =
    document.getElementById(
        "clientPhone"
    );


if (telefoneInput) {

    telefoneInput.addEventListener(
        "input",
        event => {

            let valor =
                event.target.value
                    .replace(
                        /\D/g,
                        ""
                    );


            valor =
                valor
                    .slice(
                        0,
                        11
                    );


            if (
                valor.length > 10
            ) {

                valor =
                    valor.replace(
                        /^(\d{2})(\d{5})(\d{4}).*/,
                        "($1) $2-$3"
                    );

            }

            else if (
                valor.length > 6
            ) {

                valor =
                    valor.replace(
                        /^(\d{2})(\d{4})(\d{0,4}).*/,
                        "($1) $2-$3"
                    );

            }

            else if (
                valor.length > 2
            ) {

                valor =
                    valor.replace(
                        /^(\d{2})(\d*)/,
                        "($1) $2"
                    );

            }

            else if (
                valor.length > 0
            ) {

                valor =
                    valor.replace(
                        /^(\d*)/,
                        "($1"
                    );

            }


            event.target.value =
                valor;

        }
    );

}
```
