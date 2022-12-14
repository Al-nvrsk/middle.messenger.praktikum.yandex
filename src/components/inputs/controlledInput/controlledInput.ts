import Block from 'utils/Block'
import validateForm from 'utils/helper/validateForm'
import './controlledInput.css'

interface ControlledInputProps {
  onFocus?: () => void
  onInput?: () => void
  type?: 'text' | 'password' | 'email'
  placeholder?: string
  value?: string
  name: string
  description: string
  label?: string
}

export default class ControlledInput extends Block<Indexed> {
  static componentName = 'ControlledInput'
  constructor (props: ControlledInputProps) {
    super({
      error: '',
      inputValue: '',
      ...props,
      onBlur: (e: FocusEvent): void => {
        const inputEl = e.target as HTMLInputElement
        const errorMessage = validateForm(
          { type: inputEl.name, value: inputEl.value }
        )

        this.refs.errorRef.setProps({ text: errorMessage })
      },
      onInput: (e: Event): void => {
        if (this.refs.errorRef.props.text) {
          const inputEl = e.target as HTMLInputElement
          const errorMessage = validateForm(
            { type: inputEl.name, value: inputEl.value })

          this.refs.errorRef.setProps({ text: errorMessage })
        }
      }
    })
  }

  protected render (): string {
    return `
    <div>
      <div class="controlledInput">
      <div class = "controlledInputLabel">
        {{label}}
      </div>
      <div class="controlledInputField">
      {{{InputBase 
        name = "${this.props.name}"
        type = "${this.props.type}"
        placeholder = "${this.props.placeholder}"
        onFocus = onFocus
        onInput = onInput
        onBlur = onBlur
        value = "${this.props.value}"
        ref = "{{ref}}"
        
      }}}
      </div>
        <hr class = "controlledInputLine" />
      <div class="errorrs">
      {{{errorBase ref="errorRef" text=error}}}
      </div>
      </div>
      </div>
      `
  }
}
