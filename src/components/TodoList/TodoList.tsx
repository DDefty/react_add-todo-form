import { TodoInfo } from '../TodoInfo';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type TodoInfoProps = {
  todoList?: Todo[];
  todos?: Todo[];
};

export const TodoList = ({ todoList, todos }: TodoInfoProps) => {
  const todosToRender = todoList || todos || [];

  return (
    <section className="TodoList">
      {todosToRender.map(todo => {
        return <TodoInfo todo={todo} key={todo.id} />;
      })}
    </section>
  );
};
