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
import {useAuth} from "../../hooks/useAuth.ts";
import {useNavigate} from "react-router-dom";
import UserProfile from "../../components/UserProfile/UserProfile.tsx";
import {useEffect} from "react";
import Chat from "../../components/Chat/Chat.tsx";

function MainPage() {
    const {is_authenticated} = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/")
        }
    }, []);

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
            <Chat />
        </div>
    )
}


export default MainPage