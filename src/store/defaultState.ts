export interface AppState {
  appIsInited: boolean
  isLoading: boolean
  isAuth: boolean
  isChangeAvatarActive: boolean
  isChangePasswordActive: boolean
  isChangeUserInfoActive: boolean
  currentChatId: number
  currentChatTitle: string
  currentChatUsers: User[]
  loginFormError: string | null
  token: string
  currentChatMessages: object[]
  user: User
  chats: object[] | null
  getState?: () => Indexed
  setState?: () => void
  socket: WebSocket | null
}

export const defaultState: AppState = {
  appIsInited: false,
  isLoading: false,
  isAuth: false,
  currentChatId: 0,
  currentChatTitle: '',
  isChangeAvatarActive: false,
  isChangePasswordActive: false,
  isChangeUserInfoActive: false,
  currentChatUsers: [],
  loginFormError: null,
  token: '',
  currentChatMessages: [],
  user: {
    id: 0,
    login: '',
    firstName: '',
    secondName: '',
    display_name: '',
    avatar: '',
    phone: '',
    email: ''
  },
  chats: null,
  socket: null
}
