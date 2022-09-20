// import './Zone.css';
import Zone from './Zone';
import { useState, useEffect } from 'react';



export default function ZoneContainer() {

    let stagesInfo = [
        {
            id: 'AA',
            title:'To Do',
            cards: [
                { id: 'APP-1458',title:'Implement Feature AAA',description:'Feature AAA needs to be implemented',type:'story' },
                { id: 'BUG-568',title:'Implement Feature BBB',description:'Feature BBB needs to be implemented',type:'bug' },
            ]
        },
        {
            id: 'BB',
            title:'In Progress',
            cards: [
                { id: 'APP-6589',title:'Implement Feature CCC',description:'Feature CCC needs to be implemented',type:'story' },
                { id: 'BUG-986',title:'Implement Feature DDD',description:'Feature DDD needs to be implemented',type:'bug'  },
            ]
        },
        {
            id: 'CC',
            title:'Review',
            cards: [
                { id: 'EPIC-56456',title:'Implement Feature EEE',description:'Feature EEE needs to be implemented',type:'epic'  },
                { id: 'EPIC-578',title:'Implement Feature FFF',description:'Feature FFF needs to be implemented',type:'epic'  },
            ]
        },
        {
            id: 'DD',
            title:'Done',
            cards: [
                { id: 'APP-256',title:'Implement Feature GGG',description:'Feature GGG needs to be implemented',type:'story' },
                { id: 'APP-3566',title:'Implement Feature HHH',description:'Feature AAA needs to be implemented',type:'story' },
            ]
        }
    ]

    const [stages, setStages] = useState(stagesInfo);
    // this way we need to find the stage from the card which might increase the complexity when 
    // there are more number of stages and cards
    const [sourceCard, setSourceCard] = useState();
    const [sourceStageIndex, setSourceStageIndex] = useState();
    const [sourceCardIndex, setSourceCardIndex] = useState();
    const [finalStageIndex, setFinalStageIndex] = useState();
    const [finalCardIndex, setFinalCardIndex] = useState();
    const [droppedOnEmptyArea, setCardDroppedOnEmptyArea] = useState(false);

    function dragEnd(e, cardId, stageId) {
        if (droppedOnEmptyArea) {
            stages[finalStageIndex].cards.push(sourceCard);
            stages[sourceStageIndex].cards.splice(sourceCardIndex, 1);
            setStages([...stages]);
            setCardDroppedOnEmptyArea(false);
            return;
        }
        stages[sourceStageIndex].cards.splice(sourceCardIndex, 1);
        const prev = stages[finalStageIndex].cards.slice(0, finalCardIndex);
        const next = stages[finalStageIndex].cards.slice(finalCardIndex);
        stages[finalStageIndex].cards = [...prev, sourceCard, ...next];
        setStages([...stages]);
    }

    //this will be called when we start dragging a card.
    function dragStart(e, cardId, stageId) {
        //check if these can be replaces using indices
        const sourceStageIndex = stages.findIndex(stage => stage.id === stageId);
        const sourceCardIndex = stages[sourceStageIndex].cards.findIndex(card => card.id === cardId);
        setSourceCard(stages[sourceStageIndex].cards[sourceCardIndex]);
        setSourceCardIndex(sourceCardIndex);
        setSourceStageIndex(sourceStageIndex);
    }

    // this function is called when a card is entered a zone and used to update when the card is
    // dropped over a empty area in the zone
    function zoneDragEntered(e, stageId) {
        e.preventDefault();
        const finalStageIndex = stages.findIndex(stage => stage.id === stageId);
        setFinalStageIndex(finalStageIndex);
        setCardDroppedOnEmptyArea(true);
    }

    //this function will be called when a draggable item is over a droppable item.
    function dragEntered(e, cardId, stageId) {
        setCardDroppedOnEmptyArea(false);
        const finalStageIndex = stages.findIndex(stage => stage.id === stageId);
        setFinalStageIndex(finalStageIndex);
        const finalCardIndex = stages[finalStageIndex].cards.findIndex(card => card.id === cardId);
        setFinalCardIndex(finalCardIndex);
        e.stopPropagation();
    }

    return <div className='container1'>
        {stages.map(stage =>
            <Zone id={stage.id}
                stage={stage}
                dragEnd={dragEnd}
                dragStart={dragStart}
                dragEntered={dragEntered}
                zoneDragEntered={zoneDragEntered}
                cards={stage.cards}></Zone>
        )}
    </div>
}