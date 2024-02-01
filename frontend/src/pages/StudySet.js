import React, {useState, useEffect} from 'react'
import { useParams} from 'react-router-dom';
import FlashCard from '../components/FlashCard';
import '../styling/StudySet.css'

const StudySet = () => {
    let params = useParams()
    let [cards, setCards] = useState([])
    const [flip, setFlip] = useState(true);
    const [index, setIndex] = useState(0);
    const [isEdit, setIsEdit] = useState(false);
    const [isAdd, setIsAdd] = useState(false);

    const handleFlip = () => {
        setFlip(!flip);
    }

    const handleNext = () => {
        if(cards.length > index + 1){
          setIndex(index + 1);
          setFlip(true);
        } 
    }

    const handlePrevious = () => {
        if(index > 0){
          setIndex(index - 1);
          setFlip(true);
        }
    }

    const handleEdit = () => {
        if(cards.length === 0){
          setIsAdd(true)
        }
        setIsEdit(!isEdit);
    }

    const handleAdd = () => {
        setIsAdd(!isAdd);
    }

    //Grabs information from modal form, uses fetch, to send code to database, closes modal
    const updateCard = async (e, tester) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        await fetch(`/api/sets/${params.id}/cards/${cards[index].id}/update`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formJson)
        })
        getSet()
        setIsEdit(false);
    }

    //Same logic as updateCard
    const addCard = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        await fetch(`/api/sets/${params.id}/cards/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formJson)
        })
        handleAdd();
        getSet()
    }

    let deleteCard = async () => {
        await fetch(`/api/sets/${params.id}/cards/${cards[index].id}/delete`, {
            method: 'DELETE',
            'headers': {
                'Content-Type': 'application/json'
            }
        })
        getSet()
        setIndex(index - 1)
    }

    useEffect(() => {
        getSet()
    }, [])

    let getSet = async () => {
        let response = await fetch(`/api/sets/${params.id}/cards`)
        let data = await response.json()
        setCards(data)
    }

    //Displayed when state isEdit is true, form is sent to updateCard
    const EditModal = () => {
        return (
            <div className='mainEditOverlay' onClick={handleEdit}>
            <div className="mainEditModal" onClick={(e) => {e.stopPropagation();}}>
                <form method="post" onSubmit={(e) => {updateCard(e, 2)}}>
                    <label style={{display:'none'}}>
                        <textarea name="id" defaultValue={cards[index].id} className='modalUpperInput'></textarea>
                    </label>
                    <label style={{display:'none'}}>
                        <textarea name="set" defaultValue={params.id} className='modalUpperInput'></textarea>
                    </label>
                    <label>
                        <textarea name="front" defaultValue={cards[index].front} className='modalUpperInput'></textarea>
                    </label>
                    <label>
                        <textarea name="back" defaultValue={cards[index].back} className='modalLowerInput'></textarea>
                    </label>
                    <button type="submit" className='modalButton'>Submit</button>
                </form>
            </div>
            </div>
        )
    }

    //Same logic as addModal and mostly the same styling
    const AddModal = () => {
        return (
            <div className='mainEditOverlay' onClick={handleAdd}>
            <div className="mainEditModal" onClick={(e) => {e.stopPropagation();}}>
                    <form method="post" onSubmit={addCard}>
                    <label>
                        <textarea name="front" className='modalUpperInput' defaultValue={'Front'}></textarea>
                    </label>
                    <label>
                        <textarea name="back" className='modalLowerInput' defaultValue={'Back'}></textarea>
                    </label>
                    <button type="submit" className='modalButton'>Submit</button>
                    </form>
            </div>
            </div>
        )
    }

    return (
        <div className='cardBackground'>
            <div className='cardBackground'>
                {cards.length > 0? (
                    <div className='cardHolder'>
                        <button className="cardButtonLeft" onClick={handlePrevious}>&larr;</button>
                        <div className='card' onClick={handleFlip}>
                            <FlashCard front={cards[index].front} back={cards[index].back} isFlipped={flip} />
                        </div>
                        <button className="cardButtonRight" onClick={handleNext}>&rarr;	</button>
                        <button className="cardButtonDelete" onClick={deleteCard}>Delete</button>
                        <button onClick={handleAdd} className='cardButtonAdd'>+</button>
                        <button className="cardButtonEdit" onClick={handleEdit}>Edit</button>
                    </div>                     
                ) : (
                    <AddModal />
                )}
            </div>
            {isEdit && <EditModal />} 
            {isAdd && <AddModal />} 
        </div>   
    )
}

export default StudySet