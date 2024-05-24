import React, {useState} from 'react'
import s from "../../Catalog/Card/Card.module.css";
import style from "../Favorites.module.css"
import { REACT_APP_SERVER_URL } from "../../../config";
import { FaHeart } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { removeFavorite } from "../../../redux/slices/favorite";
import {addInCart, plusOne} from "../../../redux/slices/cart";


const Card = ({item, sizes, cartProducts, setIsOpenModal}) => {
    //выбранный рамер
    const [selectSize, setSelectSize] = useState({})

    const dispatch = useDispatch()

    const removeHeart = (e)=> {
        let currentCard = e.target.closest(`.${s.card}`)
        const idFavorite = currentCard.getAttribute("id")
        dispatch(removeFavorite({id: idFavorite}))
    } 

    const handlerSelectSize=(idProduct, idSize)=>{
        setSelectSize(prev=>{
            return{
                ...prev,
                [idProduct]: idSize
            }
        })
    }

    //добавление в корзину товара
  const addCart = (idProduct) => {
 
    if(!selectSize[idProduct]){
      setIsOpenModal(true)
      document.body.classList.add('modal-open');
      return
    }

    if(cartProducts.some(({idproduct, idsize})=> idproduct === idProduct && idsize === selectSize[idProduct])) {
      const {id, quantity} = cartProducts.filter(({idproduct, idsize}) => idproduct === idProduct && idsize === selectSize[idProduct])[0]
      dispatch(plusOne({
        idCart: id,
        quantity
      }))
      console.log(id)
    }else{
      dispatch(addInCart({
        idProduct,
        idSize: selectSize[idProduct]
      }))
      
    }
  }


  return (
    <div className={`${s.card} ${style.card_favorite}`} id={item.id} >
        <img src={`${REACT_APP_SERVER_URL}${item.imagepath}`} alt={item.nameproduct} className={s.img_product} />
        <span className={s.name}>{item.nameproduct}</span>
        <div className={s.sizes}>
        {sizes.length && sizes.map(({id, name, price})=>(
            <div className={`${s.size} ${selectSize[item.idproduct] === id && s.size_select}`} id={id} key={id} onClick={()=>handlerSelectSize(item.idproduct, id)}>
              <span className={s.size_name}>{name}</span>
              <span className={s.price}>{price}руб.</span>
            </div>
        ))}
        </div>
        <div className={s.btns}>
        <button className={s.btn_catalog} onClick={()=> addCart(item.idproduct)}> Добавить</button>
            <div className={style.heart} onClick={removeHeart}>
            <FaHeart className={style.icon_heart}  />
            </div>
        </div>
    </div>
  )
}

export default Card