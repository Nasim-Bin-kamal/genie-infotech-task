import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { FaEdit } from "react-icons/fa";
import { AiFillCheckSquare, AiFillDelete } from "react-icons/ai";
import AddTodoModal from '../components/AddTodoModal/AddTodoModal';
import axios from 'axios';
import UpdateTodoModal from '../components/UpdateTodoModal/UpdateTodoModal';

const Home = () => {
    const [updateData, setUpdateData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const handleModalShow = () => setShowModal(true);
    const handleModalClose = () => setShowModal(false);

    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const handleUpdateModalShow = (data) => {
        setShowUpdateModal(true);
        setUpdateData(data);

    };
    const handleUpdateModalClose = () => setShowUpdateModal(false);

    const [todos, setTodos] = useState([]);
    useEffect(() => {
        fetch("http://task.atiar.info/api/todo")
            .then(res => res.json())
            .then(data => setTodos(data.data));
    }, []);

    const handleDeleteProduct = (id) => {
        // console.log(id)
        const url = `http://task.atiar.info/api/todo/delete/${id}`;
        const proceed = window.confirm('Are you want to delete this todo');
        if (proceed) {
            axios.delete(url)
                .then(res => {
                    console.log(res.data.date);
                    if (res.data > 0) {

                        const remainingTodos = todos?.filter(todo => todo.id !== id);
                        setTodos(remainingTodos);
                    }

                });
        }

    }

    return (
        <div>
            <Container>
                <h1>All todos</h1>
                <div className='d-flex justify-content-end'>
                    <Button onClick={handleModalShow}>Add ToDo</Button>
                </div>
                <div className='mx-auto my-3'>
                    {
                        todos?.map((todo) => (
                            <div className='mx-auto my-2 p-3 bg-white border rounded-3 d-flex justify-content-between align-items-center' key={todo?.id}>
                                <div>
                                    <h5>{todo?.title}</h5>
                                    <p className='m-0'>{todo?.note}</p>
                                    <p>Start Date: {todo?.start_date} at {todo?.start_time} - {todo?.end_date} at {todo?.end_time}</p>
                                </div>
                                <div>
                                    <AiFillCheckSquare className="mx-1 fs-4" />
                                    <FaEdit

                                        onClick={() => handleUpdateModalShow(todo)}
                                        className="mx-1 fs-4" />
                                    <AiFillDelete
                                        onClick={() => handleDeleteProduct(todo?.id)}
                                        className="mx-1 fs-4" />
                                </div>
                            </div>
                        ))
                    }

                </div>
                <AddTodoModal
                    showModal={showModal}
                    handleModalClose={handleModalClose}
                />

                {
                    updateData && (
                        <UpdateTodoModal
                            updateData={updateData}
                            showUpdateModal={showUpdateModal}
                            handleUpdateModalClose={handleUpdateModalClose}
                        />
                    )
                }


            </Container>
        </div>
    );
};

export default Home;