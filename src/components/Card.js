export default function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
      }  
    return (
      <div className="elements-template">
        <div className="card">
          <img className="card__photo" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
            <button className="card__trash" type="button"/>
            <div className="card__group">
              <h2 className="card__title">{props.card.name}</h2>
              <div className="card__heart-area">
                <button className="card__heart" type="button"/>
                <p className="card__heart-counter">{props.card.likes.length}</p>
              </div>
            </div>
        </div> 
      </div>
    )
  }