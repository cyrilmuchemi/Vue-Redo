<template>
    <div id="app" class="flex items-center justify-center bg-mobile-light md:bg-desktop-light font-Josefin">
    <div class="text-center mt-16 w-1/4"> 
      <div class="flex justify-between">
        <h1 class="text-4xl text-white uppercase tracking-widest" >Todo</h1>
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg>
      </div>
      <div class="w-full font-Josefin text-black">
        <to-do-form @todo-added="addTodo" ></to-do-form>
      </div>
    <div>
    <ul class="bg-white h-12 mt-6 rounded font-Josefin">
    <li v-for="item in TodoItems" :key="item.id" class="mt-3">
      <to-do-item :label="item.label" :done=item.done :id="item.id"></to-do-item>
      <hr/>
    </li>
    <div class="flex bg-white justify-between">
        <span>5 items complete</span>
        <span>All</span>
        <span>Active</span>
        <span>Completed</span>
        <span>Clear completed</span>
      </div>
  </ul>
      </div>
    </div> 
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


