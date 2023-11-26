import React, { Component } from "react";
import CreateTask from "./CreateTask";
import TaskList from "./TaskList";

interface Task {
  task: string;
  isCompleted: boolean;
}

interface MainState {
  tasks: Task[];
}

export default class Main extends Component<{}, MainState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      tasks: localStorage.getItem("tasks")
        ? JSON.parse(localStorage.getItem("tasks")!)
        : [],
    };
  }

  createTask = (task: string) => {
    if (task.trim() === "") {
      alert("Task can't be empty");
      return;
    }
    const updatedTasks = [...this.state.tasks, { task, isCompleted: false }];
    this.setState({ tasks: updatedTasks });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  toggleTask = (taskId: number) => {
    const updatedTasks = [...this.state.tasks];
    updatedTasks[taskId].isCompleted = !updatedTasks[taskId].isCompleted;
    this.setState({ tasks: updatedTasks });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  deleteTask = (taskId: number) => {
    const updatedTasks = [...this.state.tasks];
    updatedTasks.splice(taskId, 1);
    this.setState({ tasks: updatedTasks });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  editTask = (taskId: number, updatedTask: string) => {
    const updatedTasks = [...this.state.tasks];
    updatedTasks[taskId].task = updatedTask;
    this.setState({ tasks: updatedTasks });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  render() {
    return (
      <div className="main">
        <h1>Todo List</h1>
        <div className="content">
          <CreateTask createTask={this.createTask} />
          <br />
          <TaskList
            tasks={this.state.tasks}
            deleteTask={this.deleteTask}
            editTask={this.editTask}
            toggleTask={this.toggleTask}
          />
        </div>
      </div>
    );
  }
}
