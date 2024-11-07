import './add.scss'
import { form } from "./fieldFormData";

export default function Add( props ) {

    const handleSubmit = (e) => {
        e.preventDefault();
        //Добавляем нового пользователя
        props.setOpen(false)
      };


      //{props.columns
        //.filter((item) => item.field !== "id" && item.field !== "img")
        //.map((column) => (
        //  <div className="item">
        //    <label>{column.headerName}</label>
        //    <input type={column.type} placeholder={column.field} />
        //  </div>
        //))}

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Создание {props.slug}</h1>
        <form onSubmit={handleSubmit}>
            <div className="item">
                <label>Имя</label>
                <input type='text' placeholder='Имя' />
            </div>
            <div className="item">
                <label>Фамилия</label>
                <input type='text' placeholder='Фамилия' />
            </div>
            <div className="item">
                <label>Почта</label>
                <input type='text' placeholder='Почта' />
            </div>
            <div className="item">
                <label>Роль</label>
                <input type='text' placeholder='Роль' />
            </div>
            <button>Создать</button>
        </form>
      </div>
    </div>
  )
}
