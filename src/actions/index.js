const menuLoaded = (newMenu) => {
    return {
        type: 'MENU_LOADED',
        payload: newMenu
    };
};

const menuRequested = () => {
    return {
        type: 'MENU_REQUESTED'
    };
}
const menuError = () => {
    return {
        type: 'MENU_ERROR'
    };
}
const addedToCart = (id) => {
    return {
        type: 'ITEM_ADD_TO_CART',
        payload: id
    }
}

const deleteFromCart = (id) => {
    return {
        type: 'ITEM_REMOVE_FROM_CART',
        payload: id
    }
}
const deleteCart = () => {
    const arr = [];
    return {
        type: 'ITEM_REMOVE_CART',
        payload: arr
    }
}
const generateOrder = (items) => {
    const order = items.map(item => {
        return {
            title: item.title,
            id: item.id,
            qtt: item.qtt
        }
    })
    return {
        type: 'NEW_ORDER',
        order
    }
}

export {
    menuLoaded,
    menuRequested,
    menuError,
    addedToCart,
    deleteFromCart,
    generateOrder,
    deleteCart
};