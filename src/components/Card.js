import './Card-Styled.css'


export const Card = ({card, handleChoice, flipped, disabled}) => {

    const onclickHandle = () => {
        if (!disabled){
            handleChoice(card);
        }
    }

    return (    
        <div className='card' key={card.id} >
            <div className={flipped? "flipped": ""}>
            <img className='front' src={card.src} alt='card front'/> 
            <img className='back' src='/img/cover.png' alt='card back'  onClick={onclickHandle} /> 
            </div>
        </div>   
    )
}