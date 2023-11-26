import React, { ChangeEvent, Component, FormEvent } from "react";

interface TaskItemProps {
  id: number;
  taskItem: { task: string; isCompleted: boolean };
  toggleTask: (taskId: number) => void;
  deleteTask: (taskId: number) => void;
  editTask: (taskId: number, updatedTask: string) => void;
}

interface TaskItemState {
  task: string;
  isEditing: boolean;
}

export default class TaskItem extends Component<TaskItemProps, TaskItemState> {
  constructor(props: TaskItemProps) {
    super(props);
    this.state = {
      task: props.taskItem.task,
      isEditing: false,
    };
  }

  setEditingState = (isEditing: boolean) => {
    this.setState({ isEditing });
  };

  toggleTask = () => {
    this.props.toggleTask(this.props.id);
  };

  deleteTask = () => {
    this.props.deleteTask(this.props.id);
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ task: event.target.value });
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.editTask(this.props.id, this.state.task);
    this.setState({ isEditing: false });
  };

  render() {
    return (
      <tr>
        {this.state.isEditing ? (
          <>
            <td>
              <form onSubmit={this.handleSubmit}>
                <input
                  value={this.state.task}
                  onChange={this.handleChange}
                  autoFocus
                />
              </form>
            </td>
            <td>
              <button
                className="save"
                onClick={() => this.handleSubmit}
                type="submit"
              >
                Save
              </button>
              <button
                className="back"
                onClick={() => this.setEditingState(false)}
                type="button"
              >
                Back
              </button>
            </td>
          </>
        ) : (
          <>
            <td className="task" onClick={this.toggleTask}>
              <input
                type="checkbox"
                readOnly
                checked={this.props.taskItem.isCompleted}
              />
              <span
                className={
                  this.props.taskItem.isCompleted
                    ? "completed"
                    : "not-completed"
                }
              >
                {this.props.taskItem.task}
              </span>
            </td>
            <td>
              <button
                className="edit"
                onClick={() => this.setEditingState(true)}
              >
                Edit
              </button>
              <button className="delete" onClick={this.deleteTask}>
                Delete
              </button>
            </td>
          </>
        )}
      </tr>
    );
  }
}
