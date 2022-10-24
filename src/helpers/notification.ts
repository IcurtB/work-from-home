import { toast, ToastPosition } from "react-toastify"

type messageTypes = 'succes' | 'info' | 'error'

interface IProps {
    message: string
    type: messageTypes
    id?: string
    autoClose?: number
    position?: ToastPosition
}

export const generateNotyfy = ({message, type, autoClose = 3000, position = 'top-right', id}: IProps) => {
    if(type === 'succes') {
        return toast.success(message, {autoClose, toastId: id, position})
    } else if (type === 'info') {
        return toast.info(message, {autoClose, toastId: id, position})
    } else if (type === 'error') {
        return toast.error(Array.isArray(message) ? message.join(', ') : message, {autoClose, toastId: id, position})
    }
}