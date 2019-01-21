// No editar
const teams = [
  { id: 1, country: 'Spain', name: 'Real Madrid C.F.' },
  { id: 2, country: 'Italy', name: 'A.C. Milan' },
  { id: 3, country: 'Spain', name: 'Futbol Club Barcelona' },
  { id: 4, country: 'Germany', name: 'FC Bayern Munich' },
  { id: 5, country: 'England', name: 'Liverpool F.C.' },
  { id: 6, country: 'Netherlands', name: 'AFC Ajax' },
  { id: 7, country: 'Italy', name: 'Inter Milan' },
  { id: 8, country: 'England', name: 'Manchester United F.C.' },
  { id: 9, country: 'England', name: 'Chelsea F.C.' },
  { id: 10, country: 'Portugal', name: 'FC Porto' },
  { id: 11, country: 'Germany', name: 'Borussia Dortmund' },
  { id: 12, country: 'Italy', name: 'Juventus FC' },
  { id: 13, country: 'France', name: 'Olympique Marseille' }

]

const leagues = [
  { id: 1, country: 'England', name: 'Premier League' },
  { id: 2, country: 'Germany', name: 'Bundesliga' },
  { id: 3, country: 'Netherlands', name: 'Eredivisie' },
  { id: 4, country: 'Spain', name: 'La Liga' },
  { id: 5, country: 'Italy', name: 'Serie A' },
  { id: 6, country: 'Portugal', name: 'Liga NOS' },
  { id: 7, country: 'France', name: 'Lige 1' }
]

const teamsByLeague = [
  { teamId: 12, leagueId: 5 },
  { teamId: 6, leagueId: 3 },
  { teamId: 2, leagueId: 5 },
  { teamId: 3, leagueId: 4 },
  { teamId: 4, leagueId: 2 },
  { teamId: 8, leagueId: 1 },
  { teamId: 10, leagueId: 6 },
  { teamId: 5, leagueId: 1 },
  { teamId: 7, leagueId: 5 },
  { teamId: 9, leagueId: 1 },
  { teamId: 11, leagueId: 2 },
  { teamId: 1, leagueId: 4 },
  { teamId: 13, leagueId: 7 }
]

const winsByTeams = [
  { teamId: 10, wins: 2 },
  { teamId: 6, wins: 4 },
  { teamId: 5, wins: 5 },
  { teamId: 1, wins: 13 },
  { teamId: 7, wins: 3 },
  { teamId: 4, wins: 5 },
  { teamId: 8, wins: 3 },
  { teamId: 2, wins: 7 },
  { teamId: 9, wins: 1 },
  { teamId: 3, wins: 5 },
  { teamId: 11, wins: 1 },
  { teamId: 12, wins: 2 },
  { teamId: 13, wins: 1 }
]

/*
  SECCIÓN PROBLEMAS
    - Las siguientes son preguntas básicas de Javascript y manejo de datos. Se evaluará eficiencia, ORDEN y claridad del código entregado.
    - Se debe programar un algoritmo para cada método y que este retorne lo requerido.
    - Debe usar nombres explicativos para sus variables.
    - Usar sintaxis ES6.
    - Puede utilizar funciones auxiliares como apoyo para tener una descomposición de código mas clara al momento de lectura.
    - Su prueba debe ejecutarse sin errores con: node logic-test.js
*/

// 0 Arreglo con los ids de los equipos (función de ejemplo)
function listTeamsIds () {
  return teams.map((client) => client.id)
}

// 1 Arreglo con los nombres de los equipos y el país al que pertenecen, ordenados alfabéticamente por el nombre de su país de origen.
function listTeamsByCountry () {
  return teams
    // Sort del arreglo por orden alfabetico
    .sort((a, b) => (a.country > b.country) ? 1 : ((b.country > a.country) ? -1 : 0))
    // Seguido de un map para obtener las dos caracteristicas que piden
    .map((team) => ({ name: team.name, country: team.country }));
}

// 2 Arreglo con los nombres de los equipos ordenados de mayor a menor por la cantidad de victorias en champions league.
function sortTeamsByWins () {
  // Defino un arreglo que contiene los equipos ordenados por wins de mayor a menor
  const sortedByWins = winsByTeams.sort((a, b) => b.wins - a.wins);
  // Hago un map para obtener los nombres del arreglo correspondiente
  return sortedByWins.map((element) => teams.find((team) => team.id === element.teamId).name)
}

// 3 Arreglo de objetos en donde se muestre el nombre de las ligas y la sumatoria de las victorias de los equipos que pertenecen a ellas.
function leaguesWithWins () {
  var counter = 0;
  const leaguesOrdered = leagues.map(league => {
    counter = 0
    teamsByLeague.forEach(team => {
      if (league.id === team.leagueId) {
        counter += winsByTeams.find(element => element.teamId === team.teamId).wins
      }
    })
    return {
      name: league.name,
      wins: counter
    }
  });
  return leaguesOrdered;
}

// 4 Objeto en que las claves sean los nombres de las ligas y los valores el nombre del equipo con la menor cantidad de victorias en champions.
function leaguesWithTeamWithLestWins () {
  var result = leagues.map(league => {
    // Obtenemos los equipos asociados a la liga
    const teamLeagues = teamsByLeague.filter(team => team.leagueId === league.id);
    // Ordenemos los equipos de la liga por orden
    var winsInLeague = orderByWins(0, teamLeagues, league);
    // Retornamos un arreglo con los objetos correspondientes
    return { [league.name]: teams.find(element => element.id === winsInLeague[0].teamId).name }
  })
  return toObject(result);
}

