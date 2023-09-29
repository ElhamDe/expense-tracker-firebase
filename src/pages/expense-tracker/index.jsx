import { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction"
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { Navigate, useNavigate } from "react-router-dom";
import "./styles.css";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";

export const ExpenseTracker = () => {
    const { addTransaction } = useAddTransaction();
    const { transactions, transactionTotal } = useGetTransactions();
    const { name, profilePhoto, isAuth } = useGetUserInfo();
    const navigate = useNavigate();

    const [description, setDescription] = useState("");
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [transactionType, setTransactionType] = useState("expense");

    const {balance, income, expenses} = transactionTotal;

    const onSubmit = (e) => {
        e.preventDefault();
        addTransaction({
            description,
            transactionAmount, 
            transactionType
        });
        
        setDescription("");
        setTransactionAmount("");
    }

    const singUserOut = async () => {
        try {
            await signOut(auth);
            localStorage.clear()
            navigate("/")
        } catch (err) {
            console.log(err);
        }
    };

    if(!isAuth) {
        return <Navigate to="/" />
    };

    return (
        <>
            <div className="expense-tracker">
                <div className="container">
                    <h1> {name} - Hyrje Daljet </h1>
                    <div className="balance">
                        <h3> Balanca Juaj </h3>
                        {balance >=0 ? <h2> €{balance}</h2> : <h2> -€{balance* -1}</h2>}
                    </div>
                    <div className="summary"> 
                        <div className="income">
                            <h4> Hyrat</h4>
                            <p> €{income}</p>
                        </div>
                        <div className="expense">
                            <h4> Shpenzime</h4>
                            <p> €{expenses}</p>
                        </div>
                    </div>
                    <form className="add-transaction" onSubmit={onSubmit}>
                        <input 
                            type="text" 
                            placeholder="Përshkrim" 
                            value={description}
                            required
                            onChange={(e) => setDescription(e.target.value)} 
                        />
                        <input 
                            type="number" 
                            placeholder="Shuma" 
                            value={transactionAmount}
                            required
                            onChange={(e) => setTransactionAmount(e.target.value)} 
                        />
                        <input 
                            type="radio" 
                            id="expense" 
                            value="expense" 
                            checked={transactionType === "expense"}
                            onChange={(e) => setTransactionType(e.target.value)} 
                        />
                        <lable htmlFor="expense"> Shpenzime</lable>
                        <input 
                            type="radio" 
                            id="income" 
                            value="income" 
                            checked={transactionType === "income"}
                            onChange={(e) => setTransactionType(e.target.value)} 
                        />
                        <lable htmlFor="income"> Fitime</lable>

                        <button className="form-btn"> Shto Transaksion</button>
                    </form>
                </div>  
                {profilePhoto && (
                    <div className="profile">
                        {" "}
                        <img className="profile-photo" src ={profilePhoto} />
                        <button className="sign-out-button" onClick={singUserOut}>
                            Dil
                        </button>
                    </div>
                )}  
            </div>
            <div className="transactions">
                <h3> Transaction </h3>
                <ul>
                    {transactions.map((transaction) => {
                        const {description, transactionAmount, transactionType} = transaction;

                        return (
                            <li>
                                <h4> {description} </h4>
                                <p> 
                                    €{transactionAmount} • <label style={{color: transactionType === "expense" ? "red" : "green"}}> {transactionType} </label> 
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    )
}