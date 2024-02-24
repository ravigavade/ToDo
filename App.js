import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import React, { useEffect, useState, } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

AsyncStorage

// const COLORS = { primary: '#1f145c' };

const App = () => {
  const [textInput, setTextInput] = useState('');
  const [todos, setTodos] = useState([
    { id: 1, task: "apply to internship", completed: false },
    { id: 2, task: "learn react native", completed: false },
  ]);;

  useEffect(()=>{
    getTodosFromuserDevicee();
  },[]);

  useEffect(()=>{
    saveTodoTouserDevice(todos);
  },[todos]);

  const saveTodoTouserDevice=async todos =>{
      try {
        const stringifyTodos=JSON.stringify(todos);
        await AsyncStorage.setItem('todos', stringifyTodos);
      } catch (e) {
        // Error saving data
        console.log(e);
      }
  }

  const getTodosFromuserDevicee=async()=>{
    try {
      const todos=await AsyncStorage.getItem('todos');
      if(todos!=null)
      {
        setTodos(JSON.parse(todos));
      }
    } catch (error) {
      console.log(error);
    }
  }

  const ListItem = ({ todo }) => {
    return (
      <View style={styles.ListItem}>
        <View style={{ flex: 1 }}>
          <Text
            style={{ fontWeight: 'bold', fontSize: 15, color: "black", textDecorationLine: todo?.completed ? 'line-through' : 'none' }}
          >{todo?.task}</Text>
        </View>

        {
          !todo.completed && (

            // done btn
            <TouchableOpacity style={[styles.actionIcon]} onPress={()=>markTodoComplete(todo.id)}>
              <Icon name='done' size={20} color="white" />
            </TouchableOpacity>
          )
        }
        {/* delete btn */}
        <TouchableOpacity style={[styles.actionIcon, { backgroundColor: 'red' } ]} onPress={()=>deleteTodo(todo?.id)} >
          <Icon name='delete' size={20} color="white" />
        </TouchableOpacity>

      </View>
    )
  };

  const markTodoComplete=todoId=>{
    const newTodos=todos.map(item=>{
      if(item.id==todoId){
        return{...item, completed:true}
      }
      return item;
    });
    setTodos(newTodos);
  }

  const deleteTodo=(todoId)=>{
    const newTodos=todos.filter(item=>item.id!=todoId);
    setTodos(newTodos);
  }

  const addTodo=()=>{
    if(textInput==''){
      Alert.alert('Error',"please input todo");
    }else{
      const newTodo={
        id:Math.random(),
        task:textInput,
        completed:false,
      };
      setTodos([...todos, newTodo]);
      setTextInput('');

    }
  }


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>

      <View style={styles.header}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'black' }}>todo</Text>
        <Icon name="delete" size={25} color="black" />
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        data={todos}
        renderItem={({ item }) => <ListItem todo={item} />}
      />

      {/* footer  */}
      <View style={styles.footer}>

        <View style={styles.inputContainer}>
          <TextInput
            color='black'
            placeholder='new todo goes here'  
            value={textInput}
            onChangeText={(text)=>setTextInput(text)}

          />
        </View>

        <TouchableOpacity onPress={addTodo}>
          <View style={styles.iconContainer}>
            <Icon name="add" size={30} color='white' />
          </View>
        </TouchableOpacity>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    color: 'white',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white'

  },
  inputContainer: {
    backgroundColor: 'white',
    elevation: 40,
    flex: 1,
    height: 50,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 20,
    paddingHorizontal: 20
  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: 'black',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ListItem: {
    padding: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 7,
    elevation: 12,
    marginVertical: 10,

  },
  actionIcon: {
    backgroundColor: 'green',
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    borderRadius: 3,
  }
});

export default App;
