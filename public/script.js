const data = {
  produtos: [
    {
      id: 1,
      nome: "Mouse Gamer Logitech G502",
      preco: 327.90,
      categoria: "Mouses",
      imagem: "img/mouselogitech.jpg",
      descricao: "Mouse gamer marca Logitech com RGB, excelente para games.",
      emEstoque: true
    },

    {
      id: 2,
      nome: "Teclado Redragon",
      preco: 269.90,
      categoria: "Teclados",
      imagem: "img/tecladokumara.jpg",
      descricao: "Teclado mecânico com switch azul, RGB e confortável.",
      emEstoque: true
    },

    {
      id: 3,
      nome: "Headset HyperX",
      preco: 384.90,
      categoria: "Headsets",
      imagem: "img/headset.jpg",
      descricao: "Headset com ótimo áudio para jogos e abafadores confortáveis.",
      emEstoque: false
    },

    {
      id: 4,
      nome: "Monitor LG 29",
      preco: 1359.00,
      categoria: "Monitores",
      imagem: "img/monitorlg.jpg",
      descricao: "Monitor UltraWide LG 29 polegadas com rápida taxa de atualização.",
      emEstoque: true
    },

    {
      id: 5,
      nome: "Webcam Logitech",
      preco: 289.90,
      categoria: "Webcams",
      imagem: "img/webcam.jpg",
      descricao: "Webcam ótima para chamadas e livestreams.",
      emEstoque: true
    },

    {
      id: 6,
      nome: "Mouse Pad Verde",
      preco: 89.90,
      categoria: "Acessórios",
      imagem: "img/mousepadverde.jpg",
      descricao: "Mouse pad com borda verde costurada.",
      emEstoque: true
    },

    {
      id: 7,
      nome: "Caixa de Som Edifier",
      preco: 649.90,
      categoria: "Áudio",
      imagem: "img/cxsom.jpg",
      descricao: "Som com ótima qualidade, para pessoas exigentes.",
      emEstoque: false
    },

    {
      id: 8,
      nome: "Microfone HyperX",
      preco: 349.90,
      categoria: "Microfones",
      imagem: "img/microfone.jpg",
      descricao: "Microfone USB com excelente qualidade para livestreams.",
      emEstoque: true
    }
  ]
};

const lista = document.getElementById("product-list");
const detalhes = document.getElementById("product-details");

const busca = document.querySelector("#search");
const categoria = document.querySelector("#category");

const botao = document.getElementById("btnRender");

function formatarPreco(preco) {

  return "R$ " + preco.toFixed(2);

}

function criarCard(produto) {

  const card = document.createElement("div");

  card.classList.add("card");

  card.setAttribute("data-id", produto.id);

  card.style.backgroundColor = "#1e1e1e";

  const imagem = document.createElement("img");
  imagem.src = produto.imagem;

  const nome = document.createElement("h3");
  nome.innerHTML = produto.nome;

  const preco = document.createElement("p");
  preco.innerHTML = formatarPreco(produto.preco);

  const tipo = document.createElement("p");
  tipo.innerHTML = produto.categoria;

  const detalhesBtn = document.createElement("button");
  detalhesBtn.innerHTML = "Ver detalhes";

  detalhesBtn.addEventListener("click", function () {

    mostrarDetalhes(produto);

  });

  const destaqueBtn = document.createElement("button");
  destaqueBtn.innerHTML = "Destacar";

  destaqueBtn.addEventListener("click", function () {

    card.classList.toggle("highlight");

  });

  card.appendChild(imagem);
  card.appendChild(nome);
  card.appendChild(preco);
  card.appendChild(tipo);
  card.appendChild(detalhesBtn);
  card.appendChild(destaqueBtn);

  return card;
}

function renderizarProdutos(produtos) {

  lista.innerHTML = "";

  produtos.forEach(function (produto) {

    lista.appendChild(criarCard(produto));

  });

  const cards = document.querySelectorAll(".card");

  cards.forEach(function (card) {

    console.log("Card renderizado:", card.getAttribute("data-id"));

  });

}

function renderizarCategorias() {

  categoria.innerHTML = `
    <option>Todas</option>
  `;

  data.produtos.forEach(function (produto) {

    categoria.innerHTML += `
      <option>${produto.categoria}</option>
    `;

  });

}

function mostrarDetalhes(produto) {

  detalhes.innerHTML = `
    <h2>${produto.nome}</h2>

    <img src="${produto.imagem}" width="250">

    <p>Preço: ${formatarPreco(produto.preco)}</p>

    <p>Categoria: ${produto.categoria}</p>

    <p>
      Estoque:
      ${produto.emEstoque ? "Disponível" : "Indisponível"}
    </p>

    <p>${produto.descricao}</p>
  `;

}

function filtrarProdutos() {

  const texto = busca.value.toLowerCase();

  const tipo = categoria.value;

  return data.produtos.filter(function (produto) {

    return (
      produto.nome.toLowerCase().includes(texto) &&
      (tipo === "Todas" || produto.categoria === tipo)
    );

  });

}

busca.addEventListener("input", function () {

  renderizarProdutos(filtrarProdutos());

});

categoria.addEventListener("change", function () {

  renderizarProdutos(filtrarProdutos());

});

botao.addEventListener("click", function () {

  renderizarProdutos(filtrarProdutos());

});

renderizarCategorias();

renderizarProdutos(data.produtos);