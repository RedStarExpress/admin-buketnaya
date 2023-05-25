import React, { useEffect, useRef, useState } from 'react'
import axiosInstance from '../../utils/config'
import axios from 'axios'

function AddModal({ data, setData, addModal, setAddModal, Alert, setAlert }) {
    const nameRef = useRef()
    const priceRef = useRef()
    const categoryRef = useRef()
    const subCategoryRef = useRef()
    const textRef = useRef()

    const [category, setCategory] = useState([])
    const [subCategory, setSubCategory] = useState([])
    const [file, setFile] = useState([]);

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

        // file.map((file) => {
        //     formData.append('files', file);
        //   });


        console.log(file)

        data.append("img", file)
        data.append("name", nameRef.current?.value)
        data.append("cotent", textRef.current?.value)
        data.append("price", priceRef.current?.value)
        data.append("rank", "122")
        data.append("id_category", Number(categoryRef.current?.value))
        data.append("id_sub_category", Number(subCategoryRef.current?.value))

        console.log(data);

        const token = localStorage.getItem('token');

        console.log({
            "name": nameRef.current?.value,
            "cotent": textRef.current?.value,
            "price": priceRef.current?.value,
            "rank": "122",
            "id_category": Number(categoryRef.current?.value),
            "id_sub_category": Number(subCategoryRef.current?.value),
        });

        axios.post(`http://45.12.72.210/api/base/flowers_base_all_views/`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": token ? `Bearer ${token}` : ''
            }
        }).then((res) => {
            console.log(res.data);
            Alert(setAlert, "success", "Добавлено успешно");
            setData([res.data, ...data])
            setAddModal(false)
        })


        // axiosInstance.post(`/flowers_base_all_views/`, {
        //     "name": nameRef.current?.value,
        //     "cotent": textRef.current?.value,
        //     "price": priceRef.current?.value,
        //     "rank": "122",
        //     "id_category": Number(categoryRef.current?.value),
        //     "id_sub_category": Number(subCategoryRef.current?.value),
        // }).then((res) => {
        //     console.log(res.data);
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
                                    <input type="file" id="files" name="files" multiple 
                                    onChange={(e) => setFile(e.target.files)}/>
                                </div>

                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <textarea class="form-control" rows="5" ref={textRef}
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