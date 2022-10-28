import React, { useEffect, useState } from 'react';
import { Button, Container, Spinner } from 'react-bootstrap';
import { FaEdit } from "react-icons/fa";
import { AiFillCheckSquare, AiFillDelete } from "react-icons/ai";
import AddTodoModal from '../components/AddTodoModal/AddTodoModal';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateTodoModal from '../components/UpdateTodoModal/UpdateTodoModal';
import './Home.css';


const Home = () => {
    const [loading, setLoading] = useState(false);
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
        setLoading(true);
        fetch("https://task.atiar.info/api/todo")
            .then(res => res.json())
            .then(data => {
                setTodos(data.data);
                setLoading(false);
            });
    }, []);

    const handleDeleteProduct = ({ id }) => {

        const data = { id: id };
        // console.log(data)

        const proceed = window.confirm('Are you want to delete this todo');
        if (proceed) {
            axios.post('https://task.atiar.info/api/todo/delete', data)
                .then(res => {
                    if (res.data) {
                        console.log(res.data)
                        const remainingTodos = todos?.filter(item => item.id !== id);
                        setTodos(remainingTodos);
                        toast.error(res.data.message, {
                            position: 'top-center',
                            autoClose: 2000
                        })
                    }

                });


        }

    }

    const handleCompleteTodo = ({ id }) => {
        const data = { id: id }
        console.log(data);

        axios.post('https://task.atiar.info/api/todo/complete', data)
            .then(res => {
                if (res.data) {
                    console.log(res)
                    toast.success(res.data.message, {
                        position: 'top-center',
                        autoClose: 2000
                    });

                }

            });
    }

    if (loading) {
        return (
            <div className="d-flex justify-content-center py-5" style={{ margin: "300px 0" }}>
                <Spinner animation="grow" variant="danger" />
                <Spinner animation="grow" variant="warning" />
                <Spinner animation="grow" variant="success" />
            </div>
        )
    }



    return (
        <div>

            <Container className='mx-auto my-5'>
                <div>
                    <ToastContainer />
                </div>
                <div className='d-flex justify-content-end'>
                    <Button onClick={handleModalShow}>Add ToDo</Button>
                </div>
                <div className='mx-auto my-3 todos-section'>
                    {
                        todos?.map((todo) => (
                            <div className='mx-auto my-2 p-3 bg-white border rounded-3 d-flex justify-content-between align-items-center' key={todo?.id}>
                                <div>
                                    <h5>{todo?.title}</h5>
                                    <p className='m-0'>{todo?.note}</p>
                                    <p className='mb-0'>Start Date: {todo?.start_date} at {todo?.start_time} - {todo?.end_date} at {todo?.end_time}</p>
                                </div>
                                <div>

                                    <AiFillCheckSquare
                                        onClick={() => handleCompleteTodo(todo)}
                                        className="mx-1 fs-4 btn-checked" />
                                    <FaEdit

                                        onClick={() => handleUpdateModalShow(todo)}
                                        className="mx-1 fs-4 btn-update" />
                                    <AiFillDelete
                                        onClick={() => handleDeleteProduct(todo)}
                                        className="mx-1 fs-4 btn-delete" />
                                </div>
                            </div>
                        ))
                    }

                </div>
                <AddTodoModal
                    setTodos={setTodos}
                    showModal={showModal}
                    handleModalClose={handleModalClose}
                />

                <UpdateTodoModal
                    todos={todos}
                    setTodos={setTodos}
                    setUpdateData={setUpdateData}
                    updateData={updateData}
                    showUpdateModal={showUpdateModal}
                    handleUpdateModalClose={handleUpdateModalClose}
                />

            </Container>
        </div>
    );
};

export default Home;