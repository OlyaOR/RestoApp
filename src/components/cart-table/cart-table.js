import React, {Component} from 'react';
import { connect } from 'react-redux';
import {deleteFromCart, generateOrder, deleteCart} from '../../actions';
import WithRestoService from '../hoc';

import './cart-table.scss';

class CartTable extends Component {
    render() {
        const {items, RestoService, deleteFromCart, deleteCart} = this.props;

        if (items.length === 0) {
            return (
                <>
                    <div className="cart__title">Пока тут ничего нет. Пожалуйста перейдите в меню и сделайте свой выбор.</div>
                    {/* <div className="cart__answer">Ваш заказ ...</div> */}
                </>
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
                                    <div onClick = {() => deleteFromCart(id)}className="cart__close">&times;</div>
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
    deleteCart

}

const mapStateToProps = ({items}) => {
    return{
        items 
    }
};

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CartTable));
