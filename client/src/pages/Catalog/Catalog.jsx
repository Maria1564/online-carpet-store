import React, {useState, useEffect} from "react";
import s from "./Catalog.module.css";
import Wrapper from "../../layouts/Wrapper/Wrapper";
import axios from '../../axios'
import {useDispatch, useSelector } from "react-redux";
import {  getFavorites } from "../../redux/slices/favorite";
import { getAllCart} from "../../redux/slices/cart";
import Card from "./Card/Card";
import { ModalWindow } from "../../components/ui";
import { MdModeEditOutline } from "react-icons/md";

const Catalog = () => {

    const [products,setProducts] = useState([])
    const [sizes, setSizes] = useState([])
    const [searchQuery,setSearchQuery] = useState("")
    const [searchProducts, setSearchProducts] = useState(null)
    const [isOpenModal, setIsOpenModal] = useState(false)

    //модалка для редактирования выбранной цены
    const [isOpenModalEdit, setIsOpenModalEdit] = useState(false)
    const [newPrice, setNewPrice] = useState({id:null, value: ""})
    const [isError, setIsError] = useState("")

    
    const [limitProducts,setLimitProducts] = useState([])
    
    const dispatch = useDispatch()
    
    const favorites = useSelector(state => state.favorites.favoriteProducts);
    const cartProducts = useSelector(state => state.cart.products);
    const isAdmin = useSelector(state=> state.auth.infoUser?.isadmin) 
    
    useEffect(() => {
      axios.get("/products").then(({ data }) => {
          setProducts(data)
          if (data.length) {
              axios.get("/sizes").then(({ data }) => setSizes(data))
          }
          
      })
  }, []);
  
  useEffect(() => {
      dispatch(getFavorites());
      dispatch(getAllCart());
  }, [dispatch]);
  

  useEffect(()=>{
    setLimitProducts(prev=>{
      return[...products.slice(limitProducts.length, limitProducts.length+4 )]
    } )
  }, [products])


  
  const onSearchProducts= ()=>{
    if(searchQuery.trim() === ""){
      setSearchProducts(null)
    }else{
      let filteredProducts = products.filter(product=>product.nameproduct.toLowerCase().includes(searchQuery.trim().toLowerCase()))
      console.log(filteredProducts)

      setSearchProducts(filteredProducts)
      
    } 

  }

  const handlerInp =  (e)=>{
    if(e.target.value.trim() === ""){
      setSearchProducts(null)
    }else{
      let filteredProducts = products.filter(product=>product.nameproduct.toLowerCase().includes(e.target.value.trim().toLowerCase()))  
      setSearchProducts(filteredProducts)
      
    } 
  }

    
  const closeModal = ()=>{
    setIsOpenModal(false)
    document.body.classList.remove('modal-open');
  } 

  //редактирование цены
  const changeSelectPrice = async()=> {
      console.log(newPrice)
      const {id: idSize, value} = newPrice
      if(isNaN(Number(value))){
        return setIsError("Введите валидную цену")
      }else if (Number(value) < 800){
        return setIsError("цена не может быть меньше 800 руб.")
      }else{
        setIsError("")
      }
    const {data} = await axios.patch("/sizes", {idSize, newPrice: value})
 
    setSizes(prev=>{
      console.log(...prev)
      return [
        ...prev.map(elem=> {
          if (elem.id === data.id){
            console.log(elem, data)
           return  {...elem, price: data.price}
          }
          return elem
        }),
      ]
    })

    setIsOpenModalEdit(false)
    document.body.classList.remove('modal-open');   
  }

  return (
    <>
      <Wrapper text="Каталог" />
      <section>
        <div className="container">
        <div className={s.top_panel}>
          <div className={s.search}>
            <input type="text" className={s.inp_query} value={searchQuery} onChange={(e)=> setSearchQuery(e.target.value)}  onInput={(e)=>handlerInp(e)} placeholder="поиск..."/>
            <button className={s.btn} onClick={onSearchProducts}>Найти</button>
          </div>

          {isAdmin && <div className={s.settings_price}>
            <div>
            <h2>Цены:</h2>
            <p>(для редактирования)</p>
            </div>
            <div className={s.prices}>
              {sizes?.map(elem=>(
                <div className={s.box_price} key={elem.id}>
                  <div className={s.edit} onClick={()=> {
                    setIsOpenModalEdit(true)
                    setNewPrice(prev=>({...prev, id: elem.id}))
                    document.body.classList.add('modal-open');
                  }}>
                    <MdModeEditOutline className={s.icon_pen}/>
                  </div>
                  <span className={s.price}>{elem.price} руб.</span>
                  <span className={s.size}>{elem.name}</span>
                </div>
              ))}
            </div>
          </div>}
        </div>

          <div className={s.cards}>
            {(Array.isArray(searchProducts) ? searchProducts : limitProducts).map(item => 
            <Card key={item.id} item={item} sizes={sizes} favorites={favorites} cartProducts={cartProducts} setIsOpenModal={setIsOpenModal}/>
            )}
          </div>
       
         {(searchProducts === null && limitProducts.length !== products.length) && 
         <button className={`btn ${s.btn_again}`}  
            onClick={()=>setLimitProducts(prev=>[...prev, ...products.slice(limitProducts.length, limitProducts.length+4)])}>
            Показать ещё
          </button>} 
        </div>
        {isOpenModal && 
          <ModalWindow>
              <h2>Не выбран размер коврика</h2>
              <button className={s.btn} onClick={closeModal}>Ок</button>
          </ModalWindow>}

        {isOpenModalEdit && 
          <ModalWindow>
              <h2>Изменить цену</h2>

              <label>
                Изменть на: <input className={s.input_edit} type="text" required maxLength="5" minLength="3" 
                placeholder="новоя цена" value={newPrice.newPrice} onInput={(e)=>setNewPrice(prev=>({...prev, value: e.target.value}))}/>
              </label>
              <div className={s.wrapper_error}>
                    {isError && <span className={s.error}>{isError}</span>}
                </div>
              <button onClick={changeSelectPrice}>Ок</button>
          </ModalWindow>}
      </section>
    </>
  );
};

export default Catalog;
