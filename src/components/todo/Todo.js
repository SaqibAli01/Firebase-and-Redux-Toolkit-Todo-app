import React, { useEffect, useState } from "react";
import "./Todo.css";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, getTodo, DeleteTodo, UpdateTodo, statusUpdateTodo } from "../../reduxToolkit/todoSlice";

const Todo = () => {
  const [todoInput, setTodoInput] = useState("");
  const [edit, setEdit] = useState({});
  const [btnUpdate, setBtnUpdate] = useState(false)
  // console.log("🚀 ~ file: Todo.js:9 ~ Todo ~ edit", edit)
  //   console.log("ToDo Input", todoInput);

  const dispatch = useDispatch();
  const storeTodo = useSelector((store) => store.todoSlice.todo);
  // console.log("🚀 ~ file: Todo.js:20 ~ Todo ~ storeTodo", storeTodo);

  const AddToDooHandler = (e) => {
    e.preventDefault();
    if (todoInput == "") {
      alert("Please enter todo");
    }
    else {
      dispatch(addTodo(todoInput));
      alert("Add Successfully");
      setTodoInput("");
    }
  };

  //--------------------Edit, Delete, Complete------------------

  //---------------------Edit Handler---------------------------
  const EditHandler = (item) => {
    console.log("Edit item", item)
    // console.log("Edit id", item.id)
    setBtnUpdate(true);
    setTodoInput(item.title);
    setEdit(item);
    // alert("Edit");
  }


  //---------------------Edit Handler---------------------------
  const UpdateToDooHandler = () => {

    // console.log("Update-------",edit)
    // setTodoInput(edit.title)
    // console.log("...edit,title:todoInput: ", {...edit,title:todoInput});

    dispatch(UpdateTodo({ ...edit, title: todoInput }));
    // dispatch(UpdateTodo({ ...edit, title: todoInput }));
    alert("Update Successfully");
    setTodoInput("");
    setEdit("");
    setBtnUpdate(false);

  }


  //---------------------Delete Handler---------------------------
  const deleteTodoHandler = (item) => {
    console.log("Delete item", item);
    dispatch(DeleteTodo(item));
    alert("Delete Successfully");

  }

  //---------------------Complete Handler---------------------------
  const [active, setActive] = useState(false);
  const [style, setStyle] = useState("cont");


  const completeTodoHandler = (item) => {
    console.log("complete item", item);
    //method one
    //  dispatch(updateTodo({ ...item, status: "completed" }));
    if (item.status === "Complete") {
      alert("Status is Already Complete")
      // setActive({ backgroundColor: active ? "green" : "white" });
      setActive(!active);



    }
    else {

      dispatch(statusUpdateTodo(item));
      alert("Status is Complete");
      setActive(!active);


    }
    //method two
    //  dispatch(updateTodo({ ...item, status: "completed" }));

  }

  //-----------------------------------------------------------------
  // const handleClick = () => {
  //   setActive(!active);
  // };



  // const changeStyle = () => {
  //   console.log("you just clicked");

  //   // setStyle("cont2");
  // };

  //-----------------------------------------------------------

  useEffect(() => {

    dispatch(getTodo());

  }, [UpdateToDooHandler]);

  return (
    <>
      <div className="container">
        {/* <!-- setting row   --> */}
        <div className="row">
          {/* <!-- setting col     --> */}
          <div className="col mx-auto col-md-8 mt-3 text-center">
            {/* <!-- setting alert message on the top of the page when add a list to do  --> */}
            <div className="alert align-items-center" id="message"></div>

            <form id="itemForm">
              <h3 className="fs-1 pink">TO DO LIST</h3>
              <div className="input-group mb-3">
                <input
                  onChange={(e) => setTodoInput(e.target.value)}
                  value={todoInput}
                  placeholder="Please enter a task..."
                  type="text"
                  className="form-control"
                  id="itemInput"
                />
                {btnUpdate ?
                  <button onClick={UpdateToDooHandler} className="btn btn-outline-primary">UPDATE ITEM</button>
                  :
                  <button onClick={AddToDooHandler} className="btn btn-outline-primary">ADD ITEM</button>
                }
                {/* <button
                  onClick={AddToDooHandler}
                  className="btn btn-outline-primary"
                >
                  ADD ITEM
                </button> */}
              </div>
            </form>

            <ul className="nav nav-tabs">
              <li className="nav-item" data-type="all" all-items>
              </li>
              <li className="nav-item" data-type="all">
                <a className="nav-link active" href="#">
                  All
                </a>
              </li>
             
            </ul>

            <ul className="list-group list-group-flush" id="itemsList">
              {storeTodo.map((item, index) => {
                return (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    {item.status == "Complete"
                      ?
                      <span className="title text_dr" data-time="1675594105795"> {item.title}</span>

                      :
                      <span className="title" data-time="1675594105795"> {item.title}</span>

                    }


                    <span>
                      <a href="#" data-done="" >
                        {item.status == "Complete"
                          ?
                          <i className="bi bi-clipboard-check  greens"
                            onClick={() => completeTodoHandler(item)}></i>
                          :
                          <i className="bi bi-clipboard-check  green"
                            onClick={() => completeTodoHandler(item)}></i>}
                      </a>
                      <a href="#" data-edit="">
                        <i className="bi bi-pencil blue" onClick={() => EditHandler(item)}></i>
                      </a>
                      <a href="#" data-delete="">
                        <i className="bi bi-trash3 red" onClick={() => deleteTodoHandler(item)}></i>
                      </a>
                    </span>
                  </li>
                );
              })}
            </ul>




            <input type="hidden" id="objIndex" value="" />
            <input type="hidden" id="tabValue" value="all" />
          </div>
        </div>
      </div>



    </>
  );
};

export default Todo;
