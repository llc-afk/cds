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

const INSTAGRAM_EMPRESA = "";


/*
   Informe seu WhatsApp com DDI e DDD, somente números.
   Exemplo para o Brasil: "5511999999999"
*/
const WHATSAPP_EMPRESA = "";


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

    perfilSocial: "",

    categorias: "",

    imagens: [],

    negocio: "",

    descricao: ""

};


/* =========================================
   PREÇOS DOS SERVIÇOS
========================================= */

const precosServicos = {

    "Site Básico": 1500,

    "Landing Page": 1200,

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

            const aberto = nav.classList.contains("open");
            menuButton.setAttribute("aria-expanded", aberto);
            menuButton.setAttribute(
                "aria-label",
                aberto ? "Fechar menu" : "Abrir menu"
            );

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
   SOLICITAR LOJA VIRTUAL
========================================= */

function solicitarLojaVirtual() {

    const mensagem =
        "Olá! Quero uma loja virtual funcional. Vi que o investimento começa em R$ 4.000 e gostaria de receber um orçamento.";

    if (WHATSAPP_EMPRESA) {

        const link =
            "https://wa.me/" + WHATSAPP_EMPRESA +
            "?text=" + encodeURIComponent(mensagem);

        window.open(link, "_blank", "noopener");

        return;

    }

    navigator.clipboard.writeText(mensagem).catch(() => {});

    alert(
        "Configure o número em WHATSAPP_EMPRESA no arquivo script.js para receber esta solicitação. A mensagem já foi copiada."
    );

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

        atualizarCamposCondicionais();

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


        const empresa = document.getElementById("clientBusiness").value.trim();
        const negocio = document.getElementById("clientBusinessDetails").value.trim();
        const descricao = document.getElementById("clientDescription").value.trim();
        const imagens = document.getElementById("clientImages").files;
        const temRedeSocial = pedido.recursos.some(recurso =>
            ["WhatsApp", "Instagram", "Outras redes sociais"].includes(recurso.nome)
        );
        const temCategorias = pedido.recursos.some(recurso =>
            recurso.nome === "Categorias por abas"
        );

        if (nome === "" || telefone === "" || empresa === "" || negocio === "" || descricao === "") {
            alert("Preencha todos os campos obrigatórios para continuar.");
            return;
        }

        if (temRedeSocial && document.getElementById("clientSocialProfile").value.trim() === "") {
            alert("Informe o @, link ou nome da rede social selecionada.");
            return;
        }

        if (temCategorias && document.getElementById("clientCategories").value.trim() === "") {
            alert("Informe as categorias que deseja usar nas abas.");
            return;
        }

        if (imagens.length < 5) {
            alert("Selecione no mínimo 5 imagens dos seus produtos, serviços ou loja.");
            return;
        }


        atualizarDadosCliente();

        calcularPreco();

        atualizarResumo();

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
   CAMPOS CONDICIONAIS
========================================= */

function atualizarCamposCondicionais() {

    const temRedeSocial = pedido.recursos.some(recurso =>
        ["WhatsApp", "Instagram", "Outras redes sociais"].includes(recurso.nome)
    );

    const temCategorias = pedido.recursos.some(recurso =>
        recurso.nome === "Categorias por abas"
    );

    document.getElementById("socialProfileGroup").hidden = !temRedeSocial;
    document.getElementById("categoriesGroup").hidden = !temCategorias;
    document.getElementById("clientSocialProfile").required = temRedeSocial;
    document.getElementById("clientCategories").required = temCategorias;

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


    pedido.perfilSocial =
        document.getElementById("clientSocialProfile").value.trim();

    pedido.categorias =
        document.getElementById("clientCategories").value.trim();

    pedido.imagens =
        Array.from(document.getElementById("clientImages").files)
            .map(imagem => imagem.name);

    pedido.negocio =
        document.getElementById("clientBusinessDetails").value.trim();


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

function formatarPreco(valor) {

    return Number(valor).toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}

function atualizarResumo() {

    let recursosHTML =
        "Nenhuma opção selecionada";


    if (
        pedido.recursos.length > 0
    ) {

        recursosHTML =
            pedido.recursos
                .map(
                    recurso =>
                        `<div>• ${recurso.nome}: ${formatarPreco(recurso.preco)}</div>`
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
                <span class="summary-label">Valor do serviço</span>
                <div class="summary-value">${pedido.servico === "Manutenção de Site" ? "Sob consulta" : formatarPreco(pedido.precoBase)}</div>
            </div>

            <div class="summary-row">
                <span class="summary-label">Adicionais</span>
                <div class="summary-value">${pedido.servico === "Manutenção de Site" ? "Definido após análise" : formatarPreco(pedido.precoRecursos)}</div>
            </div>

            <div class="summary-row summary-total">
                <span class="summary-label">Total estimado</span>
                <div class="summary-value">${pedido.servico === "Manutenção de Site" ? "Sob consulta" : formatarPreco(pedido.precoTotal)}</div>
            </div>


            <div class="summary-row">

                <span class="summary-label">
                    Opções selecionadas
                </span>

                <div class="summary-value">
                    ${recursosHTML}
                </div>

            </div>

            <div class="summary-row">
                <span class="summary-label">Rede social</span>
                <div class="summary-value">${pedido.perfilSocial || "Não informado"}</div>
            </div>

            <div class="summary-row">
                <span class="summary-label">Categorias por abas</span>
                <div class="summary-value">${pedido.categorias || "Não informado"}</div>
            </div>

            <div class="summary-row">
                <span class="summary-label">Imagens enviadas</span>
                <div class="summary-value">${pedido.imagens.length} imagens selecionadas</div>
            </div>

            <div class="summary-row">
                <span class="summary-label">Sobre a empresa</span>
                <div class="summary-value">${pedido.negocio}</div>
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
        "Nenhuma opção selecionada";


    if (
        pedido.recursos.length > 0
    ) {

        recursosTexto =
            pedido.recursos
                .map(
                    recurso =>
                        "- " + recurso.nome + ": " + formatarPreco(recurso.preco)
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

OPÇÕES SELECIONADAS:
${recursosTexto}

━━━━━━━━━━━━━━━━

NOME:
${pedido.nome}

TELEFONE:
${pedido.telefone}

EMPRESA / PROJETO:
${pedido.empresa || "Não informado"}

REDE SOCIAL:
${pedido.perfilSocial || "Não informado"}

CATEGORIAS POR ABAS:
${pedido.categorias || "Não informado"}

IMAGENS SELECIONADAS (${pedido.imagens.length}):
${pedido.imagens.map(imagem => "- " + imagem).join("\n")}

SOBRE A EMPRESA:
${pedido.negocio || "Não informado"}

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
            "Sua solicitação foi preparada e copiada. Cole a mensagem no seu canal de atendimento para enviá-la."
        );

    }

    catch (erro) {

        alert(
            "Sua solicitação foi preparada. Copie o resumo e envie-o pelo seu canal de atendimento."
        );

    }


    if (INSTAGRAM_EMPRESA) {
        window.open(INSTAGRAM_EMPRESA, "_blank", "noopener");
    }

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


/* =========================================
   RETORNO DAS IMAGENS SELECIONADAS
========================================= */

const imagensInput = document.getElementById("clientImages");
const fileFeedback = document.getElementById("fileFeedback");

if (imagensInput && fileFeedback) {

    imagensInput.addEventListener("change", () => {

        const total = imagensInput.files.length;

        if (total === 0) {
            fileFeedback.textContent = "";
            return;
        }

        if (total < 5) {
            fileFeedback.textContent =
                `${total} imagem(ns) selecionada(s). Faltam ${5 - total}.`;
            return;
        }

        fileFeedback.textContent =
            `${total} imagens selecionadas. Perfeito, já podemos usar essas referências.`;

    });

}
