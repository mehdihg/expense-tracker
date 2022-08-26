import { splitNum } from "../utils/utils";
import "./Overview.css";
const Overview = ({ expense, income, setTransactionShow, transactionShow }) => {
  return (
    <div>
      <div className="balance">
        <h4>Balance: {splitNum(income - expense)} $</h4>
        <button
          onClick={() => setTransactionShow((prevState) => !prevState)}
          className={transactionShow ? "cancel-button" : "add-button"}
        >
          {transactionShow ? "Cancel" : "Add"}
        </button>
      </div>
      <div className="overall-details">
        <div>
          <p>Expense: {splitNum(expense)} $</p>
          <p>Income: {splitNum(income)} $</p>
        </div>
      </div>
    </div>
  );
};
export default Overview;
