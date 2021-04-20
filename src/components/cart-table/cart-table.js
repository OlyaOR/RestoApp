import React, {Component} from 'react';
import { connect } from 'react-redux';
import {deleteFromCart, generateOrder, deleteCart, getOrderId, restart} from '../../actions';
import WithRestoService from '../hoc';

import './cart-table.scss';

class CartTable extends Component {
    componentDidMount() {
        const {RestoService} = this.props;
        RestoService.getOrderNumber()
            .then(res => this.props.getOrderId(res))
            .catch(error => this.props.menuError())
    }
    render() {
        const {items, RestoService, deleteFromCart, deleteCart, isNumber, orderNum, restart} = this.props;
        if (items.length === 0 && !isNumber) {
            return (
                <div className="cart__title">Пока тут ничего нет. Пожалуйста перейдите в меню и сделайте свой выбор.</div>
            )
        };
        if (isNumber) {
            return (
                <div className="cart__answer">
                    <div className="cart__answer-title">Спасибо за Ваш выбор. <br/> Номер заказа {orderNum}.</div>
                    <div onClick = {() => restart()} className="cart__close">&times;</div>
                </div>
            )
        };
        return (
            <>
                <div className="cart__title">Ваш заказ:</div>
                    <div className="cart__list">
                    {
                        items.map( item => {
                            const {price, title, url, id, qtt} = item;
                            return (
                                <div key = {id} className="cart__item">
                                    <img src={url} className="cart__item-img" alt={title}></img>
                                    <div className="cart__item-title">{title}</div>
                                    <div className="cart__item-price">{price * qtt}$</div>
                                    <div className="cart__item-qtt">X{qtt}</div>
                                    <div onClick = {() => deleteFromCart(id)} className="cart__close">&times;</div>
                                </div>
                            );
                        })
                    }
                    </div>
                    <button onClick = {() => deleteCart(RestoService.setOrder(generateOrder(items)))} className="cart__item-btn">Make Order</button>
            </>
        )
    }
};


const mapDispatchToProps = {
    deleteFromCart,
    generateOrder,
    deleteCart,
    getOrderId,
    restart
}
const mapStateToProps = ({items, isNumber, orderNum}) => {
    return{
        items,
        isNumber,
        orderNum
    }
};

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CartTable));
