import { splitNum } from "../utils/utils";

import { BiTrash } from "react-icons/bi";
import { BiEdit } from "react-icons/bi";
import { useState } from "react";
import "./TransactionList.css";
const TransactionList = ({
  filteredVal,
  setTransaction,
  setFilteredVal,
  transaction,
  handleEdit,
  submitEdit,
}) => {
  const [edit, setEdit] = useState();
  const deleteHandler = (id) => {
    const filteredList = transaction.filter((item) => item.id !== id);
    setTransaction(filteredList);
    setFilteredVal(filteredList);
    localStorage.setItem("transaction", JSON.stringify(filteredList));
  };
  const editHandler = (id) => {
    handleEdit(id);
    const transactionIndex = transaction.findIndex((item) => item.id === id);
    const transactionEdit = transaction[transactionIndex];

    setEdit(transactionEdit);
  };
  const handleSubmit = () => {
    submitEdit(edit);
  };
  const handleChange = (e) => {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  };
  return (
    <div>
      {filteredVal.length ? (
        <div className="transaction-list">
          {filteredVal.map((item) => {
            return (
              <div className="transaction-list-container" key={item.id}>
                {!item.edit ? (
                  <h3>{item.desc}</h3>
                ) : (
                  <input
                    type="text"
                    className="edit-input edit-input-1"
                    value={edit.desc}
                    onChange={handleChange}
                    name="desc"
                  />
                )}

                {!item.edit ? (
                  <p className="amount-val">
                    {splitNum(parseFloat(item.amount))} $
                  </p>
                ) : (
                  <input
                    type="number"
                    className="edit-input edit-input-2"
                    value={edit.amount}
                    onChange={handleChange}
                    name="amount"
                  />
                )}
                <p className="amount-type">{item.type}</p>
                <BiTrash
                  className="trash"
                  onClick={() => deleteHandler(item.id)}
                />
                {!item.edit && (
                  <BiEdit
                    className="edit"
                    onClick={() => editHandler(item.id)}
                  />
                )}
                {item.edit && (
                  <button
                    type="submit"
                    className="update-button"
                    onClick={handleSubmit}
                  >
                    Update
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
export default TransactionList;
