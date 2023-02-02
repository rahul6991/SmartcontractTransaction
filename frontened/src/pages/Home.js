import React, { useEffect, useState, useContext } from "react";
import Web3 from "web3";
import ColumnGroupingTable from './../components/table';
import UpdateModal from './../components/updateModal'
import { ABI, CONTRACT } from '../helpers';
import './Home.css'
import { useWeb3Context } from "../context/contractContext";
import Header from "../components/header";


function Home() {
    const [modal, handleModal] = useState(null);

   

    return (
        <div>
            <div className="header">
                <Header />
            </div>
            <div className="center-div">
                <ColumnGroupingTable handleModal={handleModal} />
                {modal && <UpdateModal message={modal} handleModal={handleModal} />}
            </div>
        </div>
    );
}

export default Home;

