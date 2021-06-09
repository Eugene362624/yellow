import React from 'react'
import { Link } from 'react-router-dom'
import './Info.scss'

function Info({menuIsOpen, onBurgerClick}) {
    return (
        <React.Fragment>
        <div style={{display: !menuIsOpen ? "none" : ''}}>
                <ul className='menu'>
                    <Link onClick={onBurgerClick} to='/'><li>jogs</li></Link>
                    <Link onClick={onBurgerClick} to='/info'><li>info</li></Link>
                    <Link><li>contact us</li></Link>
                </ul>
            </div>
        <div className="info">
            <span>info</span>
            <p id="1">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            <p id="2">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
        </div>
        </React.Fragment>
    )
}

export default Info
