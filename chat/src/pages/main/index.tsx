import "./style.sass"
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {BsChatFill, BsCheckAll} from "react-icons/bs";
import {LuPhone, LuUsers} from "react-icons/lu";
import {FaRegUser} from "react-icons/fa6";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import {AiOutlineQuestionCircle} from "react-icons/ai";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import {HiOutlineChat} from "react-icons/hi";
import {RiUnpinLine} from "react-icons/ri";
import {IconButton} from "@mui/material";
import ReactIcon from "/src/assets/react.svg"
import AttachFileIcon from '@mui/icons-material/AttachFile';
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';
import {FaRegSmile} from "react-icons/fa";
import Avatar from "../../components/Avatar/Avatar.tsx";
import {useAuth} from "../../hooks/useAuth.ts";
import {useNavigate} from "react-router-dom";
import UserProfile from "../../components/UserProfile/UserProfile.tsx";
import {useChat} from "../../hooks/useChat.ts";
import moment from "moment";
import {MessageType} from "../../store/chatSlice.ts";
import {useEffect, useRef, useState} from "react";
import useWebSocket from "react-use-websocket";


function MainPage() {
    const {is_authenticated, username} = useAuth()

    const {messages, newMessage} = useChat()

    const navigate = useNavigate()

    const messagesEndRef = useRef<null | HTMLDivElement>(null)

    const [message, setMessage] = useState("")

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/")
        }

    }, []);

    const { sendMessage } = useWebSocket("ws://localhost:8000/ws/socket-server/", {
        onMessage: (message) => {
            console.log("onMessage");
            console.log(message)
            console.log(message.data)
            console.log(JSON.parse(message.data))
        },
        onOpen: () => {
            console.log("websocket connection open")
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!message) {
            return
        }

        newMessage(message)
        setMessage("")


        sendMessage(JSON.stringify({
            "user": username,
            "time": new Date().toString(),
            "message": message
        }))


        setTimeout(() => scrollToBottom(), 100)
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.lastElementChild?.scrollIntoView()
    }

    return (
        <div className="main-page-wrapper">
            <aside>
                <div className="top-container">
                    <UserProfile />
                    <nav>
                        <div className="nav-item">
                            <MailOutlineIcon/>
                            <span>Почта</span>
                        </div>
                        <div className="nav-item selected">
                            <BsChatFill/>
                            <span>Чаты</span>
                        </div>
                        <div className="nav-item">
                            <LuPhone/>
                            <span>Телефон</span>
                        </div>
                        <div className="nav-item">
                            <FaRegUser/>
                            <span>Контакты</span>
                        </div>
                        <div className="nav-item">
                            <CalendarMonthOutlinedIcon/>
                            <span>Календарь</span>
                        </div>
                        <div className="nav-item">
                            <FolderOutlinedIcon/>
                            <span>Файлы</span>
                        </div>
                        <div className="nav-item">
                            <SettingsOutlinedIcon/>
                            <span>Настройки</span>
                        </div>
                    </nav>
                </div>
                <div className="bottom-container">
                    <div className="tech-support-container">
                        <AiOutlineQuestionCircle />
                    </div>
                </div>
            </aside>
            <header>
                <IconButton>
                    <ArrowBackOutlinedIcon className="back-icon" />
                </IconButton>
                <div className="search-bar">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder="Искать в чатах / Ctrl + F" />
                </div>
                <div className="right-panel">
                    <div className="item">
                        <LuPhone/>
                        <span>Позвонить</span>
                    </div>
                    <div className="item">
                        <MailOutlineIcon/>
                        <span>Написать</span>
                    </div>
                    <div className="slash"></div>
                    <div className="item">
                        <PersonAddAltOutlinedIcon/>
                        <span>Добавить</span>
                    </div>
                    <div className="item">
                        <HiOutlineChat/>
                        <span>Новый чат</span>
                    </div>
                    <div className="item">
                        <LuUsers/>
                        <span>Каналы</span>
                    </div>
                    <div className="slash"></div>
                    <div className="item">
                        <RiUnpinLine/>
                        <span>Открепить</span>
                    </div>
                </div>
            </header>
            <div className="chats-container">
                <div className="top-panel">
                    <div className="list">
                        <li className="selected">Все</li>
                        <li>Групповые</li>
                        <li>Скрытые</li>
                    </div>
                </div>
                <div className="bottom-panel">
                    <div className="chat-item">
                        <div className="left-container">
                            <img src={ReactIcon} alt="" className="chat-image"/>
                        </div>
                        <div className="right-container">
                            <div className="top-container">
                                <h3 className="chat-title">Онлайн чат</h3>
                                <div className="message-info">
                                    <BsCheckAll />
                                    <span>15:56</span>
                                </div>
                            </div>
                            <div className="bottom-container">
                                <span className="message"><span className="author">Вы:</span> последнее сообщение в чате</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="chat">
                <div className="top-panel">
                    <div className="left-container">
                        <img src={ReactIcon} alt="" className="chat-avatar" />
                        <h3>Онлайн чат</h3>
                    </div>
                    <div className="right-container">
                        <IconButton>
                            <SearchOutlinedIcon />
                        </IconButton>
                    </div>
                </div>
                <div className="center-panel" ref={messagesEndRef}>
                    {messages.map((message: MessageType) => (
                        message.self ?
                            <div className="self-message" key={message.id}>
                                <div className="message">
                                    <span className="message-content">{message.content}</span>
                                    <span className="message-send-time">{moment(message.time).format('HH:mm')}</span>
                                </div>
                            </div>
                            :
                            <div className="message-container" key={message.id}>
                                <div className="avatar-container">
                                    <Avatar username={message.user}/>
                                </div>
                                <div className="message-body">
                                    <span className="username">{message.user}</span>
                                    <div className="message">
                                        <span className="message-content">{message.content}</span>
                                        <span
                                            className="message-send-time">{moment(message.time).format('HH:mm')}</span>
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
        </div>
    )
}


export default MainPage