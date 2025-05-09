import { useEffect, useState } from "react";
import swal from "sweetalert";
import { ApiTodoList } from "../TodoListApiService";


const GrandList = () => {

  const [value, setValue] = useState([]);
  const [div, setDiv] = useState("");
  const [user, setUser] = useState("");

  const handleChecK = async () => {
    try {
      const request = await ApiTodoList.checkTaskUser(user);
      setValue(request.todos)
    }
    catch (error) {
    }
  }
  const handleCreateTask = async () => {
    try {
      const data = await ApiTodoList.creattask(user, div)
    }
    catch (error) {
      console.log(error)
    }
  }
  const handleUser = async () => {
    try {
      const data = await ApiTodoList.createUser(user)
      if (data.detail === "User already exists.") {
        try {
          const data = await ApiTodoList.checkTaskUser(user)
          if (data.todos.length === 0) {
            swal({
              title: "WELLCOME",
              text: `MR.${user}. Don´t have any task pending.
                 Add any task`,
              button: "ACEPT",
              timer: 4000
            });
          } else {
            setValue(data.todos)
          }
        }
        catch (error) {
        }
      }
    }
    catch (error) {
    }
  }

  const pressEnterUser = (e) => {
    if (e.keyCode === 13) {
      if (user !== "") {
        handleUser()
      }
    }
  }

  const pressEnter = (e) => {
    if (e.keyCode === 13) {
      if (div !== "") {
        addTarea()
      }
    }
  }
  const getTarea = (e) => {
    setDiv(e.target.value)

  }
  const getuser = (e) => {
    setUser(e.target.value)
  }

  const addTarea = async () => {
    if (user !== "") {
      await
        handleCreateTask();
      await
        handleChecK();
    }
    setDiv("")
  }

  const changeColor = async (id, label) => {
    const handleUpdateTask = async () => {
      try {
        const data = await ApiTodoList.updateTask(id, label)
      } catch (error) {}
      
     }
    await
      handleUpdateTask();
    await
      handleChecK();
  }



  const deleteTarea = async (id) => {
    {
      const handleDeleteTask = async () => {
        try {
          const data = await ApiTodoList.deleteTask(id)
        } catch (error) {
          console.log(error)
        }
      }
      await
        handleDeleteTask();
      await
        handleChecK();
      if (value.length == 1) {
        swal({
          title: "EMPTY TASK",
          text: "PLEASE ENTER A TASK",
          icon: "error",
          button: "ACEPT",
          timer: 4000
        });
      }
    }
  }
  let color = "red"
  let counterValue = value.length



  return (
    <div className="p-3 mb-2 bg-body-secondary"> <h1 id="title"> BIG TASK </h1>
      <div className="user">
        <h4>USER NAME</h4>
        <li className="list-group-item bg-body-tertiary">
          <input type="text" className="form-control bg-body-tertiary"
            placeholder="USER" value={user} onChange={getuser} onKeyDown={pressEnterUser} />
        </li>
      </div>
      <ul className="list-group bg-body-tertiary" style={{ filter: "drop-shadow(0px 8px 7px #000000)" }}>
        <li className="list-group-item bg-body-tertiary">
          <input type="text" className="form-control bg-body-tertiary"
            placeholder="What Needs To Be Done" value={div} onChange={getTarea} onKeyDown={pressEnter} />
        </li>
        {value.map((task) => {
          if (task.is_done !== false) {
            color = "green"
          } else {
            color = "red"
          }
          return (
            <li className="list-group-item bg-body-tertiary" key={task.id}>
              <div className="liDiv">
                <h5 className="text" style={{ color: `${color}` }}>{task.label}</h5>
                <div className="twobtn">
                  <button type="button" className="btn btn-success" onClick={() => changeColor(task.id, task.label)}>DONE</button>
                  <button type="button" className="btn-close" labelvalue="Close" onClick={() => deleteTarea(task.id)}></button>
                </div>
              </div>
            </li>
          )
        }
        )}
        <li id="text" className="list-group-item bg-body-tertiary"><p className="text">{counterValue} Item left</p></li>
      </ul>
      <li id="one" className="list-group-item bg-body-tertiary"></li>
      <li id="two" className="list-group-item bg-body-tertiary"></li>
    </div>

  )
}

export default GrandList