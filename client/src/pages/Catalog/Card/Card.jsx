import React, { useState, memo }from 'react'
import s from "./Card.module.css"
import { REACT_APP_SERVER_URL } from "../../../config";
import { useDispatch, useSelector} from "react-redux";
import { addFavorite, removeFavorite} from "../../../redux/slices/favorite";
import {addInCart, plusOne} from "../../../redux/slices/cart";
import { FaHeart } from "react-icons/fa";


const Card = ({item, sizes, favorites, cartProducts, setIsOpenModal}) => {

  //выбранный рамер
  const [selectSize, setSelectSize] = useState({})

  const isAuth = useSelector(state => state.auth.isAuth)

  const dispatch = useDispatch()

  
  const isFavorite = (id)=>{
    return favorites.some((favorite) =>favorite.idproduct === id)
  }

  const addHeart = (e)=>{
    let currentCard = e.target.closest(`.${s.card}`)
    const idProduct = currentCard.getAttribute("id")

    dispatch(addFavorite({
      idProduct
    }))
  }

  const removeHeart = (e)=>{
    let currentCard = e.target.closest(`.${s.card}`)
    const idProduct = currentCard.getAttribute("id")
    const currentFavorite = favorites.filter(item => item.idproduct === Number(idProduct))
    dispatch(removeFavorite({
      id: currentFavorite[0].id
    }))
  }
  

  //добавление в корзину товара
  const addCart = (idProduct) => {
    if(!selectSize[idProduct]){
      setIsOpenModal(true)
      document.body.classList.add('modal-open');
      return
    }


    if(isAuth){
      //Проерка, имеется ли уже такой товар в корзине
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
    }else{

      console.log("dd")
        const localCart = JSON.parse(localStorage.getItem("localCart"))
        let isHaveCartProduct = localCart.some(product=>product.idProduct === idProduct && product.idSize === selectSize[idProduct])
        if(isHaveCartProduct){

          localStorage?.setItem("localCart", JSON.stringify([...localCart.map(elem=>{
            if(elem.idProduct === idProduct && elem.idSize === selectSize[idProduct]){
              return {...elem, currentQuantity: elem.currentQuantity+=1}
            }
              return elem
          })]))

        }else{
          const idSize = selectSize[idProduct]
          const newCartProduct ={
            idProduct, 
            idSize,
            currentQuantity:1
          }
          localStorage.setItem("localCart", JSON.stringify([...localCart, newCartProduct]))
        }
    }

  } 


  const handlerSelectSize=(idProduct, idSize)=>{
    setSelectSize(prev=>{
      return{
        ...prev,
        [idProduct]: idSize
      }
    })
  }


  return (
    <div className={s.card}   id={item.id}>
        <img src={`${REACT_APP_SERVER_URL}${item.imagepath}`} alt={item.nameproduct} className={s.img_product} />
        <span className={s.name}>{item.nameproduct}</span>
        <div className={s.sizes}>
        {sizes.length && sizes.map(({id, name, price})=>(
            <div className={`${s.size} ${selectSize[item.id] === id && s.size_select}`} id={id} key={id} onClick={()=>handlerSelectSize(item.id, id)}>
              <span className={s.size_name}>{name}</span>
              <span className={s.price}>{price}руб.</span>
            </div>
        ))}
        </div>
        <div className={s.btns}>
            <button className={s.btn_catalog} onClick={()=> addCart(item.id)}> Добавить</button>
            {isAuth? 
            isFavorite(item.id) ? 
            <div onClick={removeHeart}><FaHeart className={s.icon_heart} style={{fill: "red"}} /></div> : 
            <div onClick={addHeart}><FaHeart className={s.icon_heart}  /></div> 
            : <></>}
        </div>
    </div>
  )
}

export default memo(Card)