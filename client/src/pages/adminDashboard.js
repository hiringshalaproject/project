import React from 'react'
import { Link } from 'react-router-dom'

function AdminDashboard() {
  return (
    <div>
        <h1>Admin Dashboard</h1>
        <Link to='/addJob'>Add Job</Link><br/>
        <Link to='/get'>Get All Jobs</Link>
        
    </div>
  )
}

export default AdminDashboard