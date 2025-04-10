// Carrega tarefas ao iniciar
window.onload = () => {
  const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas")) || [];
  tarefasSalvas.forEach((tarefa) =>
    criarElementoTarefa(tarefa.texto, tarefa.feito)
  );
};

function adicionarTarefa() {
  const input = document.getElementById("tarefaInput");
  const texto = input.value.trim();
  if (texto === "") return;

  criarElementoTarefa(texto);
  salvarTarefas();
  input.value = "";
  input.focus();
}

function criarElementoTarefa(texto, feito = false) {
  const li = document.createElement("li");
  li.textContent = texto;

  if (feito) li.classList.add("feito");

  li.addEventListener("click", () => {
    li.classList.toggle("feito");
    salvarTarefas();
  });

  // Botão Remover
  const btnRemover = document.createElement("button");
  btnRemover.textContent = "🗑️";
  btnRemover.className = "btn-remover";
  btnRemover.onclick = (e) => {
    e.stopPropagation(); // evita marcar como feito ao clicar no botão
    li.remove();
    salvarTarefas();
  };

  // Botão Editar
  const btnEditar = document.createElement("button");
  btnEditar.textContent = "✏️";
  btnEditar.className = "btn-editar";
  btnEditar.onclick = (e) => {
    e.stopPropagation();
    const novoTexto = prompt("Editar tarefa:", li.firstChild.textContent);
    if (novoTexto) {
      li.firstChild.textContent = novoTexto.trim();
      salvarTarefas();
    }
  };

  // Envolve texto num span pra permitir editar separadamente
  const spanTexto = document.createElement("span");
  spanTexto.textContent = texto;
  li.textContent = "";
  li.appendChild(spanTexto);
  li.appendChild(btnEditar);
  li.appendChild(btnRemover);

  document.getElementById("listaTarefas").appendChild(li);
}

function salvarTarefas() {
  const lista = document.querySelectorAll("#listaTarefas li");
  const tarefas = Array.from(lista).map((li) => ({
    texto: li.querySelector("span").textContent,
    feito: li.classList.contains("feito"),
  }));
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}
