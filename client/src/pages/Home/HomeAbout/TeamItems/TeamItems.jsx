import React from "react";
import s from "./TeamItems.module.css"
import { Avatar } from "../../../../components/ui";


const TeamItems = ({src, alt }) => {
  return (
    <div className={s.item}>
      <Avatar src={src} alt={alt} />
      <p className={s.name}>{alt}</p>
    </div>
  );
};

export default TeamItems;
