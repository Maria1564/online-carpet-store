import React, {useState, useEffect} from "react";
import s from "./Catalog.module.css";
import Wrapper from "../../layouts/Wrapper/Wrapper";
import axios from '../../axios'
import {useDispatch, useSelector } from "react-redux";
import {  getFavorites } from "../../redux/slices/favorite";
import { getAllCart} from "../../redux/slices/cart";
import Card from "./Card/Card";
import { ModalWindow } from "../../components/ui";

const Catalog = () => {

    const [products,setProducts] = useState([])
    const [sizes, setSizes] = useState([])
    const [searchQuery,setSearchQuery] = useState("")
    const [searchProducts, setSearchProducts] = useState(null)
    const [isOpenModal, setIsOpenModal] = useState(false)
    
    const [limitProducts,setLimitProducts] = useState([])
    
    const dispatch = useDispatch()
    
    const favorites = useSelector(state => state.favorites.favoriteProducts);
    const cartProducts = useSelector(state => state.cart.products);

   
    
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

  return (
    <>
      <Wrapper text="Каталог" />
      <section>
        <div className="container">
          <div className={s.search}>
            <input type="text" className={s.inp_query} value={searchQuery} onChange={(e)=> setSearchQuery(e.target.value)}  onInput={(e)=>handlerInp(e)} placeholder="поиск..."/>
            <button className={s.btn} onClick={onSearchProducts}>Найти</button>
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
      </section>
    </>
  );
};

export default Catalog;
