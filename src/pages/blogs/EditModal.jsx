import React, { useRef, useState } from 'react'
import axiosInstance from '../../utils/config'
import axios from 'axios'

function EditModal({ data, setData, editModal, setEditModal, Alert, setAlert, setElements }) {
    const nameRef = useRef()
    const textRef = useRef()

    const [file, setFile] = useState(null)

    const editFunc = (e) => {
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

        const token = localStorage.getItem('token');

        axios.put(`http://45.12.72.210/api/base/blogs_base_crud_views/${editModal.item.id}/`, data, {
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

            setEditModal({ isShow: false, item: {} })
        })
    }

    return (
        <div className="modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" >
                    <div className="modal-header bg-primary py-3">
                        <h5 className="modal-title text-white">Редактирование</h5>
                        <button type="button" className="btn-close"
                            onClick={() => setEditModal({ isShow: false, item: {} })}></button>
                    </div>

                    <div className="modal-body">
                        <form onSubmit={editFunc}>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <input className="form-control form-control-lg"
                                            defaultValue={editModal.item.title}
                                            ref={nameRef} type="text"
                                            placeholder='заголовок' />
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <textarea class="form-control" rows="5" ref={textRef}
                                            defaultValue={editModal.item.content}
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
                                    Изменять
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

export default EditModal