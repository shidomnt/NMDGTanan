import React, { Component } from 'react'

export default class Lichtruc extends Component {
    render() {
        var imgBack1 = require('../Pic/Lichtruc.jpg')
        return (
            <div style={{ textalign: "center" }}>
                <div className='row'>
                    <div className='col-2'>
                    </div>
                    <div className='col-9'>
                        <img src={imgBack1} className="d-block" alt="..." width="100%" height="350" />
                    </div>
                </div>
            </div>
        )
    }
}
