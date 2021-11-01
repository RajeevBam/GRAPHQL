import PropTypes from 'prop-types'
import Button from './Button'
const Header = ({tittle}) => {
    const onClick = () =>{
        console.log("hello")
    }
    return (
       <header className='header'>
           <h1>{tittle}</h1>
           <Button onClick={onClick} color='green' text='Add'/>
        </header>

    )
}

export default Header
