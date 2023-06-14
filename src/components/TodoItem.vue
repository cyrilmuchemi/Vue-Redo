<template>
  <div class="flex items-center ml-3 relative" @mouseenter="showCloseIcon = true" @mouseleave="showCloseIcon = false">
    <input type="checkbox" :id="id" :checked="isDone" class="mr-2 hidden" @change="toggleIsDone" />
    <label :for="id" class="ml-2 rounded-lg inline-flex items-center justify-center w-4 h-4 bg-white border-2 border-gray-400 cursor-pointer">
      <span class="rounded-full bg-check-background w-3 h-3" v-if="isDone">
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
      </span>
    </label>
    <div
    :draggable="true"
    @dragstart="onDragStart"
    @dragover="onDragOver"
    @drop="onDrop"
    @dragend="onDragEnd"
    >
    <label :for="id" class="ml-3" :class="{'line-through': isDone}">{{ label }}</label>
    <span v-if="showCloseIcon" class="right-3 cursor-pointer absolute" @click="deleteItem">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" :class="{'dark-mode-icon': isDarkMode }" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
    </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: { required: true, type: String },
    done: { default: false, type: Boolean },
    id: { required: true, type: String },
    isDarkMode: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isDone: this.done,
      showCloseIcon: false
    };
  },
  methods: {
    toggleIsDone() {
      this.isDone = !this.isDone;
      this.$emit('checkbox-changed', this.id, this.isDone);
    },
    deleteItem() {
      this.$emit('delete-item', this.id);
    },
    onDragStart(event) {
      event.dataTransfer.setData('text/plain', this.id);
      event.dataTransfer.effectAllowed = 'move';
      // Additional styling if needed
    },
    onDragOver(event) {
      event.preventDefault();
      // Additional styling if needed
    },
    onDrop(event) {
      event.preventDefault();
      const todoId = event.dataTransfer.getData('text/plain');
      this.$emit('rearrange-todo', todoId, this.id);
      // Additional styling if needed
    },
    onDragEnd(event) {
      // Additional cleanup or styling if needed
    },
  }
};
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}

.bg-check-background {
  background: linear-gradient(to right bottom, hsl(192, 100%, 67%), hsl(280, 87%, 65%));
}

.dark-mode-icon {
  fill: #fff;
}
</style>
