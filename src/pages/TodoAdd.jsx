import React, { useState } from "react";
import {Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import data from "../data.json";

function TodoAdd() {
  const navigate = useNavigate();

  const [task, setTask] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    if (!task) {
      alert("task is required!");
      return;
    }

    const dataLength = data.length;
    data.push({
      id: dataLength + 1,
      task,
    });

    return navigate("/");
  };

  return (
    <div className="container-content">
      <div className="text-center">
        <h2>
          <b>TodoInput</b>
        </h2>
      </div>

      <div className="card">
        <div className="container">
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3 mt-3" controlId="task">
              <Form.Control
                type="text"
                placeholder="Input Task"
                required={true}
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
            </Form.Group>

            <Button
              className="mb-3"
              variant="primary w-100"
              style={{ backgroundColor: "#24A3B6" }}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default TodoAdd;
