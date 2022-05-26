import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import editIcon from '../assets/icons/edit/edit.png'
import trashIcon from '../assets/icons/trash/trash.png'

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TaskItemProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  editTask: (task: { taskId: number, taskNewTitle: string }) => void;
  removeTask: (id: number) => void;
}

export function TaskItem({ task, toggleTaskDone, editTask, removeTask }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTaskTitle, setEditTaskTitle] = useState(task.title)

  const textInputRef = useRef<TextInput>(null)

  function handleStartEditing() {
    setIsEditing(true)
  }

  function handleCancelEditing() {
    setEditTaskTitle(task.title)
    setIsEditing(false)
  }

  function handleSubmitEditing() {
    editTask({
      taskId: task.id, 
      taskNewTitle: editTaskTitle
    })
    setIsEditing(false)
  }

  useEffect(() => {

    if (isEditing) {
      textInputRef.current?.focus()
    } else {
      textInputRef.current?.blur()
    }

  }, [isEditing])

  return (
    <>
    <View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.taskButton}
        onPress={() => toggleTaskDone(task.id)}
      >
        <View
          style={task.done ? styles.taskMarkerDone: styles.taskMarker}
        >
          { task.done && (
            <Icon 
              name="check"
              size={12}
              color="#FFF"
            />
          )}
        </View>

        <TextInput
          value={editTaskTitle}
          onChangeText={setEditTaskTitle}
          editable={isEditing}
          onSubmitEditing={handleSubmitEditing}
          style={task.done ? styles.taskTextDone: styles.taskText}
          ref={textInputRef}
        />
      </TouchableOpacity>
    </View>

    <View style={styles.iconsContainer}>
      {isEditing
       ? (
        <TouchableOpacity onPress={handleCancelEditing}>
          <Icon name="x" size={24} color="#b2b2b2" />
        </TouchableOpacity>
       ) : (
        <TouchableOpacity onPress={handleStartEditing}>
          <Image source={editIcon} />
        </TouchableOpacity>
      )}
       
      <View style={styles.iconsDivider} />

      <TouchableOpacity
        disabled={isEditing}
        onPress={() => removeTask(task.id)}
      >
        <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }}/>
      </TouchableOpacity>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24
  },
  iconsDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
    marginHorizontal: 10
  }
})