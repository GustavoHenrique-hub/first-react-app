function Card({itens}){
    { 
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
      }
}

export default Card;