import axios from 'axios';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';


const AddTodoModal = ({ showModal, handleModalClose }) => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        axios.post('http://task.atiar.info/api/todo/create', data)
            .then(res => {
                if (res?.data.success === true) {
                    console.log(res.data)
                    reset();
                    handleModalClose();

                }

            });
    }

    console.log(errors);

    return (
        <div>
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'>
                        <h4 >Add Todo</h4>
                    </Modal.Title>
                    <hr />

                </Modal.Header>
                <Modal.Body>
                    <div className={`mx-auto rounded-3`}>

                        <form className=" mx-auto d-flex justify-content-center align-items-center flex-column w-100" onSubmit={handleSubmit(onSubmit)}>
                            <input className="w-100  mx-auto my-2 p-1 border border-2 rounded-3" type="text" placeholder="Write task title" {...register("title", { required: true, maxLength: 80 })} />
                            <textarea className="w-100  mx-auto my-2 p-1 border border-2 rounded-3" placeholder="Write task note" {...register("note", { required: true })} />
                            <div className='d-flex mx-2 w-100'>
                                <input className="w-100 me-2 my-2 p-1  border border-2 rounded-3" type="date" placeholder="Start Date" {...register("start_date", { required: true })} />
                                <input className="w-100 mx-auto my-2 p-1 border border-2 rounded-3" type="time" placeholder="Start Time" {...register("start_time", { required: true })} />
                            </div>
                            <div className='d-flex mx-2 w-100'>
                                <input className="w-100  me-2 my-2 p-1 border border-2 rounded-3" type="date" placeholder="End Date" {...register("end_date", { required: true })} />
                                <input className="w-100  mx-auto my-2 p-1 border border-2 rounded-3" type="time" placeholder="End Time" {...register("end_time", { required: true })} />
                            </div>

                            <Button className='border-0 fw-bold px-3 w-50 mt-3' variant="primary" type="submit">Add </Button>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AddTodoModal;