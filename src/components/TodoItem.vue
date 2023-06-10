<template>
    <div class="flex items-center ml-3 relative">
      <input type="checkbox" :id="id" :checked="isDone" class="mr-2 hidden" @change="toggleIsDone" />
      <label :for="id" class="ml-2 rounded-lg inline-flex items-center justify-center w-4 h-4 bg-white border-2 border-gray-400">
        <span class="rounded-full bg-blue-500 w-3 h-3" v-if="isDone">
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
        </span>
      </label>
      <label :for="id" class="ml-2">{{ label }}</label>
      <span class="right-3 cursor-pointer absolute">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
      </span>
    </div>
  </template>
  
<script>
export default{
    props: {
        label: { required: true, type: String },
        done: { default: false, type: Boolean },
        id: { required: true, type: String }
    },
    data(){
        return{
            isDone: this.done,
        }
    },
    methods: {
    toggleIsDone() {
      this.isDone = !this.isDone;
    }
  }
}
</script>