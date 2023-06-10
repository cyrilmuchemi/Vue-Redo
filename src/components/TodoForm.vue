<template>
    <form @submit.prevent="onSubmit" >
    <label for="new-todo-input"></label>
    <input
      type="text"
      id="new-todo-input"
      name="new-todo"
      autocomplete="off" 
      placeholder="Create a new todo..."
      v-model.lazy.trim="label"
      class="w-full h-12 rounded mt-8"
      />
  </form>
</template>

<script>
  export default {
    methods: {
        onSubmit(){
            if (this.label === "") {
                return;
        }
            this.$emit("todo-added", this.label);
            this.label = "";
        }
    },
    data(){
        return{
            label: ""
        }
    }
  };
</script>