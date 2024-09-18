import React, { useState, useEffect } from 'react';
import './Employee.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

let id = sessionStorage.getItem('id');

const Todo = () => {
    const [Inputs, setInputs] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        course: [],
        image: null
    });
    const [Array, setArray] = useState([]);

    // const show = () => {
    //     document.getElementById('textarea').style.display = 'block';
    // };

    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value });
    };

    const handleCourseChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setInputs({ ...Inputs, course: [...Inputs.course, value] });
        } else {
            setInputs({ ...Inputs, course: Inputs.course.filter((c) => c !== value) });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file.type); // Check the MIME type in the console
        setInputs({ ...Inputs, image: file });
    };

    const submit = async () => {
        if (!id) {/////////////
            toast.error("Your Task Is Not Saved! Please SignUp.");
            return;
        }/////////////////
        if (Inputs.name === "" || Inputs.email === "" || Inputs.mobile === "" || Inputs.designation === "" || Inputs.gender === "") {
            toast.error('All Fields Are Required');
        } else {
            const formData = new FormData();
            formData.append('name', Inputs.name);
            formData.append('email', Inputs.email);
            formData.append('mobile', Inputs.mobile);
            formData.append('designation', Inputs.designation);
            formData.append('gender', Inputs.gender);
            formData.append('course', Inputs.course);
            formData.append('image', Inputs.image);
            formData.append('id', id);

            if (id) {
                await axios
                    .post('http://localhost:4004/api/tasks/addTask', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                    .then((response) => {
                        console.log(response);
                        toast.success("Your Form Is Submitted");
                    });
                setInputs({
                    name: '',
                    email: '',
                    mobile: '',
                    designation: '',
                    gender: '',
                    course: [],
                    image: null
                });
            } else {
                toast.error("Your Task Is Not Saved ! Please SignUp");
            }
        }
    };

    useEffect(() => {
        if (id) {
            const fetch = async () => {
                await axios
                    .get(`http://localhost:4004/api/tasks/getTasks/${id}`)
                    .then((response) => {
                        setArray(response.data.task);
                    });
            };
            fetch();
        }
    }, [submit]);

    return (
        <>
            <div className='todo'>
                <ToastContainer />
                <div className="todo-main container d-flex justify-content-center align-items-center my-4 flex-column">
                    <div className="d-flex flex-column todo-inputs-div w-100 p-1">
                        <input
                            type='text'
                            placeholder='Name'
                            className='my-2 p-2 todo-inputs'
                            name='name'
                            value={Inputs.name}
                            onChange={change}
                        />
                        <input
                            type='email'
                            placeholder='Email'
                            className='my-2 p-2 todo-inputs'
                            name='email'
                            value={Inputs.email}
                            onChange={change}
                        />
                        <input
                            type='text'
                            placeholder='Mobile No'
                            className='my-2 p-2 todo-inputs'
                            name='mobile'
                            value={Inputs.mobile}
                            onChange={change}
                        />
                        <select
                            name="designation"
                            className='my-2 p-2 todo-inputs'
                            value={Inputs.designation}
                            onChange={change}
                        >
                            <option value="">Select Designation</option>
                            <option value="Developer">Developer</option>    
                            <option value="HR">HR</option>
                            <option value="Manager">Manager</option>
                            <option value="Sales">Sales</option>
                        </select>

                        <div className="my-2">
                            <label>Gender: </label>
                            <input
                                type="radio"
                                name="gender"
                                value="M"
                                checked={Inputs.gender === "M"}
                                onChange={change}
                            /> Male
                            <input
                                type="radio"
                                name="gender"
                                value="F"
                                checked={Inputs.gender === "F"}
                                onChange={change}
                            /> Female
                        </div>

                        <div className="my-2">
                            <label>Course: </label>
                            <input
                                type="checkbox"
                                name="course"
                                value="MCA"
                                onChange={handleCourseChange}
                            /> MCA
                            <input
                                type="checkbox"
                                name="course"
                                value="BCA"
                                onChange={handleCourseChange}
                            /> BCA
                            <input
                                type="checkbox"
                                name="course"
                                value="BSC"
                                onChange={handleCourseChange}
                            /> BSC
                        </div>

                        <input
                            type='file'
                            className='my-2 p-2 todo-inputs'
                            name='image'
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className='w-lg-50 w-100 d-flex justify-content-end my-2'>
                        <button className='home-btn px-2 p-1' onClick={submit}>Submit</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Todo;