import {useDispatch, useSelector} from "react-redux";
import {addMessage, cleanMessages} from "../store/chatSlice.ts";
import {useAuth} from "./useAuth.ts";
import {createUUID} from "../utils/utils.ts";

type ChatMessage = {
    user: string,
    message: string,
    time: string,
    error: boolean
}

export function useChat() {
    // @ts-ignore
    const {messages} = useSelector(state => state.chat)

    const {username} = useAuth()

    const dispatch = useDispatch()

    const newMessage = (data:ChatMessage) => {
        console.log("newMessage")

        const self = data.user == username

        if (data.error && self) {
            return
        }

        const message = {
            self: data.user == username,
            user: data.user,
            time: new Date(Number(data.time)).toString(),
            content: data.message,
            error: self ? false : data.error,
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