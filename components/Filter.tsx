import React, { useState } from "react"
import styles from "../styles/Filter.module.css"

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
    cb? : Function
}

export const Button = ({ key, title, func, id }: ButtonProps) => {
    return (
        <button key={key} onClick={() => func(title, id)}>{title}</button>
    )
}

const Filter = ({ items = [], func = () => {}, cb = () => {} }: FilterProps) => {
    return (
      <div className={styles.filterCont}>
        {items.map(item => (<Button func={func} cb={cb} key={item.id} id={item.id} title={item.title}></Button>))} 
      </div> 
    )
}

export default Filter