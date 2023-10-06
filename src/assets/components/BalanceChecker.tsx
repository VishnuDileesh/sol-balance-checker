import { useState } from "react";
import * as web3 from '@solana/web3.js';


export const BalanceChecker = () => {

    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const [isDataLoading, setIsDataLoading] = useState(false);

    const [solAddress, setSolAddress] = useState('');

    const [solBalance, setSolBalance] = useState(0);

    const [isAccountExecutable, setIsAccountExecutable] = useState(false);

    async function handleSubmit(e: any) {
        e.preventDefault();

        try {




            setIsDataLoading(true);

            const key = new web3.PublicKey(solAddress);
            const connection = new web3.Connection(web3.clusterApiUrl('devnet'));

            const balance = await connection.getBalance(key);

            const accountInfo = await connection.getAccountInfo(key);

            setIsDataLoading(false);

            setIsDataLoaded(true);

            console.log(accountInfo?.executable);

            setSolBalance(balance / web3.LAMPORTS_PER_SOL);

            if (accountInfo?.executable) {
                setIsAccountExecutable(true);
            }

        } catch (err) {
            setSolAddress('');
            setSolBalance(0);
            console.log(err);
        }
    }


    const handleReset = () => {
        setIsAccountExecutable(false);
        setIsDataLoaded(false);
        setIsDataLoading(false);
        setSolAddress('');
        setSolBalance(0);
    }


    return (
        <div>
            <form method="post" onSubmit={handleSubmit} className="form">
                <div className="form-control">
                    <label htmlFor="sol">Solana Address </label> <br />
                    <input value={solAddress} onChange={e => setSolAddress(e.target.value)} type="text" id="sol" placeholder="Enter Address" />
                </div>
                <br />
                <button type="submit">Check Value</button>
            </form>
            <br />
            <br />
            <hr></hr>
            <h1>Sol Balance: {solBalance}</h1>
            {isDataLoaded && <h3 >Account Executable? : {isAccountExecutable ? <span>Yes</span> : <span>No</span>}</h3>}

            {isDataLoading && <progress id="progress-bar"></progress>}

            <hr />
            {isDataLoaded && <button onClick={handleReset} type="button">Reset</button>}
        </div>

    );
}

