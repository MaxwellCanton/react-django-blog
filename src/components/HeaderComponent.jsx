import React from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { Link } from 'react-router-dom'
import { logout } from '../redux/actions/security';
import { useNavigate } from 'react-router-dom';
import { Select } from '@chakra-ui/react'
import { return_categories } from '../redux/actions/category'
import { useEffect } from 'react';
import { connect } from "react-redux";
import styles from "../styles/HeaderComponent.module.css";

export function HeaderComponent({return_categories, category_list,statusLogin, setStatusLogin}){
    
    const url = window.location.href;
    const navigate = useNavigate();
    useEffect(()=> {return_categories()}, [])

    var enableSelect = "block"
    if(url.includes("notes")){
        enableSelect = "none"
    }

    const handleChange = event => {
        var value = event.target.value
        if(value != ""){navigate(`/notes/api/movies_category/${value}`)}
    };

    return (
        <div className="header" style={{display:"flex"}}>

            <div id={styles["select-categories-box-sup"]}>
                <div  id={styles["select-categories-box-inf"]} style={{display:enableSelect}}>
                    <Select placeholder='Categories' style={{height:"100%"}} onChange={handleChange}>
                        {
                            category_list ? 
                            <>
                            {
                                category_list.map(category=>(
                                    <option key={category.id} value={category.id}>{category.title}</option>
                                ))
                            }
                            </> : <> no categories</>
                        }
                    </Select>  
                </div>
            </div>

            <div id={styles["accounts-buttons-box"]}>
                <Button id={styles["button_create"]} colorScheme='teal' variant='link'><Link to={"/notes/api/create"}>create</Link></Button>
                {
                    statusLogin ?
                    <>
                        <Button id={styles["button_logout"]} onClick={async () => {
                                        logout();
                                        setStatusLogin(false);
                                        navigate("/");
                                    }} colorScheme='teal' variant='link'><Link to={"/api/logout"}>logout</Link></Button>

                        <Button id={styles["button_watchlist"]} colorScheme='teal' variant='link' ><Link to={"/notes/api/watchlist"}>watchlist</Link></Button>

                    </> :<>
                        <Button id={styles["button_login"]} colorScheme='teal' variant='link' ><Link to={"/notes/api/login"}>login</Link></Button>

                        <Button id={styles["button_register"]} colorScheme='teal' variant='link' ><Link to={"/notes/api/register"}>register</Link></Button>
                    </>
                }
            </div>

        </div>
    );
};

const mapStateToProps = state => ({
    category_list: state.category.category_list,
})

export default connect(mapStateToProps,{return_categories})(HeaderComponent)