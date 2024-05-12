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
import {FormEvent, useRef, useState} from "react";
import useWebSocket from "react-use-websocket";
import Ajv from "ajv";
import {useAuth} from "../../hooks/useAuth.ts";
import {MdError} from "react-icons/md";
import "./Chat.sass"

const Chat = () => {
    const {username} = useAuth()

    const {messages, newMessage} = useChat()

    const messagesEndRef = useRef<null | HTMLDivElement>(null)

    const [message, setMessage] = useState("")

    const { sendMessage } = useWebSocket("ws://localhost:8000/ws/socket-server/", {
        onMessage: (message) => {
            console.log("onMessage");
            console.log(message)
            console.log(message.data)
            const data = JSON.parse(message.data)
            console.log(data)
            if (data.type == "chat") {
                const ajv = new Ajv();

                const messageSchema = {
                    type: "object",
                    properties: {
                        message: {
                            type: "string"
                        },
                        send_time: {
                            type: "string"
                        },
                        username: {
                            type: "string"
                        },
                        error: {
                            type: "boolean"
                        }
                    },
                    required: [
                        "username",
                        "message",
                        "send_time",
                        "error"
                    ],
                };

                const isDataValid = ajv.validate(messageSchema, data.data)
                console.log(isDataValid)
                if (isDataValid) {
                    newMessage(data.data)
                    setTimeout(() => scrollToBottom(), 100)
                    return
                }
            }
        },
        onOpen: () => {
            console.log("websocket connection open")
        }
    });

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