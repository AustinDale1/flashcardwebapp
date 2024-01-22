import React from 'react'
import '../styling/StudySet.css'

const Flashcard = ({front, back, isFlipped}) => {
    return (
        <div className='flashcard'> {
            isFlipped?(
                front
            ) : (
                back
            )
        }</div>
    )
}

export default Flashcard