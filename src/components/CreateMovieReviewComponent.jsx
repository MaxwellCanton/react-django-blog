import {useForm} from 'react-hook-form';
import { create_movie } from '../redux/actions/note'
import { Input, Stack, Textarea, Select } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { return_categories } from '../redux/actions/category'
import { useEffect } from 'react';
import { connect } from "react-redux";

export function CreateMovieReviewComponent({return_categories, category_list}){

    const {register, handleSubmit, formState: {errors} }= useForm();
    const navigate = useNavigate();
    useEffect(()=> {return_categories()}, [])

    const onsubmit = handleSubmit(async data => { 
        const res = await create_movie(data);    
        navigate("/");
    });

    return (
        <div className='container'>
            <div  className='main-panel'>

                <form onSubmit={onsubmit} style={{margin:"7%"}}> 
                <Stack spacing={4}>

                    <Input placeholder='Title' {...register("title", {required:true})}/>
                    {errors.title && <span>this field is required</span>}

                    <Input placeholder="Released date" size="md" type="date" {...register("release_date", {required:true})}/> 
                    {errors.released_date && <span>this field is required</span>}


                    <Select placeholder='select a category' style={{height:"100%"}} {...register("genre", {required:true})}> 
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
                    {errors.genre && <span>this field is required</span>}

                    <Textarea placeholder='Plot'  {...register("plot", {required:true})}/>
                    {errors.plot && <span>this field is required</span>}

                    <button>save</button>

                </Stack>
                    
                </form>

            </div>
        </div>
    )
};

const mapStateToProps = state => ({
    category_list: state.category.category_list,
})

export default connect(mapStateToProps,{return_categories})(CreateMovieReviewComponent)