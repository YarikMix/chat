import {Button, TextField, Typography} from "@mui/material";
import {FormEvent, useEffect, useState} from "react";
import "./style.sass"
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.ts";

function AuthPage() {
    const navigate = useNavigate()

    const {is_authenticated, login} = useAuth()

    const  [value, setValue] =  useState('')

    useEffect(() => {
        if (is_authenticated) {
            navigate("/chat")
        }
    }, []);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        login(value)
        navigate("/chat")
    }

    return (
        <div className="auth-page-wrapper">
            <div className="form">
                <Typography variant="h3">Онлайн чат</Typography>
                <TextField id="outlined-basic" label="Имя пользователя" variant="outlined" value={value} onChange={(e) => setValue(e.target.value)} error={false}/>
                <Button variant="contained" type="submit" onClick={handleSubmit}>Войти</Button>
            </div>
        </div>
    )
}

export default AuthPage