'use client'
 
import styles from './styles.module.css'
import { ChangeEvent, useState } from 'react';
 
 
type Props = {
    label:string;
    type: "text" | "email";
    multiline?: boolean;
    text?: string;
    onChange?(texto: string): void;
}
 
export default function TextField(props: Props) {
 
    const [texto, setTexto] = useState(props.text);
 
    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTexto(e.target.value);
        if (props.onChange){
            props.onChange(e.target.value);
        }
    }
 
    function handleTextAreaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setTexto(e.target.value);
        if (props.onChange){
            props.onChange(e.target.value);
        }
    }
 
    return(
        <span className={styles.root}>
        <label>
            <span className={styles.label}>{props.label}</span>
            {
                (props.multiline) ? (
                <textarea 
                onChange={handleTextAreaChange}
                placeholder={props.label}
                value={texto}
                
                />
            ):(
                <input
                type={props.type}
                placeholder={props.label}
                value={texto}
                onChange={handleInputChange}
                />
            )
            }
 
        </label>
        </span>
    )
}