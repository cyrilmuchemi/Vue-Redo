<template>
    <div id="app" class="flex items-center justify-center bg-no-repeat bg-cover bg-desktop-light font-Josefin">
    <div class="text-center mt-16 md:w-1/4 sm:w-1/4"> 
      <div class="flex justify-between">
        <h1 class="text-4xl text-white uppercase tracking-widest" >Todo</h1>
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg>
      </div>
      <div class="w-full font-Josefin text-black">
        <to-do-form @todo-added="addTodo" ></to-do-form>
      </div>
    <div>
    <ul aria-labelledby="completed-todos" class="bg-white h-12 mt-6 rounded font-Josefin pt-6 flex flex-col gap-6 text-very-dark-grayish-blue">
    <li v-for="item in filteredTodoItems" :key="item.id">
      <to-do-item :label="item.label" :done=item.done :id="item.id" @checkbox-changed="updateDoneStatus(item.id)"  @delete-item="deleteTodoItem"></to-do-item>
      <hr class="mt-2"/>
    </li>
    <div class="flex bg-white justify-between mt-2 cursor-pointer font-Josefin text-sm text-very-dark-grayish-blue">
        <span id="completed todos">{{ inCompletedTodos }}</span>
        <article class="gap-2 flex">
          <span @click="filterTodos('all')">All</span>
          <span @click="filterTodos('active')">Active</span>
          <span @click="filterTodos('completed')">Completed</span>
        </article>
        <span @click="clearCompleted" >Clear completed</span>
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
        {id:uniqueId('todo-'), label: "Build a network", done: false},
        {id:uniqueId('todo-'), label: "Drink coffee", done: true}
      ],
      
      filter: 'all'
    };
  },
  methods: {
    addTodo(toDoLabel){
      this.TodoItems.push({id:uniqueId("todo-"), label:toDoLabel, done: false })
    },
    updateDoneStatus(toDoId){
      const todoUpdate = this.TodoItems.find((item)=>item.id===toDoId)
      todoUpdate.done = !todoUpdate.done
    },

    filterTodos(filter){
      this.filter = filter
    },

    deleteTodoItem(toDoId) {
      this.TodoItems = this.TodoItems.filter(item => item.id != toDoId)
    },

    clearCompleted() {
      this.TodoItems = this.TodoItems.filter(item => !item.done)
    }

  },
  computed: {
    inCompletedTodos(){
      const unFinishedItems = this.TodoItems.filter((item)=>!item.done).length;
      return `${unFinishedItems} items left`
    },                                                                                                                                                                                                                                      
    filteredTodoItems(){
      if(this.filter === 'all') {
        return this.TodoItems
      }
      else if(this.filter === 'active') {
        return this.TodoItems.filter(item => !item.done)
      }
      else if(this.filter === 'completed') {
        return this.TodoItems.filter(item => item.done)
      }
    }
  }

}
</script>


