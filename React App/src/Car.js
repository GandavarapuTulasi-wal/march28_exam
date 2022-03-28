import axios from 'axios';
import { useEffect, useState } from 'react';

function Car() {
  let [cars, setCars] = useState([]);

  useEffect(() => {
    getCars();
  }, []);
  const getCars = () => {
    axios
      .get('/cars')
      .then((res) => {
        setCars(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addCar = (event) => {
    event.preventDefault();
    let carObject = {
      carname: event.target.carname.value,
      price: event.target.price.value,
      color: event.target.color.value,
      in_stock: event.target.in_stock.value,
    };
    axios
      .post('/cars', carObject)
      .then((res) => {
        getCars();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteCar = (id) => {
    axios
      .delete('/cars/' + id)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getCars();
  };
  const deleteAll = () => {
    axios.get('/cars/deleteall').then((res) => {
      console.log(res.data);
    });
    getCars();
  };
  return (
    <div className="card-container">
      <h1>Car Form</h1>
      <form onSubmit={addCar} className="box">
        <input
          type="text"
          name="carname"
          placeholder="Enter carname"
          className="todo-user-input"
        />
        <input
          type="number"
          name="price"
          placeholder="Enter Price"
          className="todo-user-input"
        />
        <select name="color" className="todo-user-input">
          <option value="black">Black</option>
          <option value="blue">Blue</option>
          <option value="glue">Grey</option>
        </select>
        <select name="in_stock" className="todo-user-input">
          <option value="1">available</option>
          <option value="0">notavailable</option>
        </select>
        <button>Add</button>
      </form>

      <button
        onClick={() => {
          deleteAll();
        }}
      >
        Delete all
      </button>
      <div>
        <h1>Cars</h1>
        {cars.map((val, index) => (
          <div>
            <div className="card">
              <h3>carname:{val.carname}</h3>
              <p>price:{val.price}</p>
              <p>color:{val.color}</p>
              <p>in_stock:{val.in_stock}</p>
              <button
                className="delete"
                onClick={() => {
                  deleteCar(val.car_id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Car;
