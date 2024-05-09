import React, { useEffect, useState }from 'react'
import s from "./Card.module.css"
import { REACT_APP_SERVER_URL } from "../../../config";
import { useDispatch } from "react-redux";
import { addFavorite, removeFavorite} from "../../../redux/slices/favorite";
import { FaHeart } from "react-icons/fa";


const Card = ({item, sizes, favorites}) => {
   

    //выбранный рамер
    const [selectSize,setSelectSize] = useState({})
    
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
    
    const addCart = (idProduct, event) => {
      // if(cartProducts.some(({idproduct, idsize})=> idproduct === idProduct && idsize === idSize)) {
      //   console.log("+1")
      // }else{
      //   console.log("Добавить в корзину")
      // }
      console.log("idProduct >> ", idProduct)
      console.log("event >> ", event.target.closest(`.${s.cards}`))
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
            <div className={`${s.size} ${selectSize[item.id] === id && s.size_select}`} key={id} onClick={()=>handlerSelectSize(item.id, id)}>
            <span className={s.size_name}>{name}</span>
            <span className={s.price}>{price}руб.</span>
            </div>
        ))}
        </div>
        <div className={s.btns}>
            <button className={s.btn_catalog} onClick={(event)=> addCart(item.id, event)}> Добавить</button>
            {isFavorite(item.id) ? 
            <div onClick={removeHeart}><FaHeart className={s.icon_heart} style={{fill: "red"}} /></div> : 
            <div onClick={addHeart}><FaHeart className={s.icon_heart}  /></div> }
        </div>
    </div>
  )
}

export default Card