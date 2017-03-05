import React from 'react';
import Fluxxor from 'fluxxor';
import styles from './style.css';

let FluxMixin = Fluxxor.FluxMixin(React);

let tripInfoPanel = React.createClass({

    requestPhotoClick() {
        console.log("hello requestPhotoClick");
    },

    showContent() {
        return <div>
            <span className="contentTitle">{"Volvo FH16, м629ро86RUS"}</span><br />
            <span>{"Крапивин Ильсур Болгарович +79814424524"}</span> <br />
            <span>{"Мороженные помидоры 16т., насыпью"}</span>
        </div>;
    },

    rightWidget(){
        
    },

    render: function () {
        const content = this.showContent();
        return (
            <div className='panel'>
                <div className='icon ic_car'></div>

                <div className='content'>{content}</div>
                <div className='right'>
                    <button className='button' onClick={this.requestPhotoClick} >
                        <span className='textButton'>ЗАПРОСИТЬ ФОТО</span>
                    </button>
                    <div className='costTitle'>Стоимость 100 ат.</div>
                </div>
            </div>);
    },
});

export default tripInfoPanel;