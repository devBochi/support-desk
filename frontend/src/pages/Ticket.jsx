import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { FaPlus } from 'react-icons/fa'
import { getTicket, closeTicket} from '../features/tickets/ticketSlice'
import { useEffect, useState } from 'react'
import Notes from '../components/Notes'
import { createNote } from '../features/notes/noteSlice'

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
}

Modal.setAppElement('#root')

function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState('')
  const {isLoading, isError, ticket, message} = useSelector(
    (state)=> state.tickets
  )
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {ticketId} = useParams()

  useEffect(()=> {
    if(isError){
      navigate('/tickets')
      toast.error(message)
    }

    dispatch(getTicket(ticketId))
    // eslint-disable-next-line
  },[isError, message, ticketId])

  // Close ticket
  const onCloseTicket = () => {
    dispatch(closeTicket(ticketId))
    toast.success('Ticket has been closed successfully!')
    navigate('/tickets')
  }

  // Open/close modal for notes
  const openModal = () => {
    setModalIsOpen(true)
  }
  const closeModal = () => {
    setModalIsOpen(false)
  }

  // Create note submit
  const onNoteSubmit = (e) => {
    e.preventDefault()
    dispatch(createNote({
      ticketId,
      noteText
    }))
    closeModal()
  }

  if(isLoading) {
    return <Spinner />
  }

  if(isError){
    return <h3>Something went wrong</h3>
  }

  return (
    <>
      <div className='ticket-page'>
        <header>
          <BackButton url={'/tickets/'}/>
          <h2>
            Ticket ID: {ticket._id}
            <span className={`status status-${ticket.status}`}>
            {ticket.status}
            </span>
          </h2>
          <h3>Product: {ticket.product}</h3>
          <h3>Date submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
          <hr />
          <div className='ticket-desc'>
            <h3>Description:</h3>
            <p>{ticket.description}</p>
          </div>
        </header>
        {ticket.status !== 'closed' && (
          <button onClick={openModal} className='btn'><FaPlus />Add Note</button>
        )}

        <Modal 
          isOpen={modalIsOpen} 
          onRequestClose={closeModal} 
          style={customStyles}
          contentLabel='Add Note'
        >
          <h2>Add Note</h2>
          <button className='btn-close' onClick={closeModal}>X</button>
          <form onSubmit={onNoteSubmit}>
            <div className='form-group'>
              <textarea
                name='noteText'
                id='noteText'
                className='form-control'
                value={noteText}
                placeholder='Note text'
                onChange={(e) => setNoteText(e.target.value)}
              >
              </textarea>
            </div>
            <div>
              <button className='btn' type='submit'>Submit</button>
            </div>
          </form>
        </Modal>

        <Notes />
        {
          ticket.status !== 'closed' && (
            <button onClick={onCloseTicket} className='btn btn-block btn-danger'>
              Close ticket
            </button>
          )
        }
      </div>
    </>
  )
}

export default Ticket