import './Card.css';
import React from 'react'
import User from '../assets/user.png'
import PR from '../assets/pr.png';

export default function Card(props) {

  const badges={
    bug:'badge bg-danger',
    story:'badge bg-primary',
    epic:'badge bg-secondary'
  }

    return <>
    <div  className='cardContainer' draggable="true"
        onDragEnd={(e)=>props.dragEnd(e,props.id,props.stageId)}
        onDragStart={(e)=>props.dragStart(e,props.id,props.stageId)}
        onDragEnter={(e)=>props.dragEntered(e,props.id,props.stageId)}
    >
      <div className={`cardTitle ${badges[props.card.type]}`}>{props.card.id}</div>
      <div className='cardDescription'>{props.card.description}</div>
      <div className='cardFooter'>
        <img  className='cardImage' style={{'backgroundcolor':'white'}} src={PR}></img>
        <img  className='cardImage' src={User}></img>
      </div>
    </div>
    <div>
    </div>
    </>
}