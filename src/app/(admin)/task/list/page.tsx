"use client";

import React, { useState } from "react";
import Image from 'next/image';

type Priority = 'A' | 'B' | 'C' | 'D';

interface Task {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  assignee: string;
  dueDate: string;
  status: 'todo' | 'in-progress' | 'completed';
  tag?: string;
}

interface NewTask {
  title: string;
  description: string;
  priority: Priority;
  assignee: string;
  dueDate: string;
  status: 'todo' | 'in-progress' | 'completed';
  tag?: string;
}

const mockTasks: Task[] = [
  {
    id: 1,
    title: "Finish user onboarding",
    description: "Complete the user onboarding process",
    priority: "A",
    assignee: "https://randomuser.me/api/portraits/men/32.jpg",
    dueDate: "Tomorrow",
    status: "todo",
    tag: "Marketing",
  },
  {
    id: 2,
    title: "Solve the Dribbble prioritisation issue with the team",
    description: "Work with the team to resolve prioritization issues",
    priority: "B",
    assignee: "https://randomuser.me/api/portraits/women/44.jpg",
    dueDate: "Jan 8, 2027",
    status: "todo",
    tag: "Marketing",
  },
  {
    id: 3,
    title: "Change license and remove products",
    description: "Update license and remove outdated products",
    priority: "A",
    assignee: "https://randomuser.me/api/portraits/men/46.jpg",
    dueDate: "Jan 8, 2027",
    status: "todo",
    tag: "Dev",
  },
  {
    id: 4,
    title: "Work In Progress (WIP) Dashboard",
    description: "Create a dashboard for tracking work in progress",
    priority: "C",
    assignee: "https://randomuser.me/api/portraits/women/68.jpg",
    dueDate: "Today",
    status: "in-progress",
  },
  {
    id: 5,
    title: "Kanban Flow Manager",
    description: "Implement Kanban flow management system",
    priority: "A",
    assignee: "https://randomuser.me/api/portraits/men/75.jpg",
    dueDate: "Feb 12, 2027",
    status: "in-progress",
    tag: "Template",
  },
  {
    id: 6,
    title: "Product Update - Q4 2024",
    description: "Dedicated form for a category of users that will perform actions",
    priority: "B",
    assignee: "https://randomuser.me/api/portraits/women/90.jpg",
    dueDate: "Feb 12, 2027",
    status: "in-progress",
  },
  {
    id: 7,
    title: "Make figbot send comment when ticket is auto-moved back to inbox",
    description: "Implement automatic comment feature for ticket movement",
    priority: "C",
    assignee: "https://randomuser.me/api/portraits/men/91.jpg",
    dueDate: "Mar 08, 2027",
    status: "in-progress",
  },
  {
    id: 8,
    title: "Manage internal feedback",
    description: "Set up system for managing internal feedback",
    priority: "A",
    assignee: "https://randomuser.me/api/portraits/women/22.jpg",
    dueDate: "Tomorrow",
    status: "completed",
  },
  {
    id: 9,
    title: "Do some projects on React Native with Flutter",
    description: "Create cross-platform mobile applications",
    priority: "B",
    assignee: "https://randomuser.me/api/portraits/men/41.jpg",
    dueDate: "Jan 8, 2027",
    status: "completed",
    tag: "Development",
  },
  {
    id: 10,
    title: "Design marketing assets",
    description: "Create marketing materials and assets",
    priority: "C",
    assignee: "https://randomuser.me/api/portraits/women/46.jpg",
    dueDate: "Jan 8, 2027",
    status: "completed",
    tag: "Marketing",
  },
];

const priorityMap: Record<Priority, string> = {
  A: "bg-danger",
  B: "bg-warning",
  C: "bg-success",
  D: "bg-info",
};

const TaskListPage = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("dueDate");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [newTask, setNewTask] = useState<NewTask>({
    title: "",
    description: "",
    priority: "C",
    assignee: "https://randomuser.me/api/portraits/men/32.jpg",
    dueDate: new Date().toISOString().split('T')[0],
    status: "todo",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTask = () => {
    const task: Task = {
      id: tasks.length + 1,
      ...newTask,
    };
    setTasks(prev => [...prev, task]);
    setIsModalOpen(false);
    setNewTask({
      title: "",
      description: "",
      priority: "C",
      assignee: "https://randomuser.me/api/portraits/men/32.jpg",
      dueDate: new Date().toISOString().split('T')[0],
      status: "todo",
    });
  };

  const filteredAndSortedTasks = tasks
    .filter((task) => {
      if (selectedStatus === "all") return true;
      return task.status === selectedStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "dueDate":
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case "priority":
          return a.priority.localeCompare(b.priority);
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-bold text-black dark:text-white">
          Task List
        </h2>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-500">All Tasks:</span>
            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
              {tasks.length}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-500">To Do:</span>
            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
              {tasks.filter((task) => task.status === "todo").length}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-500">In Progress:</span>
            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
              {tasks.filter((task) => task.status === "in-progress").length}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-500">Completed:</span>
            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
              {tasks.filter((task) => task.status === "completed").length}
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Sort Bar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-4">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="all">All Tasks</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add New Task
        </button>
      </div>

      {/* Task List */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50 text-left dark:bg-gray-700">
                <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-300">Task</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-300">Status</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-300">Priority</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-300">Due Date</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-300">Assignee</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredAndSortedTasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">{task.title}</h4>
                      {task.tag && (
                        <span className="mt-1 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-600">
                          {task.tag}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      task.status === 'todo' ? 'bg-yellow-100 text-yellow-800' :
                      task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.status === 'todo' ? 'To Do' :
                       task.status === 'in-progress' ? 'In Progress' :
                       'Completed'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${priorityMap[task.priority]}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{task.dueDate}</td>
                  <td className="px-4 py-3">
                    <Image
                      src={task.assignee}
                      alt="Assignee"
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 dark:bg-gray-800">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Add New Task
            </h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Task Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newTask.title}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="dueDate" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Due Date
                </label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={newTask.dueDate}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="status" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={newTask.status}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label htmlFor="tag" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tags
                </label>
                <select
                  id="tag"
                  name="tag"
                  value={newTask.tag}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select a tag</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Template">Template</option>
                  <option value="Development">Development</option>
                </select>
              </div>
              <div>
                <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={newTask.description}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  rows={3}
                  required
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskListPage; 