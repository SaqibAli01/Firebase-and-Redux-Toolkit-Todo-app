import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

//firebase add doc

import { db } from '../Config/Firebase';

import {
    collection,
    addDoc,
    doc,
    getDocs,
    deleteDoc,
    updateDoc,
} from "firebase/firestore";

//get All doc in collection getDocs


// First, create the thunk
//-------------------------Add todo in firebase----------------------
export const addTodo = createAsyncThunk('addTodo', async (item) => {
    try {
        let newItem = {
            title: item,
            createdAt: new Date().toLocaleDateString(),
            status: "Incomplete"
        }
        // console.log("🚀 ~ file: todoSlice.js:20 ~ addTodo ~ newItem", newItem);
        await addDoc(collection(db, "myTodo"), newItem);

        return newItem
    } catch (error) {
        console.log("Error : ", error)
    }

});

//-------------------Get Todo in firebase--------------------
//getTodo import in Todo.js,,
export const getTodo = createAsyncThunk('getTodo', async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "myTodo"));
        let todoListArray = [];
        querySnapshot.forEach((doc) => {
            todoListArray.push({
                title: doc.data().title,
                createdAt: doc.data().createdAt,
                id: doc.id,
                status: doc.data().status,
            });
            // console.log(doc.id, " => ", doc.data());
            // console.log("🚀 ~ file: todoSlice.js:37 ~ getTodo ~ todoListArray", todoListArray)
        });
        return todoListArray;

    } catch (error) {
        console.log("🚀 ~ file: todoSlice.js:49 ~ getTodo ~ error", error);
    }

});

//-------------------Delete Todo in firebase--------------------
//DeleteTodo import in Todo.js,,
export const DeleteTodo = createAsyncThunk('DeleteTodo', async (item) => {
    // console.log("🚀 ~ file: todoSlice.js:64 ~ DeleteTodo ~ item", item)
    try {
        await deleteDoc(doc(db, "myTodo", item.id));
        return item
    } catch (error) {
        console.log("🚀 ~ file: todoSlice.js:66 ~ DeleteTodo ~ error", error)
    }

});


//-------------------Update Todo in firebase--------------------
//updateTodo import in Todo.js,,
export const UpdateTodo = createAsyncThunk('UpdateTodo', async (item) => {
    try {
        const washingtonRef = doc(db, "myTodo", item.id);
        await updateDoc(washingtonRef, {
            title: item.title
        });
        return item;
    } 
    catch (error) {
        console.log("🚀 ~ file: todoSlice.js:83 ~ UpdateTodo ~ error", error);
    }
});


//-------------------Complete status update Todo in firebase--------------------
//updateTodo import in Todo.js,,
export const statusUpdateTodo = createAsyncThunk('statusUpdateTodo', async (item) => {
    try {
        const washingtonRef = doc(db, "myTodo", item.id);
        await updateDoc(washingtonRef, {
            status: "Complete"
        });
        return item;
    } 
    catch (error) {
        console.log("🚀 ~ file: todoSlice.js:103 ~ statusUpdateTodo ~ error", error)
    }
});



//----------------------------------------Step two make builder---------------------------------------------
// Add todo thunk slice 
const todoSlice = createSlice({
    name: "todo",
    initialState: { todo: [], error: null },
    extraReducers: (builder) => {
        // builder-------------------------add todo-----------------------
        builder.addCase(addTodo.fulfilled, (state, action) => {
            // console.log("state : ", state) // console.log("state : ", action)
            let newState = {
                ...state,
                todo: [...state.todo, action.payload],
            };
            // console.log("Action : ", newState)
            return newState;
        });

        // builder-------------------------get todo-----------------------
        builder.addCase(getTodo.fulfilled, (state, action) => {
            let getState = {
                ...state,
                todo: action.payload,
            };
            return getState;
        });

        // builder-------------------------Delete todo-----------------------
        builder.addCase(DeleteTodo.fulfilled, (state, action) => {
            const todo = state.todo;
            const item = action.payload;
            let filterTodo = todo.filter((todoItem) => {
                return item.id !== todoItem.id
            })
            let deleteState = {
                ...state,
                todo: filterTodo,
            };
            return deleteState;
        });

        // builder-------------------------UpdateTodo todo-----------------------
        builder.addCase(UpdateTodo.fulfilled, (state, action) => {
            const todo = state.todo;
            const item = action.payload;

            // console.log("------------------------------------")
            // console.log("Old All Todo ", todo);
            // console.log("Update All Todo ", item);
            // console.log("------------------------------------")

            let upDateTodo = {
                title: item.title,
                createdAt: item.createdAt,
                status: item.status,
            }
            let mapTodo = todo.map((todoItem) => {
                if (item.id == todoItem.id) {
                    return upDateTodo
                }
                else {
                    return todoItem
                }
            })
            let updateState = {
                ...state,
                todo: mapTodo,
            };
            return updateState;
        });



        //-------------------Status Update-----------------------------------
        builder.addCase(statusUpdateTodo.fulfilled, (state, action) => {
            const todo = state.todo;
            const item = action.payload;

            let upDateTodo = {
                title: item.title,
                createdAt: item.createdAt,
                status: item.status,
            }
            let mapTodo = todo.map((todoItem) => {
                if (item.id == todoItem.id) {
                    return upDateTodo
                }
                else {
                    return todoItem
                }
            })
            let updateCompleteStatusState = {
                ...state,
                todo: mapTodo,
            };
            return updateCompleteStatusState;
        });


        //----------------------------------------------
        
    },
})

//-----------------------------------------------------------------------------------------






// Export the reducer
// export default todoSlice;
export const { updateTodo } = todoSlice.actions;
export default todoSlice.reducer;