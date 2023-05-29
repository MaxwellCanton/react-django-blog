import React from 'react';
import { Card, Button, SimpleGrid, Text } from '@chakra-ui/react'
import { return_notes } from '../redux/actions/note'
import { useEffect } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom'


function BodyComponent({return_notes, note_list}){

    useEffect(()=> {return_notes()}, [])

    return (
        <div className="container">
            <div className="main-panel">

                <SimpleGrid columns={[2, null, 3]} >
                    { 
                        note_list ? 
                        <>
                            {
                                note_list.map(note=>(
                                    <Card className='card-movie' key={note.id}>
                                        <div style={{height:"70%"}}>
                                            <Text color='teal'>{note.title}</Text>
                                        </div>
                                        <div>
                                        <Button size='sm' colorScheme='teal' variant='outline'>  <Link to={`/notes/api/${note.id}`}>info</Link> </Button>
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
    note_list: state.note.note_list,
})

export default connect(mapStateToProps,{return_notes})(BodyComponent)