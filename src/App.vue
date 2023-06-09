<template>
    <div id="app">
    <h1>ToDo</h1>
    <to-do-form @todo-added="addTodo" ></to-do-form>
    <ul>
    <li v-for="item in TodoItems" :key="item.id">
      <to-do-item :label="item.label" :done=item.done :id="item.id"></to-do-item>
      <hr/>
    </li>
  </ul>
  </div>
</template>

<script>
import ToDoItem from "./components/TodoItem.vue";
import ToDoForm from "./components/TodoForm.vue";
import uniqueId from "lodash.uniqueid";
export default {
  name: "app",
  components: {
    ToDoItem, ToDoForm
  },
  data(){
    return {
      TodoItems: [
        {id:uniqueId('todo-'), label: "Learn Vue", done: false},
        {id:uniqueId('todo-'), label: "builld a network", done: false},
        {id:uniqueId('todo-'), label: "Drink coffee", done: true}
      ],
    };
  },
  methods: {
    addTodo(toDoLabel){
      this.TodoItems.push({id:uniqueId("todo-"), label:toDoLabel, done: false })
    }
  }

}
</script>


