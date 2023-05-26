import React, { useEffect, useRef, useState } from 'react'
import axiosInstance from '../../utils/config'
import axios from 'axios'

function EditModal({ data, setData, editModal, setEditModal, Alert, setAlert, setElements }) {
    const nameRef = useRef()
    const priceRef = useRef()
    const categoryRef = useRef()
    const subCategoryRef = useRef()
    const textRef = useRef()

    console.log(editModal.item);

    const [category, setCategory] = useState([])
    const [subCategory, setSubCategory] = useState([])
    const [file, setFile] = useState(null);

    useEffect(() => {
        axiosInstance.get(`/categoriya_base_all_views`)
            .then((res) => {
                console.log(res.data);
                setCategory(res.data);
            })
    }, [])

    useEffect(() => {
        axiosInstance.get(`/sub_categoriya_base_all_views/`)
            .then((res) => {
                console.log(res.data);
                setSubCategory(res.data);
            })
    }, [setData])

    const editFunc = (e) => {
        e.preventDefault()

        const data = new FormData()

        if (file) {
            for (let i = 0; i < Object.values(file).length; i++) {
                data.append("img", Object.values(file)[i])
                console.log(Object.values(file)[i]);
            }
        }

        data.append("name", nameRef.current?.value)
        data.append("cotent", textRef.current?.value)
        data.append("price", priceRef.current?.value)
        data.append("rank", "122")
        data.append("id_category", Number(categoryRef.current?.value))
        data.append("id_sub_category", Number(subCategoryRef.current?.value))

        console.log(data);

        const token = localStorage.getItem('token');

        axios.put(`http://45.12.72.210/api/base/flowers_base_crud_views/${editModal.item.id}/`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": token ? `Bearer ${token}` : ''
            }
        }).then((res) => {
            console.log(res.data);
            Alert(setAlert, "success", "Изменено успешно!");
            axiosInstance.get(`/flowers_base_all_views/?page=1`)
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
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <input className="form-control form-control-lg"
                                            ref={nameRef} type="text"
                                            defaultValue={editModal.item.name}
                                            placeholder='имя' />
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <input className="form-control form-control-lg"
                                            ref={priceRef} type="text"
                                            defaultValue={editModal.item.price}
                                            placeholder='цена' />
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <select class="form-select" ref={categoryRef}
                                            style={{ height: "50px" }}>
                                            <option>категория</option>
                                            {category.map((item) => {
                                                return (
                                                    <option value={item.id} selected={item.id === editModal?.item?.id_category?.id ? true : false}>{item.title}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <select class="form-select" ref={subCategoryRef}
                                            style={{ height: "50px" }}>
                                            <option>подкатегория</option>
                                            {subCategory.map((item) => {
                                                return (
                                                    <option value={item.id} selected={item.id === editModal?.item?.id_sub_category?.id ? true : false}>{item.title}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <input type="file" id="files" className="form-control"
                                            name="files" multiple
                                            onChange={(e) => setFile(e.target.files)} />
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <textarea className="form-control"
                                            defaultValue={editModal.item.cotent}
                                            rows="5" ref={textRef}
                                            placeholder='текст'></textarea>
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