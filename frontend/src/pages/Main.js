import React, {useState, useEffect} from 'react'
import Set from '../components/Set'
import "../styling/Main.css";

const Main = () => {
    let [sets, setSets] = useState([])
    let [add, setAdd] = useState(false)
    let [isEdit, setIsEdit] = useState(false)
    let [univIndex, setunivIndex] = useState(5);

    useEffect(() => {
        getSet()
    }, [])

    let getSet= async () => {
        let response = await fetch('/api/sets')
        let data = await response.json()
        setSets(data)
    }

    let addSet = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        if(formJson.title.length > 0){
            await fetch(`/api/sets/create`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formJson.title)
            })
            await getSet()
        }
        setAdd(false)
    }   

    let deleteSet = async (index) => {
        console.log(index)
        await fetch(`/api/sets/${sets[index].id}/delete`, {
            method: 'DELETE',
            'headers': {
                'Content-Type': 'application/json'
            }
        })
        getSet()
    }

    let editSet = async (e, index) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        await fetch(`/api/sets/${sets[index].id}/update`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formJson)
        })
        await getSet()
        setIsEdit(false);
    }

    const handleEdit = (index) => {
        if(sets.length === 0){
          return;
        }
        setunivIndex(index)
        setIsEdit(!isEdit)
    }

    const flipEdit = () => {
        setIsEdit(!isEdit)
    }

    const flipAdd = () => {
        setAdd(!add)
    }

    const EditModal = (index) => {
        index = univIndex
        return (
            <div className='mainEditOverlay' onClick={flipEdit}>
                <div className="mainEditModal" onClick={(e) => {e.stopPropagation();}}>
                    <form method="post" onSubmit={(e) => {editSet(e, index)}}>
                        <label>
                            Edit title<textarea name="title" defaultValue={sets[index].title} className='modalInput'></textarea>
                        </label>
                        <button type="submit" className='modalButton'>Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    const AddModal = () => {
        return (
            <div className='mainEditOverlay' onClick={flipAdd}>
                <div className="mainEditModal" onClick={(e) => {e.stopPropagation();}}>
                    <form method="post" onSubmit={addSet}>
                        <label>
                            Card Title <textarea name="title" className='modalInput'></textarea>
                        </label>
                        <button type="submit" className='modalButton'>Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div>
            {console.log('Test')}
            <button className='addButton' onClick={flipAdd}>+</button>
            <div className='setsList'>
                { 
                sets.map((set, index) => (
                    <div key={index} className='individualSet'>
                        <button onClick={(e) => {deleteSet(index)}} className='deleteButton'>&#x2715;</button>
                        <button onClick={() => {handleEdit(index)}}  className='editButton'>Edit</button>
                        <div className='individualSetContent'>
                            <Set  set={set} />   
                        </div>

                    </div>
                ))
                }
            </div>
                {add && <AddModal />}
                {isEdit && <EditModal index={univIndex}/>}
        </div>
    )
}

export default Main