import React, { useEffect, useRef, useState } from 'react'
import axiosInstance from '../../utils/config'

function EditModal({ data, setData, editModal, setEditModal, Alert, setAlert }) {
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

    const editFunc = (e) => {
        e.preventDefault()

        axiosInstance.put(`/sub_categoriya_base_crud_views/${editModal.item.id}/`, {
            id: editModal.item.id,
            title: titleRef?.current?.value || "",
            id_categoriya: categoryRef?.current?.value
        }).then((res) => {
            Alert(setAlert, "success", "Изменено успешно!");

            axiosInstance.get(`/sub_categoriya_base_all_views/`)
                .then((res) => {
                    console.log(res.data);
                    setData(res.data);
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
                                            ref={titleRef} type="text"
                                            placeholder='имя'
                                        />
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <select class="form-select" ref={categoryRef}
                                            style={{ height: "50px" }}>
                                            <option>категория</option>
                                            {category.map((item) => {
                                                return (
                                                    <option value={item.id} selected={item.id === editModal?.item?.id_categoriya?.id ? true : false}>{item.title}</option>
                                                )
                                            })}
                                        </select>
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