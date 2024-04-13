import {useDispatch, useSelector} from "react-redux";
import {addMessage} from "../store/chatSlice.ts";
import {useAuth} from "./useAuth.ts";
import {createUUID} from "../utils/utils.ts";

type ChatMessage = {
    user: string,
    message: string,
    time: string
}

export function useChat() {
    // @ts-ignore
    const {messages} = useSelector(state => state.chat)

    const {username} = useAuth()

    const dispatch = useDispatch()

    const newMessage = (data:ChatMessage) => {
        console.log("newMessage")

        const message = {
            self: data.user == username,
            user: data.user,
            time: new Date().toString(),
            content: data.message
        }

        console.log(message)

        dispatch(addMessage({
            self: data.user == username,
            user: data.user,
            time: new Date().toString(),
            content: data.message,
            id: createUUID()
        }))
    }

    return {
        messages,
        newMessage
    }
}