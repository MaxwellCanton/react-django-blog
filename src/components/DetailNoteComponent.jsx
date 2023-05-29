import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { return_note_by_id, delete_movie, return_rates_by_movie, add_movie_watchlist } from '../redux/actions/note'
import { Divider, Button} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { RateComponent } from  './RateComponent'
import { useState } from 'react';
import styles from "../styles/DetailNoteComponent.module.css";
import { useToast } from '@chakra-ui/react'

function DetailNoteComponent ({return_note_by_id, detail_note, return_rates_by_movie, movie_rates,statusLogin}){
    
    const toast = useToast()

    const [rateValue, setRateValue] = useState(0)
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();

    var average  =0;

    useEffect(()=> {return_note_by_id(id)}, [])
    useEffect(()=> { return_rates_by_movie(id)}, [])

    return(
        <div className='container' >
            <div className='main-panel'>
                { 
                    detail_note ? 
                    <>
                        <div id={styles["title-movie"]} >
                            {detail_note.title} 
                        </div>

                        <div id={styles["information-movie"]}>
                            <div id={styles["genre-movie"]} >
                                {detail_note.genre}
                            </div>
                            <div id={styles["released-movie"]} >
                                {detail_note.release_date}
                            </div>
                        </div>

                        <div id={styles["description-movie"]} >
                            {detail_note.plot} 
                        </div>
                        <div id={styles["control-buttons-movie-box"]}>
                            <div id={styles["delete-movie"]} >
                                <Button onClick={async () => {
                                    delete_movie(detail_note.id);
                                    navigate("/");
                                }} colorScheme='pink' variant='solid'> Delete </Button>
                            </div>

                            <div id={styles["edit-movie"]} >
                                <Button colorScheme='teal' variant='solid'> <Link to={`/notes/api/update/${detail_note.id}`}>update</Link></Button>
                            </div>

                            <div id={styles["add-movie"]} >
                                <Button onClick={async () => {
                                    const res = await add_movie_watchlist(detail_note.id);
                                    if(res == true){
                                        toast({
                                            title: 'good!',
                                            description: "The movies has been added successfully to your watchlist",
                                            status: 'success',
                                            duration: 9000,
                                            isClosable: true,
                                        })
                                    }else{
                                        toast({
                                            title: 'ups!',
                                            description: res,
                                            status: 'warning',
                                            duration: 9000,
                                            isClosable: true,
                                        })
                                    }
                                }} colorScheme='pink' variant='solid'> Add </Button>
                            </div>
                        </div>

                    </> : <> no items </>
                
                }

                <Divider/>

                {
                    movie_rates ? 
                    <>

                    {movie_rates.map((data,i) =>{
                        average = data.average
                    })[0]}

                    <RateComponent statusLogin={statusLogin} average={average} movie_id={id} />

                    {
                        movie_rates.map(rate=>(
                            <div className={styles["card-review"]} key={rate.id}>
                                <div className={styles["card-review-information"]}>
                                    <strong>{rate.user}</strong>
                                </div>
                                <div className={styles["card-review-content"]}>
                                    {rate.review}
                                </div>
                            </div>
                        ))
                    }
                    </> :
                    <>
                        <RateComponent statusLogin={statusLogin} average={0} movie_id={id} />
                    </>
                }

            </div>
        </div>
    )

};

const mapStateToProps = state => ({
    detail_note: state.note.detail_note,
    movie_rates: state.note.movie_rates,

})

export default connect(mapStateToProps,{return_note_by_id, return_rates_by_movie})(DetailNoteComponent)