import React from 'react'

import styles from './ToggleButton.module.css';

interface props {
    onSlide: (e: React.FormEvent) => void
    checkedSet: boolean
    text: string,
    parent?: boolean
    onDropdown?: (e: React.FormEvent) => void
}

export const Checkbox: React.FC<props> = ({onSlide, checkedSet, text, parent, onDropdown}) => {

    return (
        <div className={styles.container}>
            <p className={styles.switchText}>{text}</p>
            <div className={styles.actions}>
                {
                    parent ?
                        <svg 
                            onClick={onDropdown}
                            className={styles.dropdown} 
                            xmlns="http://www.w3.org/2000/svg" 
                            height="24px" 
                            viewBox="0 0 24 24" 
                            width="24px"
                            fill="#000000">
                                <path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 10l5 5 5-5H7z"/>
                        </svg>
                    : ''
                }
                <label onClick={onSlide} className={styles.switch}>
                    <span className={`${styles.slider} ${checkedSet ? styles.checked : ''}`}></span>
                </label>
            </div>
        </div>
    )
}