let isHidden = localStorage.getItem('isHidden') === 'true'? true : false;

let count = 0;

function adicionaTarefaNaLista() {
    const novaTarefa = document.getElementById('input_nova_tarefa').value;
    
    if (novaTarefa.trim().length < 1)
        alert('Não é possível criar uma tarefa vazia.')
    else {
        criaNovoItemDaLista(novaTarefa);
        localStorage.setItem(`tarefa_id_${count}`, novaTarefa);
        localStorage.setItem(`stateTarefa_tarefa_id_${count}`, 'incomplete');
        count++;
        document.getElementById('input_nova_tarefa').value = "";
    }
}

function criaNovoItemDaLista(textoDaTarefa, state = false) {
    const listaTarefas = document.getElementById('lista_de_tarefas');
    let qtdTarefas = listaTarefas.children.length;

    const novoItem = document.createElement('li');

    novoItem.innerText = textoDaTarefa;
    if(state == 'complete')
        novoItem.style.textDecoration = 'line-through';

    novoItem.id = `tarefa_id_${qtdTarefas}`;
    qtdTarefas++;

    novoItem.appendChild(criaInputCheckBoxTarefa(novoItem.id, state));
    novoItem.appendChild(criaBotaoAtualizarTarefa(novoItem.id));

    listaTarefas.appendChild(novoItem);
}

function criaInputCheckBoxTarefa(idTarefa, state) {
    const inputTarefa = document.createElement('input');
    inputTarefa.type = 'checkbox';
    inputTarefa.setAttribute('onclick', `mudaEstadoTarefa('${idTarefa}')`);
    inputTarefa.setAttribute('class', 'checkbox');
    if(state == 'complete')
        inputTarefa.checked = true;
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

function updateTarefa(idTarefa) {
    let tarefa = document.getElementById(idTarefa);
    let newText = prompt("Qual a sua tarefa?", tarefa.innerText);
    tarefa.innerText = newText;

    tarefa.appendChild(criaInputCheckBoxTarefa(idTarefa))
    tarefa.appendChild(criaBotaoAtualizarTarefa(idTarefa))

    localStorage.setItem(idTarefa, newText);
}

function mudaEstadoTarefa(idTarefa) {
    let hidden = localStorage.getItem('isHidden');
    const tarefaSelecionada = document.getElementById(idTarefa);
    const checkbox = tarefaSelecionada.querySelector('.checkbox');
    let state = localStorage.getItem(`stateTarefa_${idTarefa}`);

    if (state == 'incomplete') {
        localStorage.setItem(`stateTarefa_${idTarefa}`, 'complete');
        tarefaSelecionada.style.textDecoration = 'line-through';
        checkbox.checked = true;

        if (hidden === "true")
            tarefaSelecionada.style.display = 'none';
    } 
    else {
        tarefaSelecionada.style.textDecoration = 'none';
        localStorage.setItem(`stateTarefa_${idTarefa}`, 'incomplete');
        tarefaSelecionada.style.display = '';
        checkbox.checked = false;
    }
}

function escondeTarefa() {
    isHidden = !isHidden;
    localStorage.setItem('isHidden', isHidden);
    let hidden = localStorage.getItem('isHidden');

    let listaTarefas = document.getElementById('lista_de_tarefas');

    for (let index = 0; index < listaTarefas.children.length; index++) {
        let tarefa = document.getElementById(`tarefa_id_${index}`);
        let checkbox = tarefa.querySelector('.checkbox');

        if (hidden === "true" && (checkbox.checked || tarefa.style.textDecoration === 'line-through')) {
            tarefa.style.display = 'none';
        } 
        else {
            tarefa.style.display = '';
        }
    }
}

function carregaTarefa() {
    let hidden = localStorage.getItem('isHidden');

    let hideCheckbox = document.getElementById('hideCheckbox');
    if (hidden === "true") {
        hideCheckbox.checked = true;
    }
    
    for (let i = 0; i < localStorage.length; i++) {
        const key = `tarefa_id_${i}`;
        const tarefa = localStorage.getItem(key);
        let state = localStorage.getItem(`stateTarefa_tarefa_id_${i}`);

        if (tarefa) {
            criaNovoItemDaLista(tarefa, state);
            let task = document.getElementById(`tarefa_id_${i}`);

            if (hidden === "true" && task.style.textDecoration === 'line-through') {
                task.style.display = 'none';
            }
            else {
                task.style.display = '';
            }
        }
    }
}

window.onload = carregaTarefa();
