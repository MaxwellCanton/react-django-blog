import { return_watchlist } from '../redux/actions/note'
import { connect } from "react-redux";
import { useEffect } from 'react';
import { Card, SimpleGrid, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export function WatchlistComponent({return_watchlist, movies_list}){

    useEffect(()=> {return_watchlist()}, [])

    return (
        <div className='container'>
            <div className='main-panel'>
            
                <SimpleGrid columns={[2, null, 2]} >
                        { 
                            movies_list ? 
                            <>
                                {
                                    movies_list.map(movie=>(
                                        <Card className='card-movie' key={movie.id}>
                                            <div style={{height:"70%"}}>
                                                {movie.title}
                                            </div>
                                            <div>
                                            <Button size='sm' colorScheme='teal' variant='outline'><Link to={`/notes/api/${movie.id}`}>info</Link></Button>
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
    movies_list: state.note.movies_list,
})

export default connect(mapStateToProps,{return_watchlist})(WatchlistComponent)