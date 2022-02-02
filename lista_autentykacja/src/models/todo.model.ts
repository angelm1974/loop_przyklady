import {belongsTo, Entity, model, property} from '@loopback/repository';
import {TodoList} from './todo-list.model';

@model({
  settings: {
    foreignKeys: {
      fk_todo_todoListId: {
        name: 'fk_todo_todoListId',
        entity: 'TodoList',
        entityKey: 'id',
        foreignKey: 'todolistid',
      },
    },
  },
})
export class Todo extends Entity {
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
  opis?: string;

  @property({
    type: 'boolean',
  })
  czyKompletny?: boolean;

  @belongsTo(() => TodoList)
  todoListId: number;

  constructor(data?: Partial<Todo>) {
    super(data);
  }
}

export interface TodoRelations {
  // describe navigational properties here
}

export type TodoWithRelations = Todo & TodoRelations;
