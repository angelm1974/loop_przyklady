import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Todo} from './todo.model';
import {TodoListImage} from './todo-list-image.model';

@model()
export class TodoList extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  tytul: string;

  @property({
    type: 'string',
  })
  kolor?: string;

  @hasMany(() => Todo)
  todos: Todo[];

  @hasOne(() => TodoListImage)
  image: TodoListImage;

  constructor(data?: Partial<TodoList>) {
    super(data);
  }
}

export interface TodoListRelations {
  // describe navigational properties here
}

export type TodoListWithRelations = TodoList & TodoListRelations;
