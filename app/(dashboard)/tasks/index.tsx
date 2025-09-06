import { useLoader } from "@/context/LoaderContext";
import { deleteTask, getAllTask, tasksRef } from "@/services/taskService";
import { Task } from "@/types/task";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter, useSegments } from "expo-router";
import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const TaskScreen = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();
  const { showLoader, hideLoader } = useLoader();

  const handleFetchData = async () => {
    try {
      showLoader();
      // const data = await getTasks() // returns array axios get
      const data = await getAllTask(); // firebase get all
      console.log(data);
      setTasks(data);
    } catch (error) {
      console.log("Error fetching:", error);
    } finally {
      hideLoader();
    }
  };

  const segment = useSegments();

  // useEffect(() => {
  //   handleFetchData()
  // }, [segment])

  useEffect(() => {
    const unsubscribe = onSnapshot(
      tasksRef,
      (snapshot) => {
        const allTasks = snapshot.docs.map(
          (d) => ({ id: d.id, ...d.data() }) as Task
        );
        setTasks(allTasks);
        hideLoader();
      },
      (err) => {
        console.log("Error listening:", err);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    Alert.alert("Delete", "Are you sure want to delete ?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: async () => {
          try {
            showLoader();
            await deleteTask(id);
            handleFetchData();
          } catch (err) {
            console.log("Error deleting task", err);
          } finally {
            hideLoader();
          }
        },
      },
    ]);
  };

  return (
    <View className="flex-1 w-full">
      <Text className="text-4xl">Task Screen</Text>
      <View className="absolute bottom-5 right-5">
        <Pressable
          className="p-5 bg-blue-500 rounded-full shadow-lg"
          onPress={() => {
            router.push("/(dashboard)/tasks/new");
          }}
        >
          <MaterialIcons name="add" size={28} color="#fff" />
        </Pressable>
      </View>

      <ScrollView className="mt-4">
        {tasks.map((task) => {
          return (
            <View
              key={task.id}
              className="p-4 mx-4 mb-3 bg-gray-200 border border-gray-400 rounded-lg"
            >
              <Text className="text-lg font-semibold">{task.title}</Text>
              <Text className="mb-2 text-sm text-gray-700">
                {task.description}
              </Text>

              <View className="flex-row">
                <TouchableOpacity
                  className="px-3 py-1 bg-yellow-300 rounded"
                  onPress={() => router.push(`/(dashboard)/tasks/${task.id}`)}
                >
                  <Text>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="px-3 py-1 ml-3 bg-red-500 rounded"
                  onPress={() => {
                    if (task.id) handleDelete(task.id);
                  }}
                >
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default TaskScreen;
