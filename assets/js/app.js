function adicionaTarefaNaLista() {
    const novaTarefa = document.getElementById('input_nova_tarefa').value;
    criaNovoItemDaLista(novaTarefa);
}

function criaNovoItemDaLista(textoDaTarefa) {
    const listaTarefas = document.getElementById('lista_de_tarefas');
    let qtdTarefas = listaTarefas.children.length;

    const novoItem = document.createElement('li');

    novoItem.innerText = textoDaTarefa;
    novoItem.id = `tarefa_id_${qtdTarefas++}`;

    novoItem.appendChild(criaInputCheckBoxTarefa(novoItem.id));
    novoItem.appendChild(criaBotaoAtualizarTarefa(novoItem.id));

    listaTarefas.appendChild(novoItem);
}

function criaInputCheckBoxTarefa(idTarefa) {
    const inputTarefa = document.createElement('input');
    inputTarefa.type = 'checkbox';
    inputTarefa.setAttribute('onclick', `mudaEstadoTarefa('${idTarefa}')`);
    inputTarefa.setAttribute('class', 'checkbox');
    return inputTarefa;
}

function criaBotaoAtualizarTarefa(idTarefa) {
    const buttonUpdate = document.createElement('button');
    buttonUpdate.setAttribute('onclick', `updateTarefa('${idTarefa}')`);
    buttonUpdate.setAttribute('class', 'buttonUpdate');

    const icon = document.createElement('img');
    icon.setAttribute('src', 'assets/img/pen.png');
    icon.setAttribute('class', 'icon');
    
    buttonUpdate.appendChild(icon);
    return buttonUpdate;
}

function mudaEstadoTarefa(idTarefa) {
    const tarefaSelecionada = document.getElementById(idTarefa);
    if (tarefaSelecionada.style.textDecoration == 'line-through') {
        tarefaSelecionada.style = 'text-decoration: none;';
    } else {
        tarefaSelecionada.style = 'text-decoration: line-through;';
    }    
}

let isHidden = false;

function escondeTarefa() {
    isHidden = !isHidden;

    if(isHidden = true) {
        
    }
}
