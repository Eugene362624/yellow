import React, { useEffect, useState } from 'react'
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import './Main.scss'
import axios from 'axios';
import { Link } from 'react-router-dom';

function Main({filterBar, menuIsOpen, onBurgerClick}) {
    const [modal, setModal] = useState(false)
    const [jogs, setJogs] = useState([])
    const [filteredJogs, setFilteredJogs] = useState([])
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')

    
    console.log(jogs, filteredJogs)
    const filterFromTo = () => {
        console.log(Date.parse(dateFrom), Date.parse(dateTo))
        setFilteredJogs(jogs.filter(jog => jog.date > Date.parse(dateFrom) && jog.date < Date.parse(dateTo)))
    }

    // console.log(jogs)
    let token = localStorage.getItem('token')
    if(token) {
        
    }
    useEffect(() => {
        axios.get('https://jogtracker.herokuapp.com/api/v1/data/sync', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => setJogs(res.data.response.jogs))
    }, [])
    
    const newJog = (e) => {
        e.preventDefault()
        console.log(e.target[0].value)
        console.log(e.target[1].value)
        console.log(e.target[2].value)
        axios.post('https://jogtracker.herokuapp.com/api/v1/data/jog', {
            date: e.target[2].value,
            time: e.target[1].value,
            distance: e.target[0].value
        },{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(
            setModal(false),
            axios.get('https://jogtracker.herokuapp.com/api/v1/data/sync', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => setJogs(res.data.response.jogs))
        )
        .catch(error => console.log(error.response)) 
    }

    return (
        <React.Fragment>
            {
            !filterBar ?  "" :
            <div className="filter-bar">
                <div className="container">
                    <div className="filter-bar--left">
                        <label htmlFor="">Date from</label>
                        <input type="date" onChange={(e) => {setDateFrom(e.target.value); filterFromTo()}}/>
                    </div>
                    <div className="filter-bar--right">
                        <label htmlFor="" >Date to</label>
                        <input type="date" onChange={(e) => {setDateTo(e.target.value); filterFromTo()}}/>
                    </div>
                </div>
            </div>
            }

            <div style={{display: !menuIsOpen ? "none" : ''}}>
                <ul className='menu'>
                    <Link onClick={onBurgerClick} to='/'><li>jogs</li></Link>
                    <Link onClick={onBurgerClick} to='/info'><li>info</li></Link>
                    <Link><li>contact us</li></Link>
                </ul>
            </div>

        <div className="mainPage" style={{display: menuIsOpen ? "none" : ''}}>
        {
            modal?
                <div className="add-jog--modal-wrap">
                    <div style={{position: 'relative'}} className="add-jog--modal">
                        <IconButton onClick={() => setModal(false)} style={{position:'absolute', top: '10px', right: '10px'}}>
                            <CloseIcon style={{color: 'white', fontSize: '27px'}}></CloseIcon>
                        </IconButton>
                        <form onSubmit={(e) => newJog(e)}>
                            <div className="distance">
                                <label>Distance</label>
                                <input name="distance" type="text" />
                            </div>
                            <div className="time">
                                <label>Time</label>
                                <input name="time" type="text" />
                            </div>
                            <div className="date">
                                <label>Date</label>
                                <input name="date" type="date" />
                            </div>
                            <button type="submit">
                            Save
                            </button>
                        </form>
                    </div>
                </div>
                :''
                }
            
            {
                jogs.length > 0 ? 
                <div className="jog-list-wrap">
                <div className="container">
                    {filteredJogs.length > 0 ? filteredJogs.map((e, i) => {return <div className="jog-list--element">
                        <div className="jog-list--element-image">
                        <svg width="87" height="87" viewBox="0 0 87 87">
                            <g fill="none" fillRule="evenodd">
                                <circle cx="43.5" cy="43.5" r="43.5" fill="#E990F9"/>
                                <g fill="#FFF">
                                    <path d="M32.932 28.86h16.937a.808.808 0 0 0 .806-.81.807.807 0 0 0-.806-.809H32.932a.807.807 0 0 0-.806.809c0 .447.36.81.806.81zM17.784 36.772h16.937a.807.807 0 0 0 .806-.81c0-.446-.36-.809-.806-.809H17.784a.808.808 0 0 0-.806.81c0 .447.361.809.806.809zM22.331 45.099c0 .446.36.809.805.809h16.938a.807.807 0 0 0 .806-.81c0-.446-.36-.809-.806-.809H23.136a.807.807 0 0 0-.805.81zM32.024 54.504H16.806a.807.807 0 0 0-.806.809c0 .447.36.81.806.81h15.218a.807.807 0 0 0 .806-.81.807.807 0 0 0-.806-.81zM59.407 33.933c2.43 0 4.4-1.979 4.4-4.42s-1.97-4.42-4.4-4.42c-2.432 0-4.402 1.98-4.402 4.42 0 2.441 1.97 4.42 4.402 4.42z"/>
                                    <path d="M66.647 32.66c-2.527 3.556-5.912 3.967-9.554 1.796-.247-.147-1.347-.756-1.59-.901-5.86-3.493-11.71-2.124-15.636 3.396-1.667 2.347 2.19 4.572 3.84 2.252 2.027-2.852 4.605-3.677 7.425-2.773-1.444 2.517-2.706 5.018-4.488 8.572-1.781 3.554-5.715 6.392-9.494 4.172-2.728-1.6-5.187 2.334-2.468 3.93 5.16 3.028 11.21 1.169 14.299-2.768.107.057.22.11.344.153 2.524.883 5.831 3.233 6.84 4.066 1.006.833 2.738 5.077 3.765 7.21 1.248 2.586 5.275.702 4.023-1.896-1.165-2.42-3.121-7.248-4.646-8.47-1.224-.979-3.6-2.802-5.615-3.836a176.456 176.456 0 0 1 4.277-7.854c4.763 1.466 9.29-.26 12.515-4.797 1.67-2.347-2.187-4.572-3.837-2.252z"/>
                                </g>
                            </g>
                        </svg>
                        </div>
                        <div className="jog-list--element-info">
                            <p>{new Date(e.date).toLocaleDateString()}</p>
                            <p><span>Speed:</span> {(e.distance / e.time).toFixed(2)} km/m</p>
                            <p><span>Distance:</span> {e.distance} km</p>
                            <p><span>Time:</span> {e.time} mins</p>
                        </div>
                    </div>
                }) : jogs ? jogs.map((e, i) => {return <div className="jog-list--element">
                        <div className="jog-list--element-image">
                        <svg width="87" height="87" viewBox="0 0 87 87">
                            <g fill="none" fillRule="evenodd">
                                <circle cx="43.5" cy="43.5" r="43.5" fill="#E990F9"/>
                                <g fill="#FFF">
                                    <path d="M32.932 28.86h16.937a.808.808 0 0 0 .806-.81.807.807 0 0 0-.806-.809H32.932a.807.807 0 0 0-.806.809c0 .447.36.81.806.81zM17.784 36.772h16.937a.807.807 0 0 0 .806-.81c0-.446-.36-.809-.806-.809H17.784a.808.808 0 0 0-.806.81c0 .447.361.809.806.809zM22.331 45.099c0 .446.36.809.805.809h16.938a.807.807 0 0 0 .806-.81c0-.446-.36-.809-.806-.809H23.136a.807.807 0 0 0-.805.81zM32.024 54.504H16.806a.807.807 0 0 0-.806.809c0 .447.36.81.806.81h15.218a.807.807 0 0 0 .806-.81.807.807 0 0 0-.806-.81zM59.407 33.933c2.43 0 4.4-1.979 4.4-4.42s-1.97-4.42-4.4-4.42c-2.432 0-4.402 1.98-4.402 4.42 0 2.441 1.97 4.42 4.402 4.42z"/>
                                    <path d="M66.647 32.66c-2.527 3.556-5.912 3.967-9.554 1.796-.247-.147-1.347-.756-1.59-.901-5.86-3.493-11.71-2.124-15.636 3.396-1.667 2.347 2.19 4.572 3.84 2.252 2.027-2.852 4.605-3.677 7.425-2.773-1.444 2.517-2.706 5.018-4.488 8.572-1.781 3.554-5.715 6.392-9.494 4.172-2.728-1.6-5.187 2.334-2.468 3.93 5.16 3.028 11.21 1.169 14.299-2.768.107.057.22.11.344.153 2.524.883 5.831 3.233 6.84 4.066 1.006.833 2.738 5.077 3.765 7.21 1.248 2.586 5.275.702 4.023-1.896-1.165-2.42-3.121-7.248-4.646-8.47-1.224-.979-3.6-2.802-5.615-3.836a176.456 176.456 0 0 1 4.277-7.854c4.763 1.466 9.29-.26 12.515-4.797 1.67-2.347-2.187-4.572-3.837-2.252z"/>
                                </g>
                            </g>
                        </svg>
                        </div>
                        <div className="jog-list--element-info">
                            <p>{new Date(e.date).toLocaleDateString()}</p>
                            <p><span>Speed:</span> {(e.distance / e.time).toFixed(2)} km/m</p>
                            <p><span>Distance:</span> {e.distance} km</p>
                            <p><span>Time:</span> {e.time} mins</p>
                        </div>
                    </div>
                }) : 'ss'}
            </div>
            
        </div> 
        :    
        <div className="sad-face--wrap" style={{maxWidth:"100%"}}>
            {jogs.length == 0 ? <React.Fragment>
                <div className="sad-face">
                    <svg width="150" height="149" viewBox="0 0 150 149">
                        <path fill="#B0B0B0" fillRule="evenodd" d="M21.9 21.815c-29.201 29.06-29.201 76.337.007 105.396 29.193 29.053 76.717 29.053 105.915-.007 29.208-29.052 29.201-76.329.008-105.382C98.624-7.238 51.1-7.238 21.9 21.815zm97.754 97.261c-24.692 24.576-64.887 24.576-89.579.007-24.705-24.574-24.698-64.566 0-89.14 24.692-24.568 64.88-24.568 89.586.006 24.699 24.568 24.693 64.56-.007 89.127zm-10.926-15.109a4.21 4.21 0 0 1-2.205 5.542 4.237 4.237 0 0 1-5.57-2.195c-4.089-9.395-13.738-15.465-24.596-15.465-11.106 0-20.819 6.07-24.733 15.458a4.252 4.252 0 0 1-3.916 2.6 4.213 4.213 0 0 1-1.62-.323c-2.165-.897-3.185-3.36-2.288-5.506 5.239-12.552 18.019-20.659 32.564-20.659 14.236 0 26.94 8.066 32.364 20.548zM41.835 52.933a3.429 3.429 0 0 1 1.275-4.706l12.774-7.297a3.472 3.472 0 0 1 4.728 1.275 3.43 3.43 0 0 1-1.274 4.705l-12.773 7.298a3.474 3.474 0 0 1-4.73-1.275zm19.811.15a6.044 6.044 0 0 1 0 8.587 6.127 6.127 0 0 1-8.636 0 6.057 6.057 0 0 1 0-8.586 6.127 6.127 0 0 1 8.636 0zm20.757-20.625a3.458 3.458 0 0 1 3.757-3.127l14.67 1.31a3.453 3.453 0 0 1 3.142 3.745 3.46 3.46 0 0 1-3.764 3.127l-14.663-1.317a3.444 3.444 0 0 1-3.142-3.738zM98.064 52.98a6.06 6.06 0 0 1 0 8.588c-2.39 2.372-6.26 2.372-8.636.005a6.053 6.053 0 0 1 0-8.593 6.127 6.127 0 0 1 8.636 0z"/>
                    </svg>
                    <p>Nothing is there</p>
                </div>
                <button onClick={() => setModal(true)} className='outlined'>
                    Create your jog first
                </button>
                </React.Fragment>
                :
                ''}
                
            </div>
            }
            {jogs.length !== 0 ? modal ? "" :
            <button className='fixed' onClick={() => setModal(true)}>
                <svg width="60" height="60" viewBox="0 0 60 60">
                    <defs>
                        <path id="a" d="M.039.128h59.883v59.234H.039z"/>
                    </defs>
                    <g fill="none" fillRule="evenodd">
                        <g>
                            <path fill="#7ED321" d="M29.987.128C13.47.128 0 13.405 0 29.743c0 16.342 13.42 29.62 29.987 29.62 16.515 0 29.935-13.278 29.935-29.62 0-16.338-13.42-29.615-29.935-29.615zm0 55.098c-14.193 0-25.755-11.44-25.755-25.483 0-14.042 11.562-25.48 25.755-25.48 14.194 0 25.754 11.438 25.754 25.48 0 14.043-11.56 25.483-25.754 25.483z" mask="url(#b)"/>
                        </g>
                        <path fill="#7ED321" d="M43.768 27.395H32.105V15.804c0-1.175-.93-2.093-2.118-2.093-1.186 0-2.117.918-2.117 2.093v11.541H16.207c-1.187 0-2.117.918-2.117 2.095 0 1.174.93 2.091 2.117 2.091H27.87v11.542c0 1.174.93 2.092 2.117 2.092 1.187 0 2.118-.918 2.118-2.092V31.531h11.663c1.187 0 2.117-.917 2.117-2.091 0-1.177-.93-2.045-2.117-2.045z"/>
                    </g>
                </svg>

                </button> : ''
        }
        </div>
        </React.Fragment>
    )
}


export default Main
