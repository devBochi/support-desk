import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { createTicket, reset } from "../features/tickets/ticketSlice"
import Spinner from '../components/Spinner'
import BackButton from "../components/BackButton"

function NewTicket() {
  const {user} = useSelector((state)=> state.auth)
  const { isLoading, isError, isSuccess, message } = useSelector((state)=> state.tickets)

  const [name] = useState(user.name)
  const [email] = useState(user.email)
  const [product, setProduct] = useState('iPhone')
  const [description, setDescription] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=> {
        if(isError){
            toast.error(message)
        }

        if(isSuccess) {
            dispatch(reset())
            navigate('/tickets')
        }

        dispatch(reset())
    },[dispatch, isError, isSuccess, navigate, message])


  const onSubmit = (e) => {
      e.preventDefault()
      dispatch(createTicket({product, description}))
  }

  if(isLoading){
      return <Spinner />
  }

    return (
    <>
        <BackButton url='/'/>
        <section>
            <h1>Create New Ticket</h1>
            <p>Please fill out the form below</p>
        </section>

        <section className="form">
            <div className="form-group">
                <label>Customer Name</label>
                <input type='text' className="form-control" value={name} disabled/>
            </div>
            <div className="form-group">
                <label>Customer Email</label>
                <input type='text' className="form-control" value={email} disabled/>
            </div>
            <div className="form-group">
                <form onSubmit={onSubmit}>
                    <label htmlFor="product">Product</label>
                    <select name="product" id="product" value={product} onChange={(e) => setProduct(e.target.value)}>
                        <option value='iPhone'>iPhone</option>
                        <option value='iPad'>iPad</option>
                        <option value='MacBook Pro'>MacBook Pro</option>
                        <option value='iMac'>iMac</option>
                    </select>
                    <div className="form-group">
                        <label htmlFor="description" >Description of the issue</label>
                        <textarea 
                            type='text' 
                            className="form-control" 
                            id="description" 
                            placeholder="Description"
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">Submit</button>
                    </div>
                </form>
            </div>
        </section>
    </>
  )
}

export default NewTicket