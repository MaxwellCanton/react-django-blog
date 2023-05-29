import React from 'react';
import { Card, SimpleGrid } from '@chakra-ui/react'
import { return_notes_by_category } from '../redux/actions/category'
import { useEffect } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';


function MoviesByCategoryComponent({return_notes_by_category, movies_by_category}){
    
    const params = useParams();
    const id = params.id;

    useEffect(()=> {return_notes_by_category(id)}, [])

    return (
        <div className="container">
            <div className="main-panel">
                
                <SimpleGrid columns={[2, null, 5]} >
                    { 
                        movies_by_category ? 
                        <>
                            {
                                movies_by_category.map(movie=>(
                                    <Card className='card-movie' key={movie.id}>
                                        <div style={{height:"70%"}}>
                                            {movie.title}
                                        </div>
                                        <div>
                                            <Link to={`/notes/api/${movie.id}`}>rate link</Link>
                                        </div>
                                    </Card>
                                ))
                            }
                        </> :  
                            <>no items</> 
                    }
                </SimpleGrid>

            </div>
        </div>
    );
};


const mapStateToProps = state => ({
    movies_by_category: state.category.movies_by_category,
})

export default connect(mapStateToProps,{return_notes_by_category})(MoviesByCategoryComponent)