// 5 Objeto en que las claves sean los nombres de las ligas y los valores el nombre del equipo con la mayor cantidad de victorias en champions.
function leaguesWithTeamWithMostWins () {
  var result = leagues.map(league => {
    // Obtenemos los equipos asociados a la liga
    const teamLeagues = teamsByLeague.filter(team => team.leagueId === league.id);
    // Ordenemos los equipos de la liga por orden
    var winsInLeague = orderByWins(1, teamLeagues, league);
    // Retornamos un arreglo con los objetos correspondientes
    return { [league.name]: teams.find(element => element.id === winsInLeague[0].teamId).name }
  })
  return toObject(result);
}

// 6 Arreglo con los nombres de las ligas ordenadas de mayor a menor por la cantidad de victorias de sus equipos.
function sortLeaguesByTeamsByWins () {
  const leaguewins = winsByLeague();
  const orderids = (Object.keys(leaguewins).sort(function (a, b) {
    return leaguewins[b] - leaguewins[a]
  })).map((element) => leagues.find(league => league.id == element).name)
  return orderids;
}

// 7 Arreglo con los nombres de las ligas ordenadas de mayor a menor por la cantidad de equipos que participan en ellas.
function sortLeaguesByTeams () {
  return leagues.map(leagues => {
    const numberTeams = teamsByLeague.filter(team => team.leagueId == leagues.id)
    return {
      name: leagues.name,
      quantity: numberTeams.length
    }
  }).sort((a, b) => { return b.quantity - a.quantity }).map(league => league.name)
}

// 8 Agregar un nuevo equipo con datos ficticios a "teams", asociarlo a la liga de Francia y agregar un total de 4 victorias en champions.
// Luego devolver el lugar que ocupa este equipo en el ranking de la pregunta 2.
// No modificar arreglos originales para no alterar las respuestas anteriores al correr la solución
function newTeamRanking () {
  const nextTeamId = teams.length + 1
  teams.push({ id: nextTeamId, country: 'France', name: 'Unreality Name' })
  teamsByLeague.push({ teamId: nextTeamId, leagueId: 7 })
  winsByTeams.push({ teamId: nextTeamId, wins: 4 })
  // Devolvemos la posicion en el arreglo + 1, ya que un ranking no parte del 0
  return sortTeamsByWins().findIndex(team => team === 'Unreality Name') + 1;
}

// 9 Realice una función que retorne una promesa con los nombres de los equipos en upper case.
// haga la llamada a la función creada desde esta función y asignarle la respuesta a la variable response.
// recuerde que debe esperar el retorno de función asíncrona para que su resultado pueda ser mostrado por el
// console.log. Utilice async await para la llamada asíncrona a la función.
// NOTA: solo debe crear la función asíncrona y agregar la llamada en la siguiente función.
async function getTeamsNamesAsUpperCase () {
  let response
  // ------MAKE AWAIT CALL HERE------
  response = await UpperCaseTeams();
  // --------------------------------
  console.log('response:')
  console.log(response)
}

// Function Pregunta 9
function UpperCaseTeams () {
  return new Promise((resolve, reject) => {
    var teamUpperCase = teams.map(team => team.name.toUpperCase())
    setTimeout(() => { resolve(teamUpperCase) }, 1000)
  })
}

// Funciones Auxiliares
function toObject (array) {
  var finalObject = {};
  for (let i = 0; i < array.length; i++) {
    finalObject = Object.assign(finalObject, array[i])
  }
  return finalObject;
}

// Funcion para generalizar un orden por wins de la liga y no copiar codigo pregunta 4/5
function orderByWins (order, teamsByLeague, league) {
  // Obtenemos los equipos asociados a la liga
  const teamLeagues = teamsByLeague.filter(team => team.leagueId === league.id);
  var winsInLeague = teamLeagues.map(team => {
    const wins = winsByTeams.find(team2 => team2.teamId === team.teamId).wins
    return {
      teamId: team.teamId,
      wins: wins
    }
  })
  if (order === 0) {
    winsInLeague = winsInLeague.sort((a, b) => { return a.wins - b.wins })
  } else {
    winsInLeague = winsInLeague.sort((a, b) => { return b.wins - a.wins })
  }

  return winsInLeague;
}

// Victorias del equipo
function getTeamWins (teamId) {
  return winsByTeams.find((winTeam) => winTeam.teamId == teamId).wins;
}

// Function para pregunta 6
function winsByLeague () {
  return teamsByLeague.reduce((acc, teamLeague) => {
    // buscar cantidad de victorias
    const wins = getTeamWins(teamLeague.teamId);
    // sumarizarla
    acc[teamLeague.leagueId] === undefined
      ? acc[teamLeague.leagueId] = wins
      : acc[teamLeague.leagueId] += wins
    return acc
  }, {})
}

// Impresión de soluciones. No modificar.
console.log('Pregunta 0')
console.log(listTeamsIds())
console.log('Pregunta 1')
console.log(listTeamsByCountry())
console.log('Pregunta 2')
console.log(sortTeamsByWins())
console.log('Pregunta 3')
console.log(leaguesWithWins())
console.log('Pregunta 4')
console.log((leaguesWithTeamWithLestWins()))
console.log('Pregunta 5')
console.log((leaguesWithTeamWithMostWins()))
console.log('Pregunta 6')
console.log((sortLeaguesByTeamsByWins()))
console.log('Pregunta 7')
console.log((sortLeaguesByTeams()))
console.log('Pregunta 8')
console.log((newTeamRanking()))
console.log('Pregunta 9')
console.log(getTeamsNamesAsUpperCase())
