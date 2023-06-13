<template>
   <div>
    <form @submit.prevent="onSubmit">
      <div class="input-wrapper">
        <div class="circle-placeholder"></div>
        <label for="new-todo-input"></label>
      </div>
    <input
      type="text"
      id="new-todo-input"
      name="new-todo"
      autocomplete="off" 
      placeholder="Create a new todo..."
      v-model.trim="label"
      class="w-full h-12 rounded mt-8"
      />
  </form>
   </div>
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

<style>
.input-wrapper {
  position: relative;
}

.circle-placeholder {
  position: absolute;
  left: 14px; 
  margin-top: 2.88rem;
  width: 1rem;
  height: 1rem;
  border: 1px solid gray;
  border-radius: 50%;
}

input {
  padding-left: 2.4rem; 
}

</style>