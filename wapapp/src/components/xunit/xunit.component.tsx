import { ImArrowDown, ImArrowLeft, ImArrowRight, ImArrowUp } from 'react-icons/im';
import './style.css';
import { useEffect, useState } from 'react';



const drawCircle = (x_move: any, y_move: any, canv: string) => {

    y_move = y_move * -1;

    var canvas: any = document.getElementById(canv);
    var ctx = canvas?.getContext("2d");

    if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.arc(x_move + 63, y_move + 50, 5, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = "#00FF19";
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;
        ctx.fill();
    }
}



const arrowPressedHandler = (evt: any, x_move: any, y_move: any, setXMove: (arg0: number) => void, setYMove: (arg0: number) => void) => {

    let id = evt.currentTarget.id;
    let step = 3;

    if (id === 'up') {
        setYMove(y_move + step);
    }

    if (id === 'down') {
        setYMove(y_move - step);
    }

    if (id === 'left') {
        setXMove(x_move - step);
    }

    if (id === 'right') {
        setXMove(x_move + step);
    }
}

const onSelectOperationChangeHandler = (evt: any, setSelectedOperation: (arg0: string) => void) => {
    let value = evt.target.value;
    setSelectedOperation(value);
}

const onTextChangeHandler = (evt: any, setTextValue: (arg0: string) => void) => {
    let text = evt.target.value;
    setTextValue(text);
}

const onClickPasteHandler = async (evt: any, setImgData: (arg0: string) => void) => {

    try {
        const clipboardItems = await navigator.clipboard.read()
        const blobOutput = await clipboardItems[0].getType('image/png')
        const data = URL.createObjectURL(blobOutput)
        //task.icon = data;
        //updateTaskList(taskList, task);
        setImgData(data)
    } catch (e) {
        console.log(e);
    }

}

interface XUnitProps {
    task: any;
    updateTaskList: (arg0: any[], arg1: any) => void;
    //updateExColor: (arg0:(arg0: string) => void,arg1: string) => void;
    //setExColor: (arg0: string) => void;
    //exColor: string;
    updateColorant: (arg0: any[], arg1: any) => void;
    taskList: any;
    sequenceSelected: string;
}




export const XUnit = ({ sequenceSelected, task, updateTaskList, taskList,updateColorant }: XUnitProps) => {


 
    const [x_move, setXMove] = useState(task.x_move);
    const [y_move, setYMove] = useState(task.y_move);
    const [selectedOperation, setSelectedOperation] = useState(task.operation);
    const [textValue, setTextValue] = useState(task.text);
    const [imgData, setImgData] = useState(task.icon_base64);
    //setExColor(exColor);
    const [exColor, setExColor] = useState('white');


    task.setExColorVar = setExColor;
    updateColorant(taskList, task);

    useEffect(() => {
        task.x_move = x_move;
        task.y_move = y_move;
        task.operation = selectedOperation;
        task.text = textValue;
        task.icon_blob = imgData;
        updateTaskList(taskList, task);
    }, [x_move, y_move, selectedOperation, textValue, imgData]);

    const [isLoaded, setIsLoaded] = useState(false);
    const [isPageLoaded, setIsPageLoaded] = useState(false); //this helps

    let canv = 'canv-' + sequenceSelected + '-' + task.id;
    canv = canv.replace(/\s/g, '');
    canv = canv.toLocaleLowerCase();
    drawCircle(x_move, y_move, canv);

    useEffect(() => {
        setIsLoaded(true);
        drawCircle(x_move, y_move, canv);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            setIsPageLoaded(true);
            drawCircle(x_move, y_move, canv);
        }
    }, [isLoaded]);


    let inputVisible: any = 'hidden';

    if (selectedOperation === 'type') {
        inputVisible = 'visible';
    }

    return <>
        <div  className="cnt grid gap-2 grid-cols-10" style={{ width: '350px', height: '230px' }}>

            <div className='cnt col-span-4' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '0px', overflow: 'hidden' }}>

                <div  className='cnt bottom_line' style={{fontWeight: 'bold', fontSize: '25px', textAlign: 'center', padding: '0px', backgroundColor: exColor }}>
                    {task.id}
                </div>

                <div className='cnt bottom_line' style={{ height: '110px', backgroundColor: 'white', padding: '0px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ backgroundColor: 'white', width: '100%', height: '100%', position: 'relative' }}>
                        <img style={{ objectFit: 'none', height: '100%', width: '100%', position: 'absolute' }} src={imgData} />
                        <canvas id={canv} width="126px" height="100px" style={{ margin: '0px', position: 'absolute' }}></canvas>
                    </div>
                </div>

                <div className='cnt bottom_line' style={{ display: 'flex', justifyContent: 'space-between', height: '38px', backgroundColor: 'white' }}>

                    <button id='up' onClick={(evt) => { arrowPressedHandler(evt, x_move, y_move, setXMove, setYMove) }}>
                        <ImArrowUp />
                    </button >

                    <button id='down' onClick={(evt) => { arrowPressedHandler(evt, x_move, y_move, setXMove, setYMove) }}>
                        <ImArrowDown />
                    </button>

                    <button id='left' onClick={(evt) => { arrowPressedHandler(evt, x_move, y_move, setXMove, setYMove) }}>
                        <ImArrowLeft />
                    </button>

                    <button id='right' onClick={(evt) => { arrowPressedHandler(evt, x_move, y_move, setXMove, setYMove) }}>
                        <ImArrowRight />
                    </button>

                </div>

                <div className='cnt ' style={{ border: 'none', padding: '0px' }}>
                    <button onClick={(evt) => { onClickPasteHandler(evt, setImgData) }} style={{ width: '100%', backgroundColor: 'cornflowerblue', fontWeight: 'bold', height: '35px' }}>
                        P A S T E
                    </button>
                </div>
            </div>


            <div className="cnt col-span-6" style={{ padding: '0px', overflow: 'hidden' }}>

                <div className='cnt bottom_line' style={{ padding: '0px', display: 'flex', flexDirection: 'row', gap: '0px', justifyContent: 'space-between' }}>

                    <div className='cnt' style={{ width: '50%', border: 'none', borderRight: '2px solid black', borderRadius: '0px', fontWeight: 'bold', backgroundColor: '#E57C23' }}>
                        X: {x_move}
                    </div>
                    <div className='cnt' style={{ width: '50%', border: 'none', borderRadius: '0px', fontWeight: 'bold', backgroundColor: '#E57C23' }}>
                        Y: {y_move}
                    </div>

                </div>

                <div className='cnt bottom_line' style={{ padding: '0px' }}>

                    <select style={{ width: '100%', fontWeight: 'bold', height: '35px' }} value={selectedOperation} onChange={(evt) => { onSelectOperationChangeHandler(evt, setSelectedOperation); }}>
                        <option value="click" style={{ fontWeight: 'bold' }}>CLICK</option>
                        <option value="type" style={{ fontWeight: 'bold' }}>TYPE</option>
                        <option value="typeplusenter" style={{ fontWeight: 'bold' }}>TYPE + ENTER</option>
                    </select>

                </div>
                {
                    inputVisible === 'visible' && <>
                        <input type="text" value={textValue} onChange={(evt) => { onTextChangeHandler(evt, setTextValue) }} style={{ padding: '5px', paddingLeft: '10px', width: '93%', margin: '7px', borderRadius: '5px', border: '1px black solid' }} />
                    </>
                }
            </div>
        </div>
    </>;
}


/*
<textarea style={{ resize: 'none', overflow: 'hidden', width: '100%', height: '95%' }} value={text} onChange={onTextAreChangeHandler}>
At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.
</textarea>
*/