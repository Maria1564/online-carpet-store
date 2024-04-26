import React from 'react'
import s from "./Footer.module.css"

import vk from "../../assets/img/footer/vk.svg"
import telegram from "../../assets/img/footer/telegram.svg"
import facebook from "../../assets/img/footer/facebook.svg"



const Footer = () => {
  return (
    <footer>
        <div className={s.wrapper}>
          <div className={s.contacts}>
            <span>Наши контакты</span>
            <ul>
              <li><a href="#" className={s.item_list}>+7(800)555-35-35</a></li>
              <li><a href="#" className={s.item_list}>fastTafting@yndex.ru</a></li>
            </ul>
          </div>
          <p className={s.text}>FastTafting</p>
          <div className={s.follow}>
            <span>Мы в соц сетях</span>
            <div className={s.social_networks}>
              <a href="#">  
                <img src={vk} alt="vk" width="35" height="35"/>
              </a>
              <a href="#">
                <img src={telegram} alt="telegram" width="35" height="35"/>
              </a>
              <a href="#">
                <img src={facebook} alt="facebook" width="35" height="35"/>
              </a>
            </div>
          </div>
          
        </div>
        <span className={s.privacy_policy}>©2024г. Все права защищены</span>
    </footer>
  )
}

export default Footer