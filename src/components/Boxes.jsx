import { useEffect, useRef, useState } from "react";
import { checkGameStatus,convertIndexToCoordinates } from "../utils";

const Boxes = () => {
    const [boxes,setBoxes] = useState([]) 
    const [result,setResult] = useState(null)
    const gameboard = useRef([])
    const end = useRef(null);

    const initialSetup = ()=>{
        let boxesArray = [];
        for (let i = 0; i < 9; i++) {
            boxesArray.push({selected:false,turnNumber:null,symbol:''})
        }
        setBoxes(boxesArray)
        setResult(null)
        end.current = null;
    }

    useEffect(()=>{
        initialSetup();
    },[])

    useEffect(()=>{
        const newBoxes = [
            [boxes[0]?.symbol,boxes[1]?.symbol,boxes[2]?.symbol],
            [boxes[3]?.symbol,boxes[4]?.symbol,boxes[5]?.symbol],
            [boxes[6]?.symbol,boxes[7]?.symbol,boxes[8]?.symbol]
        ]
        gameboard.current = newBoxes
    },[boxes])


    useEffect(()=>{
        if(getSelectedLength()[0] > 4){
            const result = checkGameStatus(gameboard.current)
            if(result !== null){
                end.current = "Stop";
            }
            setResult(result)
        }
    })

    const getSelectedLength = ()=>{
        let count = 0;
        let emptyIndexes = [];
        boxes.forEach((box,i)=>{
            if(box.selected){
                count+=1;
            }else{
                emptyIndexes.push(i)
            }
        })
        return [count,emptyIndexes]
    }

    const updateBoxes = (newBoxes)=>{
        if(!end.current){
            setBoxes(newBoxes)
        }
    }

    const handleClick = (i)=>{
        const [val] = getSelectedLength();
        const newBoxes = boxes?.map((box,index)=>{
                            if(i===index){
                                return {selected:true,turnNumber:val,symbol:'X'}
                            }else{
                                return box
                            }
                        })
        updateBoxes(newBoxes)
    }

    const computerTurn = ()=>{
        const [val,emptyIndexes] = getSelectedLength();

        // Check if the computer can win in the next move
        for (let i = 0; i < emptyIndexes.length; i++) {
        const index = emptyIndexes[i];
        const [row, col] = convertIndexToCoordinates(index);
        const newBoard = [...gameboard.current];
        newBoard[row][col] = 'O';
        if (checkGameStatus(newBoard) === 'O') {
            console.log('win')
            const newBoxes = [...boxes];
            newBoxes[index] = { ...newBoxes[index],selected:true,symbol: 'O',turnNumber:val };
            updateBoxes(newBoxes);
            return;
        }else{
            newBoard[row][col] = '';
        }
        }

        // Check if the player can win in the next move and block them
        for (let i = 0; i < emptyIndexes.length; i++) {
            const index = emptyIndexes[i];
            const [row, col] = convertIndexToCoordinates(index);
            const newBoard = [...gameboard.current]
            newBoard[row][col] = 'X';
            console.log(newBoard)
            if (checkGameStatus(newBoard) === 'X') {
                console.log('block')
                const newBoxes = [...boxes];
                newBoxes[index] = { ...newBoxes[index],selected:true,symbol: 'O',turnNumber:val };
                updateBoxes(newBoxes);
                return;
            }else{
                newBoard[row][col] = '';
            }
        }

        // If no winning or blocking move, choose a random available move
        const randomIndex = Math.floor(Math.random() * emptyIndexes.length);
        const index = emptyIndexes[randomIndex];
        const newBoxes = [...boxes];
        newBoxes[index] = { ...newBoxes[index], selected: true, symbol: 'O',turnNumber:val };
        updateBoxes(newBoxes);

    }

    useEffect(()=>{
        const [val,emptyIndexes] = getSelectedLength();
        if(val%2 ===1 && emptyIndexes.length > 1){
            setTimeout(()=>{
                computerTurn()
            },1000)
        }
    },[boxes])

    return (
        <div className="py-4">
            <div className="grid grid-cols-3 gap-x-0 gap-y-4 justify-items-center w-80 mx-auto mt-8">
                {boxes?.map((box,i)=>{
                    return(
                        <div
                        key={i} 
                        className={(box.selected && box.turnNumber%2===1) ? "w-20 h-20 bg-transparent border-amber-300 border-8 rounded-full self-center text-center cursor-pointer" :"w-20 h-20 bg-amber-300 rounded-md self-center text-center cursor-pointer"}
                        onClick={()=>handleClick(i)}
                        style={{clipPath: box.selected && box.turnNumber%2===0 && 'polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)',transition:'1s'}}
                        ></div>
                    )
                })}
            </div>
            <div className="flex justify-center mt-10">
                <button 
                    className="px-2 py-1 bg-amber-300 text-slate-900 font-bold rounded-sm text-lg" 
                    onClick={()=>initialSetup()}>New Game</button>
            </div>
            {result && <div className="text-amber-300 text-xl font-semibold text-center mt-8">
                {result === 'X' ? 'You Win!' : result === 'O' ? 'Computer Wins!' : "It's a Draw!"}
            </div>}
        </div>
     );
}
 
export default Boxes;