import React, { ChangeEvent, FormEvent, Component } from "react";

interface CreateTaskProps {
  createTask: (task: string) => void;
}

interface CreateTaskState {
  task: string;
}

export default class CreateTask extends Component<
  CreateTaskProps,
  CreateTaskState
> {
  constructor(props: CreateTaskProps) {
    super(props);
    this.state = {
      task: "",
    };
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ task: event.target.value });
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.createTask(this.state.task);
    this.setState({ task: "" });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Enter task"
          value={this.state.task}
          onChange={this.handleChange}
          autoFocus
        />
        <button className="add" type="submit">
          Add
        </button>
      </form>
    );
  }
}
