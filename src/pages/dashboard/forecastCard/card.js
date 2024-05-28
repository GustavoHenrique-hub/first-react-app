function Card({itens}){
    {itens.length >= 0 && itens.length < 5 ? (
        itens.map((values, index) => {
          return (
            <div className="forecastContainerDays">
              <p key={index} className="forecastContainerDaysTitle">
                {values}
              </p>

              <div className="forecastContainerImage">
                <img src />
              </div>

              <p className="forecastContainerDaysTitle"></p>
              <p className="forecastContainerDaysText">
                <a className="forecastContainerDaysTextColored"></a>
              </p>
            </div>
          );
        })
      ) : (
        <p className="forecastContainerDaysTitle">Erro</p>
      )}
}

export default Card;