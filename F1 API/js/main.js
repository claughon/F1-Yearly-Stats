const form = document.querySelector('#testDataForm')
console.log(form)

form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(event)
    let query_year = document.querySelector('#year')
    let query_round = document.querySelector('#round')
    load_data(query_year, query_round)
})



const getData = async (year, round) => {
    let response = await axios.get(`https://ergast.com/api/f1/${year}/${round}/driverStandings.json`)
    console.log(response.data)
    return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
}

const DOM_Elements = {
    racer_list: '.racer-list',
    header: '.header'
}

const create_header = () => {
    const html4 = `<table class="table table-dark">
    <thead>
      <tr>
        <th id="position"> Position </th>
        <th> Name </th>
        <th> Nationality </th>
        <th> Sponsor </th>
        <th> Points </th>
      </tr>
    </thead>
    </table>`
    document.querySelector(DOM_Elements.header).insertAdjacentHTML('beforeend', html4)
}

const create_list = (number, position, name, nationality, sponsor, points) => {
    const html = `<a href"#" class="list-group-item list-group-item-action list-group-item-light" number="${number}"> ${name}</a> `;
    const html3 = `<table class="table table-dark">
    <tbody>
      <tr>
        <td> ${position} </td>
        <td> ${name} </td>
        <td> ${nationality} </td>
        <td> ${sponsor} </td>
        <td> ${points} </td>
      </tr>
    </tbody>
  </table>` 
    document.querySelector(DOM_Elements.racer_list).insertAdjacentHTML('beforeend', html3)
}




const load_data = async (query_year, query_round) => {
    const results = await getData(query_year.value, query_round.value);
    create_header()
    results.forEach(element => {create_list(
        element.Driver.permanentNumber,
        element.position,
        element.Driver.familyName,
        element.Driver.nationality,
        element.Constructors[0].name,
        element.points)
        
    })

}

const clear_data = async () =>{
    window.location.reload() 
}