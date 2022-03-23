import React, { useState } from 'react'
import axios from "axios"
import { useHistory } from 'react-router-dom'

const Create = () => {
    const [name, setName] = useState("")
    const history = useHistory()
    const [errors, setErrors] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8000/api/authors`, { name })
            .then(res => {
                history.push("/")
            })
            .catch(err => {
                const errorResponse = err.response.data.errors
                const errorArr = []
                for (const key of Object.keys(errorResponse)) { // key = "petname"
                    errorArr.push(errorResponse[key]["message"])
                }
                console.log(errorArr)
                setErrors(errorArr)
            })
    }

    return (
        <div>
            <h4 className='text-center'>Add a new Author:</h4>
            <div className="d-flex justify-content-center">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input className="form-control" type="text" name='name' value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="d-flex justify-content-around">
                        <button className='btn btn-success'>Submit</button>
                    </div>
                </form>
            </div>

                    {
                        errors.map((err, i) => (
                            <p key={i} style={{ color: "red" }} className='text-center'>{err}</p>
                        ))
                    }
        </div>
    )
}

export default Create