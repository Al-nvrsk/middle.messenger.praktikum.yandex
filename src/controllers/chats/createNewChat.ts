import chatsApi from 'api/chatAPI'
import getAllChats from './getAllChats'

const createNewChat = async (): Promise<void> => {
  const newChatName = prompt('Input chat name')
  if (newChatName) {
    try {
      const message = {
        title: newChatName
      }
      await chatsApi.createChats(JSON.stringify(message))
        .then(async () => await getAllChats())
    } catch (error) {
      console.log(error)
    }
  }
}

export default createNewChat
