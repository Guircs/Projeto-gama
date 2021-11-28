//Importa os métodos readline-sync e fs (file system)
const readline = require('readline-sync')
const fs = require('fs')
//Abre o arquivo database e cria um array com a base para ser utilizado pelo programa
const arq = fs.readFileSync('database.JSON','utf8')
const cursos = JSON.parse(arq)

//cria um menu de opções
const menu = {
	C: "Criar Curso",
	E: "Exibir Curso",
	A: "Atualizar Curso",
	D: "Deletar Curso",
	L: "Listar Cursos",
	Q: "Sair"
}

//inicia o loop do programa
let inicia = 1
console.log('Bem vindo!')

do{
	console.log("Menu de Opções")
	console.table(menu)

	//Solicita um comando
	const entradaMenu = readline.question('Insira o comando que deseja realizar: ').toLocaleUpperCase()
	
	// Avalia e executa o comando fornecido pelo usuário 
	switch(entradaMenu){
		case "C":
			criaCurso()
			break;

		case "E":
			exibeCurso()
			break;

		case "A":
			atualizaCurso()
			break;

		case "D":
			deletaCurso()
			break;

		case "L":
			listaCursos()
			break;

		case "Q":
			//sair do programa
			inicia = 0
			break;

		default:
			console.log(`O código ${entradaMenu} é inválido`)
	}

} while(inicia === 1) //Finaliza o loop principal

//Atualiza o arquivo .json contendo a base de dados dos cursos
fs.writeFileSync('database.JSON', JSON.stringify(cursos))
console.log("Arquivo Salvo!")


console.log('Fechando aplicação...')

//definição das funções

//Cria um curso na database
function criaCurso(){
	//recebe vários inputs com os parâmetros dos cursos 
	const idCurso = Date.now()
	const nomeCurso = readline.question('Insira o nome do curso: ')
	const descCurso = readline.question('Insira uma descricao do curso: ')
	const imgCurso = readline.question('Insira o caminho da imagem para o curso: ')
	const profCurso = readline.question('Insira o professor do curso: ')
	const aulaCurso = readline.question('Insira os links das aulas: ')
	const ultimaMod = Date()
	//cria um objeto com os parâmetros fornecidos e insere o objeto na database 
	const curso = {
		id : idCurso,
		Nome : nomeCurso,
		Descricao: descCurso,
		Imagem: imgCurso,
		Professor: profCurso,
		Aulas: aulaCurso,
		Ultima_Alteracao: ultimaMod
	}
	cursos.push(curso)
	console.log('Curso criado com sucesso!')
	repete()

}

//Exibe os detalhes de um curso escolhido
function exibeCurso(){
	//recebe o ID do curso 
	const idExibe = readline.question('Insira o ID do curso que deseja exibir: ')

	const retorno = cursos.filter(curso => curso.id == idExibe)

	//imprime os detalhes do curso se a id for válida
	retorno.length === 0 ? console.log('ID inválida'):console.table(retorno)
	
	repete()
	
}

//Atualiza uma propriedade de um curso
function atualizaCurso(){
	// recebe o ID de um curso
	const idAtualiza = readline.question('Insira o ID do curso que deseja atualizar: ') 

	const cursoAtu = cursos.find(curso => curso.id == idAtualiza)

	if(cursos.indexOf(cursoAtu) === -1){  //confere se a id fornecida é invalida
		console.log('ID inválida')
		
	}
	else{ 			//Se a id é valida, recebe a propriedade a ser alterada e o novo valor
		
		const propCurso = readline.question('Insira a propriedade que quer alterar(Nome/Descricao/Imagem/Professor/Aulas): ')
		
		const novoValProp = readline.question('Insira o novo valor para a propriedade: ')
		
		switch(propCurso.toLocaleUpperCase()){		//altera o valor de acordo com a propriedade
			case "NOME":
				cursos[cursos.indexOf(cursoAtu)]['Nome'] = novoValProp;
				break;
			case "DESCRICAO":
				cursos[cursos.indexOf(cursoAtu)]['Descricao'] = novoValProp;
				break;
			case "IMAGEM":
				cursos[cursos.indexOf(cursoAtu)]['Imagem'] = novoValProp;
				break;
			case "PROFESSOR":
				cursos[cursos.indexOf(cursoAtu)]['Professor'] = novoValProp;
				break;
			case "AULAS":
				cursos[cursos.indexOf(cursoAtu)]['Aulas'] = novoValProp;
				break;
			default:
				console.log("Propriedade inválida")

		}
		//Altera a data de modificação e fornece um feedback
		cursos[cursos.indexOf(cursoAtu)]['Ultima_Alteracao'] = Date();
		console.log(`${propCurso} do curso ${cursos[cursos.indexOf(cursoAtu)]['Nome']} atualizado`)
		

	}
	
	repete()

}

//Deleta o curso escolhido
function deletaCurso(){
	// recebe o ID de um curso e o apaga
	const idDel = readline.question('Insira o ID do curso que deseja excluir: ')

	const cursoDel = cursos.find(curso => curso.id == idDel)

	//Checa se a id é valida e apaga o curso se for
	cursos.indexOf(cursoDel) === -1 ? console.log('ID inválida'): (
		cursos.splice(cursos.indexOf(cursoDel),1),
		console.log('Curso excluído')
		)
	
	repete()

}

//Lista todos os cursos da base
function listaCursos(){
	console.log("Cursos disponíveis:")
	console.table(cursos)
	repete()

}

//Permite escolher se deseja fazer mais ações
function repete(){
	const repetir = readline.question('Deseja fazer algo mais? (S/N): ').toLocaleUpperCase()

	if(repetir === 'S'){
		
	}
	else if(repetir === 'N'){
		inicia = 0
	}
	else{
		console.log(`Comando ${repetir} invalido`)
		repete()
	}

}


