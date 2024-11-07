import './add.scss'
import { formAddGroup } from "./fieldFormData";

export default function AddGroup ( props ) {

    const handleSubmit = (e) => {
        e.preventDefault();
        //Добавляем новую группу
        props.setOpen(false)
      };


  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpenModal(false)}>
          X
        </span>
        <h1>Создание {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {formAddGroup.map((item) => (
            <div className="item" key={item.id}>
                <label>{item.label}</label>
                <input type={item.inputType} placeholder={item.placeholder} />
            </div>
          ))}
            <button>Создать</button>
        </form>
      </div>
    </div>
  )
}
