import React, { useEffect, useRef, useState } from 'react'
import axiosInstance from '../../utils/config'

function AddModal({ data, setData, addModal, setAddModal, Alert, setAlert }) {
    const titleRef = useRef()
    const categoryRef = useRef()

    const [category, setCategory] = useState([])

    useEffect(() => {
        axiosInstance.get(`/categoriya_base_all_views`)
            .then((res) => {
                console.log(res.data);
                setCategory(res.data);
            })
    }, [])

    const addFunc = (e) => {
        e.preventDefault()
        axiosInstance.post(`/sub_categoriya_base_all_views/`, {
            title: titleRef.current?.value,
            id_categoriya: categoryRef.current?.value
        }).then((res) => {
            console.log(res.data);
            Alert(setAlert, "success", "Добавлено успешно");
            setData([res.data, ...data])
            setAddModal(false)
        })
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
                                            ref={titleRef} type="text"
                                            placeholder='имя' />
                                    </div>
                                </div>

                                <div className="col-lg-12">
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