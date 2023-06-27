import React, { useState } from "react"
import ToTop from "./ToTop"
import styles from "../styles/Filter.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

type FilterProps = {
    items : Array<any>,
    func? : Function,
    cb? : Function
}

type ButtonProps = {
    key? : Number,
    id? : any,
    title : string,
    func? : Function,
    cb? : Function,
    cbParam : any
}

export const Button = ({ key, title, func, id, cb, cbParam }: ButtonProps) => {
    return (
        <button type="button" key={key} onClick={() => { 
            func(title, id)
            cb(!cbParam)
        }}>{title}</button>
    )
}

const Filter = ({ items = [], func = () => {}, cb = () => {} }: FilterProps) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const triggerMenu = () => {
        setMenuOpen(!menuOpen)
    }
    return (
      <div className={styles.filterCont}>
        <div className={styles.controls} onClick={() => triggerMenu()}>
            <span>Select</span>
            <FontAwesomeIcon icon={menuOpen ? faCaretUp : faCaretDown} />
        </div>
        <div className={`${styles.btnCont} ${menuOpen ? styles.active : ''}`}>
            {items.map(item => (<Button func={func} cb={setMenuOpen} cbParam={menuOpen} key={item.id} id={item.id} title={item.title}></Button>))}    
        </div> 
      </div> 
    )
}

export default Filter