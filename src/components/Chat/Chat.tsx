import ReactIcon from "/src/assets/react.svg"
import {IconButton} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {MessageType} from "../../store/chatSlice.ts";
import moment from "moment/moment";
import Avatar from "../Avatar/Avatar.tsx";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import {FaRegSmile} from "react-icons/fa";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import {useChat} from "../../hooks/useChat.ts";
import {FormEvent, useEffect, useRef, useState} from "react";
import {useAuth} from "../../hooks/useAuth.ts";
import {MdError} from "react-icons/md";
import "./Chat.sass"
import io from 'socket.io-client'

const SERVER_PORT = 4000
const SERVER_URL = 'http://localhost:' + SERVER_PORT

const Chat = () => {
    const {username} = useAuth()

    const {messages, newMessage} = useChat()

    const messagesEndRef = useRef<null | HTMLDivElement>(null)

    const [message, setMessage] = useState("")

    const socketRef = useRef(null)

    useEffect(() => {
        socketRef.current = io(SERVER_URL)

        // отправляем событие добавления пользователя,
        // в качестве данных передаем объект с именем и id пользователя
        socketRef.current.emit('user:add', { username })

        // отправляем запрос на получение сообщений
        socketRef.current.emit('message:get')

        // обрабатываем получение сообщений
        socketRef.current.on('message', (message) => {
            console.log("on message")
            console.log(message)

            newMessage(message)
            setTimeout(() => scrollToBottom(), 100)
        })

        return () => {
            // при размонтировании компонента выполняем отключение сокета
            socketRef.current.disconnect()
        }
    }, []);

    const sendMessage = (message) => {
        console.log("sendMessage")
        // добавляем в объект id пользователя при отправке на сервер
        socketRef.current.emit('message', message)
    }

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()

        if (!message) {
            return
        }

        setMessage("")

        sendMessage(JSON.stringify({
            "user": username,
            "time": new Date().getTime().toString(),
            "message": message.replace(/['"]+/g, '')
        }))

        setTimeout(() => scrollToBottom(), 100)
    }

    const scrollToBottom = () => {
        console.log("scrollToBottom")
        console.log(messagesEndRef.current?.lastElementChild)

        messagesEndRef.current?.lastElementChild?.scrollIntoView()

    }

    return (
        <div className="chat">
            <div className="top-panel">
                <div className="left-container">
                    <img src={ReactIcon} alt="" className="chat-avatar"/>
                    <h3>Онлайн чат</h3>
                </div>
                <div className="right-container">
                    <IconButton>
                        <SearchOutlinedIcon/>
                    </IconButton>
                </div>
            </div>
            <div className="center-panel" ref={messagesEndRef}>
                {messages.map((message: MessageType) => (
                    message.self ?
                        <div className="self-message" key={message.id}>
                            <div className={"message " + (message.error ? "error" : "")}>
                                <span className="message-content">{message.error ? "Сообщение пришло с ошибкой" : message.content}</span>
                                <span className="message-send-time">{moment(message.time).format('HH:mm')}</span>
                                {message.error && <MdError className="error-icon"/> }
                            </div>
                        </div>
                        :
                        <div className="message-container" key={message.id}>
                            <div className="avatar-container">
                                <Avatar username={message.user}/>
                            </div>
                            <div className="message-body">
                                <span className="username">{message.user}</span>
                                <div className={"message " + (message.error ? "error" : "")}>
                                    <span className="message-content">{message.error ? "Сообщение пришло с ошибкой" : message.content}</span>
                                    <span className="message-send-time">{moment(message.time).format('HH:mm')}</span>
                                    {message.error && <MdError className="error-icon" /> }
                                </div>
                            </div>
                        </div>
                ))}
            </div>
            <form className="bottom-panel" onSubmit={handleSubmit}>
                <IconButton>
                    <AttachFileIcon/>
                </IconButton>
                <input type="text" className="message-input" placeholder="Написать сообщение" value={message} onChange={e => setMessage(e.target.value)}/>
                <IconButton>
                    <FaRegSmile/>
                </IconButton>
                <IconButton>
                    <KeyboardVoiceOutlinedIcon/>
                </IconButton>
            </form>
        </div>
    )
}

export default Chat