<template>
    <div 
    id="app" 
    class="flex items-center justify-center bg-no-repeat w-full bg-cover font-Josefin"
    :style="{ 'background-image': backgroundImage }"
    :class="{ 'dark-mode': isDarkMode }"
    >
    <div class="text-center mt-16 w-full sm:mr-4 sm:ml-4 md:w-1/2 lg:w-1/3 xl:w-1/4"> 
      <div class="flex justify-between cursor-pointer">
        <h1 class="text-4xl text-white uppercase tracking-widest" >Todo</h1>
        <svg
          v-if="!isDarkMode"
          id="moon"
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          @click="toggleDarkMode"
        >
        <path fill="#FFF" fill-rule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/>
        </svg>

        <svg
          v-else
          id="sun"
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          @click="toggleDarkMode"
        >
        <path fill="#FFF" fill-rule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/>
        </svg>
      </div>
      <div class="w-full font-Josefin text-black">
        <to-do-form :is-dark-mode="isDarkMode" @todo-added="addTodo" ></to-do-form>
      </div>
    <div>
    <ul aria-labelledby="completed-todos" class="shadow-2xl h-12 mt-6 rounded-xl font-Josefin pt-4 flex flex-col text-very-dark-grayish-blue"  :class="{ 'dark-mode-bg': isDarkMode, 'dark-mode-text': isDarkMode  }">
    <li v-for="item in filteredTodoItems" :key="item.id" class="bg-white pt-4"  :class="{ 'dark-mode-bg': isDarkMode }">
      <to-do-item :label="item.label" :done=item.done :is-dark-mode="isDarkMode" :id="item.id" @checkbox-changed="updateDoneStatus(item.id)"  @delete-item="deleteTodoItem"></to-do-item>
      <hr class="mt-2"/>
    </li>
    <div class="flex bg-white shadow-2xl justify-between pt-5 pb-2 pl-1 pr-1 cursor-pointer font-Josefin text-sm text-very-dark-grayish-blue"  :class="{ 'dark-mode-bg': isDarkMode, 'dark-mode-text': isDarkMode  }">
        <span class="hover:text-bright-blue" id="completed todos">{{ inCompletedTodos }}</span>
        <article class="gap-2 bg-white flex"  :class="{ 'dark-mode-bg': isDarkMode }">
          <span class="hover:text-bright-blue" @click="filterTodos('all')">All</span>
          <span class="hover:text-bright-blue" @click="filterTodos('active')">Active</span>
          <span class="hover:text-bright-blue" @click="filterTodos('completed')">Completed</span>
        </article>
        <span class="hover:text-bright-blue" @click="clearCompleted" >Clear completed</span>
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
      TodoItems: JSON.parse(localStorage.getItem("todos")) || [],
      filter: 'all',
      isDarkMode: false,
      backgroundImage: 'url("./src/assets/bg-desktop-light.jpg")',
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
    },
    toggleDarkMode(){
      this.isDarkMode = !this.isDarkMode
      if(this.isDarkMode) {
        document.documentElement.classList.add('dark-mode');
      } else {
        document.documentElement.classList.remove('dark-mode');
      }
      this.backgroundImage = this.isDarkMode
        ? 'url("./src/assets/bg-desktop-dark.jpg")'
        : 'url("./src/assets/bg-desktop-light.jpg")';
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
    },
    bodyClasses(){
      return this.isDarkMode ? 'bg-desktop-dark' : 'bg-desktop-light';
    }
  },

  watch: {
    TodoItems: {
    deep: true,
    handler(newItems) {
      localStorage.setItem("todos", JSON.stringify(newItems));
    },
  },

  }

}
</script>

<style>
.dark-mode {
  background-color: black;
}

.dark-mode-bg {
  background-color: hsl(235, 19%, 35%);
}

.dark-mode-text {
  color: #fff;
}


</style>



