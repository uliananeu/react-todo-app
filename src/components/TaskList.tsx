import React, { Component } from "react";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: { task: string; isCompleted: boolean }[];
  deleteTask: (taskId: number) => void;
  editTask: (taskId: number, updatedTask: string) => void;
  toggleTask: (taskId: number) => void;
}

export default class TaskList extends Component<TaskListProps> {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.props.tasks.map((task, index) => (
            <TaskItem
              key={index}
              taskItem={task}
              id={index}
              deleteTask={this.props.deleteTask}
              editTask={this.props.editTask}
              toggleTask={this.props.toggleTask}
            />
          ))}
        </tbody>
      </table>
    );
  }
}
