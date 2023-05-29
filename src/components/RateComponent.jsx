import {Slider,SliderTrack,SliderFilledTrack,SliderThumb,SliderMark, Box, Button, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Textarea} from '@chakra-ui/react'
import { create_rate } from '../redux/actions/note'
import styles from "../styles/RateComponent.module.css";
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'

export function RateComponent({statusLogin, average, movie_id}){

    const navigate = useNavigate();
    const toast = useToast()
    const sliderValue = average
    const labelStyles = {mt: '2',ml: '-2.5', fontSize: 'sm'}

    return(
    
        <div className={styles["rate_component"]}>
            <div id={styles["popular_rate_movie"]}>
                <a>popular rate</a>
                <Box pt={6} pb={2} mr="15%" ml="15%">
                    <Slider aria-label='slider-ex-6' min={0} max={10} defaultValue={sliderValue} >
                    <SliderMark value={2} {...labelStyles}>
                        2%
                    </SliderMark>
                    <SliderMark value={5} {...labelStyles}>
                        5%
                    </SliderMark>
                    <SliderMark value={7} {...labelStyles}>
                        7%
                    </SliderMark>
                    <SliderMark
                        value={sliderValue}
                        textAlign='center'
                        bg='blue.500'
                        color='white'
                        mt='-10'
                        ml='-5'
                        w='12'
                    >
                        {sliderValue}%
                    </SliderMark>
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                    </Slider>
                </Box>
            </div>
            
            {
                statusLogin ? 
                <>
                    <div id={styles["my_rate"]} >
                        
                        <div id={styles["my_rate_description"]} >
                            <Textarea id='rate_description'></Textarea>
                            <input type="hidden" id="rate_movie" value={movie_id} ></input>
                        </div>

                        <div id={styles["my_rate_number"]}>
                            <NumberInput defaultValue={1} min={1} max={10} clampValueOnBlur={false} id='rate_number' ><NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>

                            <Button onClick={async () => {
                                const res = await create_rate()
                                console.log("createreate")
                                console.log(res)
                                if(res == true){
                                    toast({
                                        title: 'good!',
                                        description: "your review has been published successfully",
                                        status: 'success',
                                        duration: 9000,
                                        isClosable: true,
                                    })
                                }else{
                                    toast({
                                        title: 'ups!',
                                        description: "error ocurred ",
                                        status: 'warning',
                                        duration: 9000,
                                        isClosable: true,
                                    })
                                }
                                navigate(0);
                            }}  colorScheme='teal' variant='solid'> rate </Button>
                        </div>
                        
                    </div>
                </>:<></>
            }
            
        </div>
    )
};