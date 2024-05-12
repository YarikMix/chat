import {useDispatch, useSelector} from "react-redux";
import {addMessage, cleanMessages} from "../store/chatSlice.ts";
import {useAuth} from "./useAuth.ts";
import {createUUID} from "../utils/utils.ts";

type ChatMessage = {
    username: string,
    message: string,
    send_time: string,
    error: boolean
}

export function useChat() {
    // @ts-ignore
    const {messages} = useSelector(state => state.chat)

    const {username} = useAuth()

    const dispatch = useDispatch()

    const newMessage = (data:ChatMessage) => {
        console.log("newMessage")

        const message = {
            self: data.username == username,
            user: data.username,
            time: new Date(Number(data.send_time)).toString(),
            content: data.message,
            error: data.error,
            id: createUUID()
        }

        console.log(message)

        dispatch(addMessage(message))
    }

    const exit = () => {
        dispatch(cleanMessages())
    }

    return {
        messages,
        newMessage,
        exit
    }
}