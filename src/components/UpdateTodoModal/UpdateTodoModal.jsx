import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const UpdateTodoModal = ({ showUpdateModal, updateData, handleUpdateModalClose }) => {


    const { title, note, start_date, start_time, end_date, end_time } = updateData || {};
    // useEffect(() => {
    //     fetch(`http://task.atiar.info/api/todo/update/${id}`)
    //         .then(res => res.json())
    //         .then(data => setUpdateTodo(data));
    // }, [id]);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        const url = `http://task.atiar.info/api/todo/update`;
        const proceed = window.confirm('Are you want to update this product');
        if (proceed) {
            axios.put(url, data)
                .then(res => {
                    console.log(res.data);
                    reset();


                });
        }
        console.log(data)
    };
    console.log(errors);


    return (
        <div>
            <Modal show={showUpdateModal} onHide={handleUpdateModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'>
                        <h4 >Update Todo</h4>
                    </Modal.Title>
                    <hr />

                </Modal.Header>
                <Modal.Body>
                    <div className={`mx-auto rounded-3 `}>

                        <form className=" mx-auto d-flex justify-content-center align-items-center flex-column w-100" onSubmit={handleSubmit(onSubmit)}>
                            <input className="w-100  mx-auto my-2 p-1 border border-2 rounded-3" type="text" placeholder="Write task title" {...register("title", { required: true, maxLength: 80 })} defaultValue={title} />
                            <textarea className="w-100  mx-auto my-2 p-1 border border-2 rounded-3" placeholder="Write task note" {...register("note", { required: true })} defaultValue={note} />
                            <div className='d-flex mx-2 w-100'>
                                <input className="w-100 me-2 my-2 p-1  border border-2 rounded-3" type="date" placeholder="Start Date" {...register("start_date", { required: true })} defaultValue={start_date} />
                                <input className="w-100 mx-auto my-2 p-1 border border-2 rounded-3" type="time" placeholder="Start Time" {...register("start_time", { required: true })} defaultValue={start_time} />
                            </div>
                            <div className='d-flex mx-2 w-100'>
                                <input className="w-100  me-2 my-2 p-1 border border-2 rounded-3" type="date" placeholder="End Date" {...register("end_date", { required: true })} defaultValue={end_date} />
                                <input className="w-100  mx-auto my-2 p-1 border border-2 rounded-3" type="time" placeholder="End Time" {...register("end_time", { required: true })} defaultValue={end_time} />
                            </div>

                            <Button className='border-0 fw-bold px-3 w-50 mt-3' variant="primary" type="submit">Save Changes </Button>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default UpdateTodoModal;