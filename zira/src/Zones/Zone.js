import './Zone.css';

import Card from '../Card/Card';

export default function Zone(props){

    return <div className='zoneContainer' id={props.id} 
    onDragEnter={(e)=>props.zoneDragEntered(e,props.id)}
    > 
        <div className='zoneHeading'>{props.stage.title}</div>
        {props.cards.map(card=><Card  card={card} id={card.id} stageId={props.id} dragStart={props.dragStart} dragEnd={props.dragEnd} dragEntered={props.dragEntered}
        ></Card>)}
    </div>
}