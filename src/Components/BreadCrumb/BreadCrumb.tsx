import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCaretRight, faSearch } from "@fortawesome/free-solid-svg-icons";
import "./BreadCrumb.scss";
import { BreadCrumbType } from "../../types/breadCrumb";
import i18n from "../../i18n";

export function BreadCrumb({ itens }: any) {
    
    let query = new URLSearchParams(useLocation().search);
    const [brand, setBrand] = useState('');
    const [product, setProduct] = useState('');

    useEffect(()=>{
        setBrand(query.get("brand"));
        setProduct(query.get("product"));
    },[query]);

    function Arrow(){
        return(
            <li className="breadcrumb-item-arrow"><FontAwesomeIcon icon={faCaretRight} /></li>
        )
    }

    return (
        <nav>
            <ul className='breadcrumb'>
                <li key="home" className='breadcrumb-item'> <NavLink to='/'> <FontAwesomeIcon icon={faHome} /> {i18n.t('home')} </NavLink> </li>
                {Arrow()}

                {
                    product ?
                    <>
                        <li key="search" className='breadcrumb-item'> <NavLink to={`/home?brand=${brand || ''}&product=${product}`}> <FontAwesomeIcon icon={faSearch} /> {i18n.t("search.label")} </NavLink> </li>
                        {Arrow()}
                    </> : <></>
                }

                {itens.map((item: BreadCrumbType, index:number) => {
                    return (
                        <React.Fragment key={index}>
                            <li title={item.label} className={`breadcrumb-item ${item.isActive ? 'active' : ''}`}>
                                {item.isActive ? item.label : <NavLink to={item.route || '/'}> {item.label} </NavLink>}
                            </li>
                            {index < itens.length - 1 ? Arrow() : <></>}
                        </React.Fragment>
                    )
                })}
            </ul>
        </nav>
    )
}