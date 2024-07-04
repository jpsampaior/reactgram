import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

import "./Auth.css"

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  
  const handleSubmit = (e) => {
    e.preventDefault()

    const user = {
      name,
      email,
      password,
      confirmPassword
    }
  }

  return (
    <div id="register">
      <h2>ReactGram</h2>
      <p className="subtitle">Sign up to see your friends' photos!</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" onChange={(e) => setName(e.target.value)} value={name}/>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email}/>
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
        <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}/>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Sign In</Link></p>
    </div>
  )
}

export default Register