import { useNavigate } from 'react-router-dom';
import { Input, Stack } from '@chakra-ui/react'
import {useForm} from 'react-hook-form';
import { useToast } from '@chakra-ui/react'
import { registerAccount } from '../redux/actions/security'
import styles from "../styles/RegisterComponent.module.css";

export function RegisterComponent({}){

    const toast = useToast()
    const {register, handleSubmit, formState: {errors} }= useForm();
    const navigate = useNavigate();


    const onsubmit = handleSubmit(async data => { 
        const res = await registerAccount(data);   

        if(res == undefined){
            var titleT= "ups!";
            var descriptionT = "please check again your credentials !"
            var statusT = "warning";
        }
        else if(res.status === 200 || res.status === 201){
            var titleT= "good!";
            var descriptionT= "New user created, please log in now";
            var statusT = "success";
            navigate("/notes/api/login");
        }else{
            var titleT= "ups!";
            var descriptionT = res
            var statusT = "warning";
        }

        toast({
            title: titleT,
            description: descriptionT,
            status: statusT,
            duration: 9000,
            isClosable: true,
        })


    });


    return(
        <div className="container">
            <div className="main-panel">

            <form onSubmit={onsubmit} > 

                <Stack id={styles["register-card"]}  spacing={7} >

                    <Input placeholder='email' {...register("email", {required:true})}/>
                    {errors.email && <span>this field is required</span>}
                    <input type='hidden' {...register("username") }/>


                    <Input type={'show' ? 'text' : 'password'} placeholder='password' {...register("password", {required:true})}/>
                    {errors.password && <span>this field is required</span>}

                    <button>Register</button>

                </Stack> 

            </form>

            </div>
        </div>
    );
}