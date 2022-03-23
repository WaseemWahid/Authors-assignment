import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'


const Dashboard = () => {
    const [authors, setAuthors] = useState()
    const history = useHistory()
    const [refresh, setRefresh] = useState(true)

    useEffect(() => {
        axios.get(`http://localhost:8000/api/authors`)
        .then(res=>setAuthors(res.data))
        .catch(err=>console.log(err))
    }, [refresh])

    const handleDelete = (deleteId) => {
        axios.delete(`http://localhost:8000/api/authors/${deleteId}`)
            .then(res => {
                setRefresh(!refresh)
            })
            .catch(err=> console.log(err))
    }

    return (
        <div>
            <h4>We have quotes by:</h4>
            <div>
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope='col'>Author</th>
                            <th scope='col'>Actions Available</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            authors &&
                                authors.map((author, i) =>(
                                    <tr key={i}>
                                        <td>{author.name}</td>
                                        <td><Link to={`/edit/${author._id}`} className="btn btn-warning">Edit</Link>
                                        <button onClick={()=>handleDelete(author._id)} className="btn btn-danger">Delete</button></td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Dashboard
