import './card.css';

export function CardClass() {
  return (
    <div className='container-home'>

      <div className='card-home card-img'>
        <h3 className='title-card-home'>Nossa História</h3>
        <button class="custom-btn btn"><span>Clique aqui</span></button>
      </div>
      <div className='card-home card-img'>
        <h3 className='title-card-home'>Nosso Cardápio</h3>
        <button class="custom-btn btn"><span>Clique aqui</span></button>
      </div>
      <div className='card-home card-img'>
        <h3 className='title-card-home'>Nossas Unidades</h3>
        <button class="custom-btn btn"><span>Clique aqui</span></button>
      </div>
    </div>


  )
}
