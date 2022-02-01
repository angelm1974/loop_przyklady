import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresdbDataSource} from '../datasources';
import {TodoListImage, TodoListImageRelations, TodoList} from '../models';
import {TodoListRepository} from './todo-list.repository';

export class TodoListImageRepository extends DefaultCrudRepository<
  TodoListImage,
  typeof TodoListImage.prototype.id,
  TodoListImageRelations
> {

  public readonly todoList: BelongsToAccessor<TodoList, typeof TodoListImage.prototype.id>;

  constructor(
    @inject('datasources.postgresdb') dataSource: PostgresdbDataSource, @repository.getter('TodoListRepository') protected todoListRepositoryGetter: Getter<TodoListRepository>,
  ) {
    super(TodoListImage, dataSource);
    this.todoList = this.createBelongsToAccessorFor('todoList', todoListRepositoryGetter,);
    this.registerInclusionResolver('todoList', this.todoList.inclusionResolver);
  }
}
