<script>
    import axios from "axios";
    import { onMount } from "svelte";
  
    let todos = [];
    let newTodoTitle = '';
    let loading = true;
    let baseUrl = "https://0ec78b52-d52c-4c57-8b35-dfded12e120d.bnkreddy7571.workers.dev";
    let error = null;
  

    async function fetchTodos() {
      try {
        const response = await axios.get(`${baseUrl}/todos`);
        todos = response.data;
      } catch (err) {
        error = err.message;
      } finally {
        loading = false;
      }
    }
  
    onMount(() => {
      fetchTodos();
    });
  

    async function addnewTodo() {
      newTodoTitle = newTodoTitle.trim();
      if (!newTodoTitle) {
        return;
      }
  
      try {
        const response = await axios.post(`${baseUrl}/todos`, {
          title: newTodoTitle,
        });
  
        todos = [response.data.todo[0], ...todos];
        newTodoTitle = ''; 
      } catch (err) {
        error = err.message;
      }
    }
  

    async function toggleTodo(id, completed) {
      try {
        const response = await axios.put(`${baseUrl}/todos/${id}`, {
          completed: !completed,
        });
  
        todos = todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        );
      } catch (err) {
        error = err.message;
      }
    }
  
    async function deleteTodo(id) {
      try {
        await axios.delete(`${baseUrl}/todo/${id}`);
  
        todos = todos.filter((todo) => todo.id !== id);
      } catch (err) {
        error = err.message;
      }
    }
  </script>
  
  <style>
    .background-image {
      background-image: url('https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
  </style>
  
  <div class="min-h-screen py-10 background-image">
    <div class="max-w-2xl mx-auto bg-white/90 rounded-lg shadow-2xl p-6 backdrop-blur-sm">
      <h1 class="text-4xl font-bold text-center text-gray-800 mb-8">Todo App</h1>
  
    
      <div class="flex gap-2 mb-6">
        <input
          bind:value={newTodoTitle}
          type="text"
          placeholder="Add a new todo..."
          class="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          on:click={addnewTodo}
          class="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Add
        </button>
      </div>
  
   
      {#if loading}
        <div class="text-center text-gray-600">Loading...</div>
      {:else if error}
        <div class="text-center text-red-600">Error: {error}</div>
      {:else}
        <ul class="space-y-3">
          {#each todos as todo}
            <li class="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm">
              <div class="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  on:change={() => toggleTodo(todo.id, todo.completed)}
                  class="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                />
                <span class:text-gray-700={!todo.completed} class={todo.completed ? 'line-through text-gray-400' : ''}>
                  {todo.title}
                </span>
              </div>
              <button
                on:click={() => deleteTodo(todo.id)}
                class="px-3 py-1 text-red-600 hover:text-red-800 transition-colors"
              >
                Delete
              </button>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>