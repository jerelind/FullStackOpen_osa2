import React from 'react'

const Kurssi = ({kurssit}) => {
    const tehtavat = kurssit[0].osat.map(osa => osa.tehtavia)
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    const tehtavat2 = kurssit[1].osat.map(osa => osa.tehtavia)
    return(
    <div>
        {<h2>{kurssit[0].nimi}</h2>}
        {kurssit[0].osat.map(osa => <li key={osa.id}>{osa.nimi} {osa.tehtavia}</li>)}
        Yhteensä {tehtavat.reduce(reducer)} tehtävää
        <h2>{kurssit[1].nimi}</h2>
        {kurssit[1].osat.map(osa => <li key={osa.id}>{osa.nimi} {osa.tehtavia}</li>)}
        Yhteensä {tehtavat2.reduce(reducer)} tehtävää
    </div>
    )
}

export default Kurssi