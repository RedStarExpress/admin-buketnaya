import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const inputRef = useRef(null);
  const navigate = useNavigate()

  const search = (event) => {
    if (event.key === 'Enter') {
      navigate("/qidiruv", { state: inputRef.current.value })
      inputRef.current.value = ""
    }
  }

  const deleteFunc = () => {
    localStorage.clear()
  }
  return (
    <nav
      className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
      id="layout-navbar"
    >
      <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
        {/* <a className="nav-item nav-link px-0 me-xl-4" href="/">
          <i className="bx bx-menu bx-sm"></i>
        </a> */}
      </div>

      <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
        <div className="navbar-nav align-items-center">
          <div className="nav-item d-flex align-items-center">
            <i className="bx bx-search fs-4 lh-0"></i>
            <input
              type="text"
              ref={inputRef}
              className="form-control border-0 shadow-none"
              placeholder="Поиск..."
              aria-label="Search..."
              onKeyDown={search}
            />
          </div>
        </div>

        <ul className="navbar-nav flex-row align-items-center ms-auto">
          <li className="nav-item navbar-dropdown dropdown-user dropdown">
            <a className="nav-link dropdown-toggle hide-arrow" href="/;" data-bs-toggle="dropdown">
              <div className="avatar avatar-online">
                <img src="../assets/img/avatars/1.png" alt="" className="w-px-40 h-auto rounded-circle" />
              </div>
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a className="dropdown-item" href="/">
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar avatar-online">
                        <img src="../assets/img/avatars/1.png" alt="" className="w-px-40 h-auto rounded-circle" />
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <span className="fw-semibold d-block">Keldiyor</span>
                      <small className="text-muted">администратор</small>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <div className="dropdown-divider"></div>
              </li>
              
              <li>
                <Link className="dropdown-item" to="/" onClick={() => deleteFunc()}>
                  <i className="bx bx-power-off me-2"></i>
                  <span className="align-middle">Выход</span>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar