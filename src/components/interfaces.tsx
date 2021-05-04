interface IState {
  currentTask: string,
  tasks: Array<ITask>,
  textInput: ITextInput,
}

interface ITextInput {
  setFocus: () => void,
  ref: React.RefObject<HTMLInputElement>,
}

interface ITask {
  id: number,
  value: string,
  completed: boolean,
}

export {
  IState,
  ITextInput,
  ITask,
}