import React, { useRef, useState } from 'react'
import axiosInstance from '../../utils/config'
import axios from 'axios'

function AddModal({ data, setData, addModal, setAddModal, Alert, setAlert, setElements }) {
    const nameRef = useRef()
    const textRef = useRef()

    const [file, setFile] = useState(null)

    const addFunc = (e) => {
        e.preventDefault()

        const data = new FormData()

        if (file) {
            for (let i = 0; i < Object.values(file)?.length; i++) {
                data.append("img", Object.values(file)[i])
                console.log(Object.values(file)[i]);
            }
        }

        data.append("title", nameRef.current?.value)
        data.append("content", textRef.current?.value)

        console.log({
            title: nameRef.current?.value,
            content: textRef.current?.value,
        });

        const token = localStorage.getItem('token');

        axios.post(`http://45.12.72.210/api/base/blogs_base_all_views/`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": token ? `Bearer ${token}` : ''
            }
        }).then((res) => {
            console.log(res.data);
            Alert(setAlert, "success", "Добавлено успешно");
            axiosInstance.get(`/blogs_base_all_views/?page=1`)
                .then((res) => {
                    console.log(res.data);
                    setData(res.data?.results);
                    setElements(res.data?.count)
                })
            setAddModal(false)
        })

        // axiosInstance.post(`/categoriya_base_all_views/`, {
        //     title: titleRef.current?.value
        // }).then((res) => {
        //     Alert(setAlert, "success", "Добавлено успешно");
        //     setData([res.data, ...data])
        //     setAddModal(false)
        // })
    }



    return (
        <div className="modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" >
                    <div className="modal-header bg-primary py-3">
                        <h5 className="modal-title text-white">Добавить новость</h5>
                        <button type="button" className="btn-close"
                            onClick={() => setAddModal(false)}></button>
                    </div>

                    <div className="modal-body">
                        <form onSubmit={addFunc}>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <input className="form-control form-control-lg"
                                            ref={nameRef} type="text"
                                            placeholder='заголовок' />
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <textarea class="form-control" rows="5" ref={textRef}
                                            placeholder='текст'></textarea>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <input type="file" id="files"
                                            className="form-control"
                                            name="files" multiple
                                            onChange={(e) => setFile(e.target.files)} />
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <button className="btn-lg btn btn-primary w-100" type='submit'>
                                        Добавлять
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddModal