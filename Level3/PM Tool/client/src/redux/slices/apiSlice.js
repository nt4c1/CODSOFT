import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URI = process.env.REACT_APP_API_URI || "http://localhost:8800/api"; // Use environment variable

const baseQuery = fetchBaseQuery({ baseUrl: API_URI });

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Task"], // Define tag types for cache management
  endpoints: (builder) => ({
    // Fetch all tasks
    fetchTasks: builder.query({
      query: () => "/tasks", // Endpoint to fetch tasks
      providesTags: ["Task"], // This endpoint provides "Task" tags
    }),

    // Add a new task
    addTask: builder.mutation({
      query: (newTask) => ({
        url: "/tasks",
        method: "POST",
        body: newTask,
      }),
      invalidatesTags: ["Task"], // Invalidate "Task" tags after adding a task
    }),

    // Update an existing task
    updateTask: builder.mutation({
      query: (updatedTask) => ({
        url: `/tasks/${updatedTask.id}`,
        method: "PUT",
        body: updatedTask,
      }),
      invalidatesTags: ["Task"], // Invalidate "Task" tags after updating a task
    }),

    // Delete a task
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"], // Invalidate "Task" tags after deleting a task
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useFetchTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = apiSlice;
