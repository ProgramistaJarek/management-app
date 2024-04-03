export interface AppState {
  todos: Todo[];
  user: User;
  categories: Category[];
  comments: Comment[];
  tags: Tag[];
  notes: Note[];
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
}

export interface DateTime {
  createdAt: Date;
  updatedAt?: Date;
}

export interface Todo extends DateTime {
  id: string;
  topic: string;
  completed: boolean;
  dueDate?: Date;
  color: string;
  categoryId: string;
  tags: string[];
  userId: string;
  trash: boolean;
}

export interface Note extends DateTime {
  id: string;
  topic: string;
  description: string;
  color: string;
  tags: string[];
  userId: string;
  trash: boolean;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  color?: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Comment {
  id: string;
  content: string;
  createdBy?: string;
  createdAt: Date;
  todoId: string;
}

export interface FilteredItems {
  todos: Todo[];
  notes: Note[];
}
