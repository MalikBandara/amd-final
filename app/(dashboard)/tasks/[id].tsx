import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native"
import React, { useEffect, useState } from "react"
import { useLocalSearchParams, useRouter } from "expo-router"
import { createTask, getTaskById, updateTask } from "@/services/taskService"
import { useLoader } from "@/context/LoaderContext"
import { useAuth } from "@/context/authContext"

const TaskFrormScreen = () => {
  const { id } = useLocalSearchParams<{ id?: string }>()
  const isNew = !id || id === "new"
  //   const params = useLocalSearchParams()
  //   params.id
  // null || new -> save
  // 1234 -> update
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const router = useRouter()
  const { hideLoader, showLoader } = useLoader()

  useEffect(() => {
    const load = async () => {
      if (!isNew && id) {
        try {
          showLoader
          const task = await getTaskById(id)
          if (task) {
            setTitle(task.title)
            setDescription(task.description)
          }
        } finally {
          hideLoader()
        }
      }
    }
    load()
  }, [id])

    const { user, loading } = useAuth()

  const handleSubmit = async () => {
    if (!title.trim) {
      Alert.alert("Validation", "Title is required")
      return
    }
    // description validation

    try {
      showLoader()
      if (isNew) {
        await createTask({ title, description, userId: user?.uid })
      } else {
        await updateTask(id, { title, description })
      }
      router.back()
    } catch (err) {
      console.error(`Error ${isNew ? "saving" : "updating"} task`, err)
      Alert.alert("Error", `Fail to ${isNew ? "save" : "update"} task`)
    } finally {
      hideLoader()
    }
  }

  return (
    <View className="flex-1 w-full p-5">
      <Text className="text-2xl font-bold">
        {isNew ? "Add Task" : "Edit Task"}
      </Text>
      <TextInput
        placeholder="Title"
        className="p-2 my-2 border border-gray-400 rounded-md"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Description"
        className="p-2 my-2 border border-gray-400 rounded-md"
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity
        className="px-6 py-3 my-2 bg-blue-400 rounded-md"
        onPress={handleSubmit}
      >
        <Text className="text-xl text-white">
          {isNew ? "Add Task" : "Update Task"}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default TaskFrormScreen
