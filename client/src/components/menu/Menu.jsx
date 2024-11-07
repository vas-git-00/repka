import './menu.scss'
import { NavLink } from "react-router-dom";
import { menu } from "./menuData";

export default function Menu() {
    
  return (
    <div className="menu">
      {menu.map((item) => (
        <div className="item" key={item.id}>
          <span className="title">{item.title}</span>
          {item.listItems.map((listItem) => (
            <NavLink to={listItem.url} className="listItem" key={listItem.id}>
              <img src={listItem.icon} alt="" /> 
              <span className="listItemTitle">{listItem.title}</span>
            </NavLink>
          ))}
        </div>
      ))}
    </div>
  )
}
