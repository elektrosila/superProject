import { useEffect } from "react";
import { Link } from "react-router";

export default function CreatePartner() {
  useEffect(() => { document.title = 'Создать партнера' }, []);

  async function submitHandler(e) {
    e.preventDefault();
    const partner = {
      type: e.target.type.value,
      name: e.target.name.value,
      ceo: e.target.ceo.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
      rating: e.target.rating.value
    };
    await window.api.createPartner(partner);
    document.querySelector('form').reset();
  }

  return (
    <div className="form">
      <Link to={'/'}>
        <button className="btn-back">{"Назад"}</button>
      </Link>

      <h1>Создать партнера</h1>

      <form onSubmit={(e) => submitHandler(e)}>
        <div className="input-group">
          <label htmlFor="name">Наименование:</label>
          <input id="name" type="text" required />
        </div>

        <div className="input-group">
          <label htmlFor="type">Тип партнера:</label>
          <select id="type" required>
            <option value="ЗАО">ЗАО</option>
            <option value="ООО">ООО</option>
            <option value="ОАО">ОАО</option>
            <option value="ПАО">ПАО</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="rating">Рейтинг:</label>
          <input id="rating" type="number" step="1" min="0" max="100" required />
        </div>

        <div className="input-group">
          <label htmlFor="address">Адрес:</label>
          <input id="address" type="text" required />
        </div>

        <div className="input-group">
          <label htmlFor="ceo">ФИО директора:</label>
          <input id="ceo" type="text" required />
        </div>

        <div className="input-group">
          <label htmlFor="phone">Телефон:</label>
          <input id="phone" type="tel" required />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email компании:</label>
          <input id="email" type="email" required />
        </div>

        <button type="submit" className="button-submit">Создать партнера</button>
      </form>
    </div>
  );
}
