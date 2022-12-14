import Block from 'utils/Block'
import './UserInfoPage.css'
import type { AppState } from 'store/defaultState'
import { connect } from 'utils/helper/connect'
import userInfoPageStatus from 'data/userInfoPageStatus'
import { router } from 'router/routerApp'
import store from 'store/Store'
import { BASE_URL } from 'api/baseAPI'

interface IncomingProps {
  user: User
  isChangeAvatarActive: boolean
  isChangePasswordActive: boolean
  isChangeUserInfoActive: boolean
  isAuth: boolean
}

class UserInfoPage extends Block<Indexed> {
  static componentName = 'UserInfoPage'
  constructor (props: IncomingProps) {
    super(props)
    this.setProps({
      store: store.getState(),
      gotoBack: () => router.back(),
      changeAvatar: () => store.setState('isChangeAvatarActive', true),
      changePassword: () => store.setState('isChangePasswordActive', true),
      changeUserInfo: () => store.setState('isChangeUserInfoActive', true)
    })
  }

  render (): string {
    if (!this.props.isAuth) {
      router.go('/auth')
      throw new Error('You have to be authorized')
    } else {
      let path = ''
      if (this.props.user) {
        path = `${BASE_URL}` + `/resources${this.props.user.avatar}`
      }
      return `
      <main class = "userInfoPage">
      {{{ modalChangeAvatar active = ${this.props.isChangeAvatarActive} }}}
      {{{ modalChangePassword active = ${this.props.isChangePasswordActive} }}}
      {{{modalChangeUserInfo active = ${this.props.isChangeUserInfoActive}}}}
      
        <div class = "mainUserInfoPage">
          {{{ButtonReturn onClick=gotoBack }}}
            <div class = "userinfopage">
              <img src = "${path}" alt = "avatar">
    
              ${this.props.user && (userInfoPageStatus?.map(val =>
                  `{{{ UserStat 
                      name = "${val.name}"
                      value = "${this.props.user[val.name]}"}}}`)).join(' ')}
      
            </div>
            <div class = "userInfoPageBlock">

              
                  {{{ButtonChange value = "Change avatar" onClick = changeAvatar }}}
                  {{{ButtonChange value = "Change userInfo" onClick = changeUserInfo }}}
                  {{{ButtonChange value = "Change password" onClick = changePassword }}}
                  
                  {{{ ButtonReject value = "Exit" type = "button" onClick=gotoBack }}}
                  
            </div>
        </div>
        
        
      </main>
    `
    }
  }
}

function mapStateToProps (state: AppState | Indexed): Indexed {
  return {
    user: state.user,
    isChangeAvatarActive: state.isChangeAvatarActive,
    isChangePasswordActive: state.isChangePasswordActive,
    isChangeUserInfoActive: state.isChangeUserInfoActive,
    isAuth: state.isAuth
  }
}
const withStore = connect(mapStateToProps)

export default withStore(UserInfoPage)
