import React, {PropTypes} from 'react';
import Fluxxor from 'fluxxor';
import styles from './style.css';

import PureRenderMixin from 'react-addons-pure-render-mixin';
let FluxMixin = Fluxxor.FluxMixin(React);
let storeWatch = Fluxxor.StoreWatchMixin;

let tripInfoPanel = React.createClass({

    mixins: [FluxMixin,
        storeWatch('tripInfoPanel'),
        PureRenderMixin],

    propTypes: {
        loadId: PropTypes.string,
    },        

    getInitialState: function () {

        var flux = this.getFlux();
        setInterval(function () {
            flux.actions.road.initial();
        }, 60000);        

        return {};
    },

    getStateFromFlux: function () {
        return this.getFlux().store('tripInfoPanel').getState();
    },

    requestPhotoClick() {
        this.getFlux().actions.tripInfoPanel.reqPhoto(this.props.loadId);
    },

    openPhotoClick(){
        const url = this.state.photoUrl;
        if(url != undefined){
            window.open(url);
        }
    },

    showContent() {
        return <div>
            <span className="contentTitle">{"Volvo FH16, м629ро86RUS"}</span><br />
            <span>{"Крапивин Ильсур Болгарович +79814424524"}</span> <br />
            <span>{"Мороженные помидоры 16т., насыпью"}</span>
        </div>;
    },

    rightWidget() {
        const widget_status = this.state.widget_photo_status;
        if (widget_status == 'initial') {
            return <div className='widget_status_1'>
                <button className='button' onClick={this.requestPhotoClick} >
                    <span className='textButton'>ЗАПРОСИТЬ ФОТО</span>
                </button>
                <div className='costTitle'>Стоимость 100 ат.</div>
            </div>
        } else if (widget_status == 'wait_photo_response') {
            return <div className='widget_status_2'>
                <span>{"Вы запросили фото"} </span><br />
                <span>{"Водитель сделает его"}</span><br />
                <span>{"на ближайшей остановке."}</span>
            </div>
        } else if (widget_status == 'can_see_photo') { 
             return <div className='widget_status_can_see'>
                 <div className='icon'></div>
                 <div className='title_widget'>
                    <span>{'Новые фото груза'}</span> <br/>
                    <span>{'12:56'}</span>
                 </div>
                <button className='btn' onClick={this.openPhotoClick} >
                    <span className='title'>ПОСМОТРЕТЬ</span>
                </button>
             </div>
        } else if (widget_status == 'end') {
            return <div>
                <div className='widget_status_end_left_part'>
                    <span>{"Выехал"} </span><br />
                    <span>{"Прибыл"}</span><br />
                    <span>{"Путь"}</span>
                </div>
                <div className='widget_status_end_right_part'>
                    <span>{"12:56 21.02.2017"} </span><br />
                    <span>{"15:32 22.02.2017"}</span><br />
                    <span>{"3 112 км за 26 ч, 32 км/ч"}</span>
                </div>
            </div>
        }
        return <div></div>
    },

    render: function () {
        return (
            <div className='panel'>
                <div className='icon ic_car'></div>
                <div className='content'>{this.showContent()}</div>
                <div className='right'>
                    {this.rightWidget()}
                </div>
                
            </div>);
    },
});

export default tripInfoPanel;