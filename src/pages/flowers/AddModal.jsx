import React, { useEffect, useRef, useState } from 'react'
import axiosInstance from '../../utils/config'
import axios from 'axios'

function AddModal({ data, setData, addModal, setAddModal, Alert, setAlert, setElements }) {
    const nameRef = useRef()
    const priceRef = useRef()
    const categoryRef = useRef()
    const subCategoryRef = useRef()
    const textRef = useRef()

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

    const addFunc = (e) => {
        e.preventDefault()
        const data = new FormData()

        for (let i = 0; i < Object.values(file).length; i++) {
            data.append("img", Object.values(file)[i])
            console.log(Object.values(file)[i]);
        }

        data.append("name", nameRef.current?.value)
        data.append("cotent", textRef.current?.value)
        data.append("price", priceRef.current?.value)
        data.append("rank", "122")
        data.append("id_category", Number(categoryRef.current?.value))
        data.append("id_sub_category", Number(subCategoryRef.current?.value))

        console.log(data);

        const token = localStorage.getItem('token');

        axios.post(`http://45.12.72.210/api/base/flowers_base_all_views/`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": token ? `Bearer ${token}` : ''
            }
        }).then((res) => {
            console.log(res.data);
            Alert(setAlert, "success", "Добавлено успешно");
            axiosInstance.get(`/flowers_base_all_views/?page=1`)
                .then((res) => {
                    console.log(res.data);
                    setData(res.data?.results);
                    setElements(res.data?.count)
                })
            setAddModal(false)
        })
    }

    // const trashFile = (index) => {
    //     if (file?.length > 0) {
    //         let arr = file.filter((f, i) => i !== index);
    //         setFile(arr);
    //     }
    // };


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
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <input className="form-control form-control-lg"
                                            ref={nameRef} type="text"
                                            placeholder='имя' />
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <input className="form-control form-control-lg"
                                            ref={priceRef} type="text"
                                            placeholder='цена' />
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <select class="form-select" ref={categoryRef}
                                            style={{ height: "50px" }}>
                                            <option selected="">категория</option>
                                            {category.map((item) => {
                                                return (
                                                    <option value={item.id}>{item.title}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <select class="form-select" ref={subCategoryRef}
                                            style={{ height: "50px" }}>
                                            <option selected="">подкатегория</option>
                                            {subCategory.map((item) => {
                                                return (
                                                    <option value={item.id}>{item.title}</option>
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
                                        <textarea className="form-control" rows="5" ref={textRef}
                                            placeholder='текст'></textarea>
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