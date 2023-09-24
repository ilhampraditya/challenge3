import React, { useState } from "react";
import { Form, Button, Col, Row, Modal } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import data from "../data.json";
import { Link } from "react-router-dom";
import Edit from "../assets/img/edit.png";
import Delete from "../assets/img/remove.png";

function ToDoList() {
  const [search, setSearch] = useState("");
  const [todos, setTodos] = useState(data);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState("");

  const removeToDo = (remove) => {
    const removeToDo = todos.filter((list) => {
      return list.id !== remove;
    });
    setTodos(removeToDo);
  };

  const checkTodo = (check) => {
    const checkedTodo = todos.map((todo) => {
      if (todo.id === check) {
        return { ...todo, complete: !todo.complete };
      } else {
        return todo;
      }
    });
    setTodos(checkedTodo);
  };

  const todoDone = () => {
    const newTodos = todos.filter((todo) => {
      return todo.complete === true;
    });
    setTodos(newTodos);
  };

  const deleteDoneTasks = () => {
    const newTodos = todos.filter((todo) => {
      return todo.complete === false;
    });
    setTodos(newTodos);
  };

  const deleteAllTasks = () => {
    setTodos([]);
  };

  const openModal = (id) => {
    setEditId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setEditId(null);
    setShowModal(false);
    setEditTask("");
  };

  const editTodo = () => {
    const updatedTodos = todos.map((todo) =>
      todo.id === editId ? { ...todo, task: editTask } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="container-content">
      <h2 className="text-center my-4">
        <b>TodoSearch</b>
      </h2>
      <div className="card">
        <div className="container">
          <div className="row mb-3 mt-3">
            <div className="col-6">
              <Form>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="form-control w-100"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Form>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-6">
              <Button
                variant="primary w-100"
                style={{ backgroundColor: "#24A3B6" }}
              >
                Search
              </Button>
            </div>

            <div className="col-6">
              <Button
                as={Link}
                variant="primary w-100"
                style={{ backgroundColor: "#24A3B6" }}
                to="/todo-add"
              >
                Add New Task
              </Button>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-center my-4">TodoList</h2>
      <div className="row my-3">
        <div className="col-4">
          <Button
            variant="primary w-100"
            style={{ backgroundColor: "#24A3B6" }}
            onClick={() => {
              setTodos(data);
            }}
          >
            All
          </Button>
        </div>
        <div className="col-4">
          <Button
            variant="primary w-100"
            style={{ backgroundColor: "#24A3B6" }}
            onClick={() => {
              const newTodos = todos.filter((todo) => {
                return todo.complete === true;
              });
              setTodos(newTodos);
            }}
          >
            Done
          </Button>
        </div>

        <div className="col-4">
          <Button
            variant="primary w-100"
            style={{ backgroundColor: "#24A3B6" }}
            onClick={() => {
              const newTodos = todos.filter((todo) => {
                return todo.complete === false;
              });
              setTodos(newTodos);
            }}
          >
            Todo
          </Button>
        </div>
      </div>

      <Row>
        <Col>
          <ListGroup>
            {todos &&
              todos.length > 0 &&
              todos
                .filter((dataItem) =>
                  dataItem.task.toLocaleLowerCase().includes(search)
                )
                .map((data, index) => (
                  <ListGroup.Item key={data.id} className="mb-3">
                    <div className="d-flex justify-content-between">
                      <span
                        style={
                          data.complete
                            ? { textDecoration: "line-through" }
                            : { textDecoration: "none" }
                        }
                      >
                        {data.task}
                      </span>
                      <div className="mx-2">
                        <input
                          className="mx-3"
                          type="checkbox"
                          checked={data.complete}
                          onChange={() => checkTodo(data.id)}
                          style={{
                            transform: "scale(1.2)",
                            verticalAlign: "middle",
                          }}
                        ></input>
                        <img
                          className="mx-2 my-1"
                          src={Edit}
                          style={{
                            width: "17px",
                          }}
                          alt=""
                          onClick={() => openModal(data.id)}
                        ></img>
                        <img
                          className="mx-2 my-1"
                          src={Delete}
                          style={{
                            width: "17px",
                          }}
                          alt=""
                          onClick={() => {
                            removeToDo(data.id);
                          }}
                        ></img>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
          </ListGroup>
        </Col>
      </Row>

      <div className="row">
        <div className="col-6">
          <div className="d-grid gap-2 my-4">
            <Button variant="danger" onClick={deleteDoneTasks}>
              Delete Done Task
            </Button>
          </div>
        </div>
        <div className="col-6">
          <div className="d-grid gap-2 my-4">
            <Button variant="danger" onClick={deleteAllTasks}>
              Delete All Task
            </Button>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {todos &&
            todos.length > 0 &&
            todos
              .filter((dataItem) => dataItem.id === editId)
              .map((data) => (
                <Form key={data.id}>
                  <Form.Group controlId="formTask">
                    <Form.Label>Task</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={data.task}
                      onChange={(e) => setEditTask(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModal}>
            Close
          </Button>
          <Button
            variant="primary"
            style={{ backgroundColor: "#24A3B6" }}
            onClick={editTodo}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ToDoList;
