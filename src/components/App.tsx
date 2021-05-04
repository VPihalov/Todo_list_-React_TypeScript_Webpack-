import * as React from 'react';
import { ITask, IState, ITextInput } from './interfaces';

export class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      currentTask: '',
      tasks: [],
      textInput: this.utilizeFocus(),
    };
  };

  public utilizeFocus(): ITextInput {
    const ref: React.RefObject<HTMLInputElement> = React.createRef();
    const setFocus: () => void = () => ref.current && ref.current.focus();
    return {setFocus, ref};
  };

  private _timeInMilliseconds(): number {
    const date: Date = new Date;
    return date.getTime()
  };

  public deleteTask(id: number): void {
    this.setState((prevState: IState): IState => {
      return {
        ...prevState,
        tasks: this.state.tasks.filter((task: ITask): boolean => task.id !== id)
      }
    })
  };

  public completeTask(index: number, e: React.MouseEvent<HTMLElement>): void {
    e.preventDefault();
    let task: ITask[] = this.state.tasks.splice(index, 1);
    task[0].completed = !task[0].completed;
    this.setState((prevState: IState): IState => {
      return {
        ...prevState,
        tasks: [...this.state.tasks, ...task].sort((a: ITask, b: ITask): number => this.compareTasks(a.id, b.id))
      }
    })
  };

  private compareTasks(a: number, b: number): typeof YesNo {
    if (a < b) {
      return -1
    }
    if (a > b) {
      return 1
    }
  }

  public deleteAllTasks(e: React.MouseEvent<HTMLElement>): void {
    e.preventDefault()
    this.setState((prevState: IState): IState => {
      return {
        ...prevState,
        tasks: []
      }
    })
  };

  public hanldeSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    this.setState({
      currentTask: '',
      tasks: [
        ...this.state.tasks,
        {
          value: this.state.currentTask,
          id: this._timeInMilliseconds(),
          completed: false,
        }
      ]
    });
  };

  public renderTasks(): JSX.Element[] {
    return this.state.tasks.map((task: ITask, index: number) => {
      return (<div key={task.id} className='tdl-task'>
        <span className={task.completed ? 'is-completed' : ''}>{task.value}</span>
        <button onClick={(): void => this.deleteTask(task.id)}>Delete task</button>
        <button onClick={(e: React.MouseEvent<HTMLElement>): void => this.completeTask(index, e)}>{task.completed ? 'udno' : 'done'}</button>
      </div>)
    })
  }

  public render(): JSX.Element {
    return (
      <div>
        <h1>React Todo List</h1>
        <form onSubmit={(e: React.FormEvent<HTMLFormElement>): void => {this.hanldeSubmit(e)}}>
          <input 
            type="text"
            ref={this.state.textInput.ref}
            className='tdl-input'
            placeholder="add a task"
            value={this.state.currentTask}
            onChange={(e: React.FormEvent<HTMLInputElement>): void => this.setState({currentTask: e.currentTarget.value})}  
          >
          </input>
          <button type="submit">Add task</button>
          <button onClick={(e: React.MouseEvent<HTMLElement>): void => this.deleteAllTasks(e) }>Delete All</button>
          <section>{this.renderTasks()}</section>
        </form>
      </div>
    )
  }
}

const YesNo: number = -1 | 1;