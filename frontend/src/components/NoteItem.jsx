
const NoteItem = ({note, user}) => {
  return (
    <div 
        className="note"
        style={{
            backgroundColor: note.isStaff ? 'rgba(0,0,0,0.7)' : '#fff',
            color: note.isStaff ? '#fff' : '#000'
        }}
    >
        <h4>Note from {note.isStaff ? <span>Staff</span> : <span>{user}</span>} </h4>
        <p>{note.text}</p>
        <div>
            {new Date(note.createdAt).toLocaleDateString('en-US')}
        </div>
    </div>
  )
}

export default NoteItem