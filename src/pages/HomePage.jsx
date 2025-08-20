import { useNavigate } from 'react-router-dom'

function HomePage() {
  const navigate = useNavigate()
  return (
    <div>
      <h1>Welcome to Qamb Burgers</h1>
      <button onClick={() => navigate('/menu')}>Order Now</button>
    </div>
  )
}
export default HomePage
