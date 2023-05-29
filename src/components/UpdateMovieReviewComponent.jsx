import {useForm} from 'react-hook-form';
import { update_movie } from '../redux/actions/note'
import { Input, Stack, Textarea } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { return_note_by_id } from '../redux/actions/note'
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';


function UpdateMovieReviewComponent({return_note_by_id, detail_note}){

    const params = useParams();
    const id = params.id;

    useEffect(()=> {return_note_by_id(id)}, [])
    
    const {register, handleSubmit, formState: {errors} }= useForm();
    const navigate = useNavigate();

    const onsubmit = handleSubmit(async data => { 
        const res = await update_movie(data, id);    
        navigate("/");
    });

    return (
        <div className='container'>
            <div  className='main-panel'>
                
                {
                    detail_note  ?
                    <>
                        <form onSubmit={onsubmit} style={{margin:"7%"}}> 
                            <Stack spacing={4}>

                                <Input defaultValue = {detail_note.title}  {...register("title", {required:true})}/>
                                {errors.title && <span>this field is required</span>}

                                <Input defaultValue={detail_note.released_date} size="md" type="date" {...register("release_date", {required:true})}/> 
                                {errors.release_date && <span>this field is required</span>}

                                <Textarea defaultValue={detail_note.plot}  placeholder='Plot'  {...register("plot", {required:true})}/>
                                {errors.plot && <span>this field is required</span>}

                                <button>update</button>

                            </Stack>
                            
                        </form>
                    </> : <> no items</>

                }

            </div>
        </div>
    )
};

const mapStateToProps = state => ({
    detail_note: state.note.detail_note,
})

export default connect(mapStateToProps,{return_note_by_id})(UpdateMovieReviewComponent)