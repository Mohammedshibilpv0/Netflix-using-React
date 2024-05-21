import { useParams } from "react-router-dom"
import Singlemovie from '../components/Singlemovie'

function Detailpage() {
    const {id} =useParams()
  return (
    <Singlemovie id={id} />
  )
}

export default Detailpage
