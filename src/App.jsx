
import './App.css'
import { createAccount } from './Appwrite/auth.js'
function App() {
  const handleregister = async (e) => {
    e.preventDefault(); 
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const response = await createAccount({ email, password, name });
    console.log(response);
  }
  return (
    <>
      <h1 className='text-3xl text-center'>HI</h1>
      <form onSubmit={handleregister}>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <br />
        <label>
          Name:
          <input type="text" name="name" required />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </>
  )
}

export default App
