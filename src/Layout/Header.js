import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Lichtruc from '../Component/Lichtruc'

export default class Header extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-light bg-light.bg-gradient">
                    <div className="container-fluid">
                        <a className="navbar-brand"> <i className="fas fa-fan"></i>Nhà máy Điện gió Tân Ân 1</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarID"
                            aria-controls="navbarID" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <Link to="/Danhsach">
                            Danh sach
                        </Link>
                        {/* <a href="/Lichtruc">Lịch trực </a>
                        <a href="/">Chấm công </a> */}
                    </div>
                </nav>
            </div>
        )
    }
}

