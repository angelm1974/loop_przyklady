import {Entity, model, property} from '@loopback/repository';

@model()
export class Todo extends Entity {
  @property({

    type: 'number',

    id: true,

    generated: false,

  })

  id?: number;

  @property({
    type: 'string',
    default: 'zadanie',
  })
  tytul?: string;

  @property({
    type: 'string',
  })
  opis?: string;

  @property({
    type: 'boolean',
  })
  czyZakonczone?: boolean;

  @property({
    type: 'string',
  })
  podajAdres?: string;

  @property({
    type: 'string',
  })
  podajGeo?: string;

  constructor(data?: Partial<Todo>) {
    super(data);
  }
}

export interface TodoRelations {
  // describe navigational properties here
}

export type TodoWithRelations = Todo & TodoRelations;
