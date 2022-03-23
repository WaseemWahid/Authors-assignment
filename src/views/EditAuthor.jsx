import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory, useParams, Link } from 'react-router-dom'

const EditAuthor = () => {
    const { id } = useParams()
    const [name, setName] = useState("")
    const history = useHistory()
    const [errors, setErrors] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/authors/${id}`)
            .then(res => {
                const author = res.data
                setName(author.name)
            })
            .catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:8000/api/authors/${id}`, { name })
            .then(res => {
                history.push("/")
            })
            .catch(err => {
                const errorResponse = err.response.data.errors
                const errorArr = []
                for (const key of Object.keys(errorResponse)) { // key = "petname"
                    errorArr.push(errorResponse[key]["message"])
                }
                setErrors(errorArr)
            })
    }

    return (
        <div>
            <h4 className='text-center'>Edit this Author:</h4>
            <div className="d-flex justify-content-center">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input className="form-control" type="text" name='name' value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="d-flex justify-content-between">
                        <Link to="/" className='btn btn-danger'>Cancel</Link>
                        <button className='btn btn-primary'>Submit</button>
                    </div>
                </form>
                {
                    errors.map((err, i) => (
                        <p key={i} style={{ color: "red" }}>{err}</p>
                    ))
                }
            </div>
        </div>
    )
}

export default EditAuthor