import React from 'react'
import TeamItems from "../../Home/HomeAbout/TeamItems/TeamItems";
import s from "./Team.module.css"
import { team } from '../../../helpers/data';


const Team = () => {
  return (
    <section className={s.team_section}>
      <div className="container">
        <div className="wrapper">
          <h2>Наша команда</h2>
          <div className={s.team}>
            {team.map(({id, src, alt}) => (
              <TeamItems key={id} src={src} alt={alt} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Team