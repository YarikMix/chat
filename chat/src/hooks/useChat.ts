import {useDispatch, useSelector} from "react-redux";
import {addMessage} from "../store/chatSlice.ts";
import {useAuth} from "./useAuth.ts";
import {createUUID} from "../utils/utils.ts";

export function useChat() {
    // @ts-ignore
    const {messages} = useSelector(state => state.chat)

    const {username} = useAuth()

    const dispatch = useDispatch()

    const newMessage = (message:string) => {
        console.log({
            self: true,
            user: username,
            time: new Date().toString(),
            content: message
        })

        dispatch(addMessage({
            self: true,
            user: username,
            time: new Date().toString(),
            content: message,
            id: createUUID()
        }))
    }

    return {
        messages,
        newMessage
    }
}