import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Overview from "./Overview";
import Transaction from "./Transaction";
import TransactionList from "./TransactionList";

const ExpenseApp = () => {
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);
  const [transaction, setTransaction] = useState([]);
  const [transactionShow, setTransactionShow] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [filteredVal, setFilteredVal] = useState([...transaction]);

  const addTransaction = (e, formValues) => {
    e.preventDefault();
    setTransaction([...transaction, formValues]);
    localStorage.setItem(
      "transaction",
      JSON.stringify([...transaction, formValues])
    );
  };
  useEffect(() => {
    if (localStorage.getItem("transaction")) {
      const getItem = JSON.parse(localStorage.getItem("transaction"));
      setTransaction(getItem);
    }
  }, []);
  useEffect(() => {
    let incomeValue = 0;
    let expenseValue = 0;
    transaction.forEach((item) => {
      if (item.type === "income") {
        incomeValue += parseInt(item.amount);
      } else if (item.type === "expense") {
        expenseValue += parseInt(item.amount);
      }
    });
    setIncome(incomeValue);
    setExpense(expenseValue);
  }, [transaction]);

  useEffect(() => {
    if (!searchVal || searchVal === "") {
      setFilteredVal(transaction);
    }
    const transactionsList = [...transaction];
    const filteredValue = transactionsList.filter((item) =>
      item.desc.toLowerCase().includes(searchVal.toLowerCase())
    );

    setFilteredVal(filteredValue);
  }, [searchVal, transaction]);
  const handleEdit = (id) => {
    filteredVal.forEach((item) => {
      if (item.edit) {
        item.edit = false;
      }
    });
    const index = transaction.findIndex((item) => item.id === id);
    const transactionItem = { ...transaction[index] };
    transactionItem.edit = !transactionItem.edit;
    const transactions = [...transaction];
    transactions[index] = transactionItem;
    setTransaction(transactions);
  };
  const submitEdit = (editItem) => {
    const index = transaction.findIndex((item) => item.id === editItem.id);
    let transactionItem = { ...transaction[index] };
    transactionItem = editItem;
    const transactions = [...transaction];
    transactions[index] = transactionItem;
    setTransaction(transactions);
    localStorage.setItem("transaction", JSON.stringify(transactions));
  };

  return (
    <div>
      <NavBar searchVal={searchVal} setSearchVal={setSearchVal} />
      <div className="App">
        <Overview
          expense={expense}
          income={income}
          transactionShow={transactionShow}
          setTransactionShow={setTransactionShow}
        />
        {transactionShow && (
          <Transaction
            addTransaction={addTransaction}
            setTransactionShow={setTransactionShow}
          />
        )}

        <TransactionList
          filteredVal={filteredVal}
          setTransaction={setTransaction}
          setFilteredVal={setFilteredVal}
          transaction={transaction}
          handleEdit={handleEdit}
          submitEdit={submitEdit}
        />
      </div>
    </div>
  );
};
export default ExpenseApp;
