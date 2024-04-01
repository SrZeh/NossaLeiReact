import React, { useState } from "react";
import Table from "./Table";
import PopupForm from "./PopupForm";




const OpenPopup = () => {
    const [selectedId, setSelectedId] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const openPopup = (id) => {
        setSelectedId(leiId);
        setShowPopup(true);
    };

    const closePopup = () => {
        setSelectedId(null);
        setShowPopup(false);
    };

    return (
        <div>
            <Table openPopup={openPopup} />
            {showPopup && (<PopupForm leiId={selectedId} closePopup={closePopup} />)}
        </div>
    );
};



export default OpenPopup;
