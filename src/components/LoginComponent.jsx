import { Input, Stack, InputGroup,InputRightElement, Button,   FormControl } from '@chakra-ui/react'
import {useForm} from 'react-hook-form';
import { login } from '../redux/actions/security'
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'
import { useState } from 'react';
import styles from "../styles/LoginComponent.module.css";

export function LoginComponent({setStatusLogin}){

    const toast = useToast()
    const {register, handleSubmit, formState: {errors} }= useForm();
    const navigate = useNavigate();

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const onsubmit = handleSubmit(async data => { 
        const res = await login(data); 
        if(res.status === 200 || res.status !== undefined){
            setStatusLogin(true)
            navigate("/");
        }else{
            
            var message =res
            if(res.constructor === Object){
                message = res[String(Object.keys(res)[0])]
            }

            toast({
                title: 'ups!',
                description: message,
                status: 'warning',
                duration: 9000,
                isClosable: true,
            })
        }
        
    });

    return(
        <div className="container">
            <div className="main-panel">

<FormControl>
                <form onSubmit={onsubmit} > 

                    <Stack id={styles["login-card"]} spacing={7} >
                    
                        <Input type='email'  placeholder='email' {...register("email", {required:true})}/>
                        {errors.email && <span>this field is required</span>}

                        <InputGroup>
                            <Input
                                type={show ? 'text' : 'password'}
                                placeholder='password' {...register("password", {required:true})}/>
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        {errors.password && <span>this field is required</span>}

                        <button>log in</button>

                    </Stack> 

                </form>
                    

                </FormControl>
            </div>
        </div>
    )

};