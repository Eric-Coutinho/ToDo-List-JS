function adicionaTarefaNaLista() {
    const novaTarefa = document.getElementById('input_nova_tarefa').value
    criaNovoItemDaLista(novaTarefa)
}

function criaNovoItemDaLista(textoDaTarefa) {
    const listaTarefas = document.getElementById('lista_de_tarefas')
    let qtdTarefas   = listaTarefas.children.length

    const novoItem = document.createElement('li')

    novoItem.innerText = textoDaTarefa
    novoItem.id = `tarefa_id_${qtdTarefas++}`

    novoItem.appendChild(criaInputCheckBoxTarefa(novoItem.id))

    listaTarefas.appendChild(novoItem)
}


function criaInputCheckBoxTarefa(idTarefa) {
    const inputTarefa = document.createElement('input')
    inputTarefa.type = 'checkbox'
    inputTarefa.setAttribute('onclick', `mudaEstadoTarefa('${idTarefa}')`)
    return inputTarefa
}

function mudaEstadoTarefa(idTarefa) {
    const tarefaSelecionada = document.getElementById(idTarefa)
    if (tarefaSelecionada.style.textDecoration == 'line-through') {
        tarefaSelecionada.style = 'text-decoration: none;'
    } else {
        tarefaSelecionada.style = 'text-decoration: line-through;'
    }    
}
