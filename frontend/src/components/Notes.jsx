import {useSelector, useDispatch} from 'react-redux'
import { getNotes } from '../features/notes/noteSlice'
import Spinner from './Spinner'
import NoteItem from './NoteItem'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function Notes() {
    const { notes, isLoading }  = useSelector((state)=> state.note)
    const { user } = useSelector((state)=> state.auth)
    const dispatch = useDispatch()
    const { ticketId } = useParams()

    useEffect(()=> {
        dispatch(getNotes(ticketId))
        // eslint-disable-next-line
    },[])

    if(isLoading){
        return <Spinner />
    }
  return (
        <div>
            <h3>Notes</h3>
            <section key={user.id}>
                {notes.length > 0 && notes.map( (note) => 
                    <NoteItem key={note.createdAt} user={user.name} note={note}/>
                )}
            </section>
        </div>
  )
}

export default Notes