import { useState } from "react"
import './Transaction.css'
const Transaction=({addTransaction,setTransactionShow})=>{
const[formValues,setFormValues]=useState({type:'expense',desc:'',amount:0,edit:false})
const formHandler=(e)=>{

    setFormValues({...formValues,[e.target.name]:e.target.value,id:Date.now()});
    
}
const submitForm=(e)=>{
    e.preventDefault()
    if (formValues.desc ===''){
        alert('Please add some description')
        return
    }
    setTransactionShow(prevState=>!prevState)
    addTransaction(e,formValues)
    setFormValues({type:'expense',desc:'',amount:0})
}
    return(
        <form onSubmit={submitForm} className="transaction">
            <div className="inputs-amount">
                <input type='text' name="desc" onChange={formHandler} value={formValues.desc} placeholder='Description'/>
                <input type='number' name="amount"  onChange={formHandler} value={formValues.amount}/>
            </div>
            <div className="radio-type">
                <div className={formValues.type==='expense' ? "radio-button-exp":"radio-button"}>
                <input type='radio' name="type" value='expense' checked={formValues.type ==='expense'} onChange={formHandler} id='expense'/>
                <label htmlFor="expense">Expense</label>
                </div>
                <div className={formValues.type==='income' ? "radio-button-inc":"radio-button"}>
                <input type='radio' name="type" value='income' checked={formValues.type ==='income'} onChange={formHandler} id='income'/>
                <label htmlFor="income">Income</label>
                </div>

            </div>
            <button type="submit" className="transaction-button">Transaction</button>
        </form>
    )
    }
export default Transaction