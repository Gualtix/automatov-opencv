import { useEffect, useState } from "react"

//Import Electron
//const electron = require('electron');
//const {BrowserWindow} = electron;

//import { initialize, enable as enableRemote } from "@electron/remote/main";
//initialize();

import axios from "axios"
/*import { XCard } from "../xcard/xcard.component"*/
import { XUnit } from "../xunit/xunit.component"


import { RiDeleteBin2Fill } from 'react-icons/ri';
import { FaSave } from 'react-icons/fa';


const listStyle: React.CSSProperties = {
    width: '1080px',
    gap: '10px',
    margin: 'auto',
    padding: '5px',
    marginTop: '15px',
    marginBottom: '15px',
    display: 'flex',
    flexWrap: 'wrap',
}


const updateColorant = (taskList: any[], task: any) => {
    let objIndex = taskList.findIndex((obj: any) => obj.id === task.id);
    taskList[objIndex] = task;
}

const updateTaskList = async (taskList: any[], task: any) => {
    let objIndex = taskList.findIndex((obj: any) => obj.id === task.id);

    if (task.icon_blob !== undefined) {
        const file = await fetch(task.icon_blob).then(r => r.blob()).then(blobFile => new File([blobFile], 'name', { type: blobFile.type }))
        task.icon_base64 = await blobToBase64(file);
    }

    taskList[objIndex] = task;
}

const blobToBase64 = (blob: any) => {
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
}

/*
const updateExColor = (setExColor: (arg0: string) => void,excolor:string) => {
    //setExColor(excolor);
}
*/

const onClickExecutetHandler = async (evt: any, selectedOperation: string, setTaskList: (arg0: any[]) => void, taskList: any[]) => {

    const result = await axios.get('http://localhost:3000/api/executeSequence/' + selectedOperation);
    //console.log('Result of Execution :v -->', result.data);
    //alert('Sequence executed successfully');

    let logs = result.data.tasks;

    /*
    taskList.forEach((task: any) => {
        task.exColor = 'white';
    });
    */

    logs.forEach((log: any) => {
        let task = taskList.find((task: any) => task.id === log.id);
        task.setExColorVar(log.color);
    }
    );

    //setTaskList([]);
    //setTaskList([...taskList]);

    //console.log('TaskList after execution :v -->', taskList);
    //let dummyTask = { id: 0, operation: 'click', text: '', icon_base64: '', icon_blob: '', icon_name: '', x_move: 0, y_move: 0, excolor: 'red' };
    //setTaskList([...taskList,dummyTask]);

}


const onSelectOperationChangeHandler = (evt: any, setSelectedOperation: (arg0: string) => void) => {
    let value = evt.target.value;
    setSelectedOperation(value);
}

const onTextChangeHandler = (evt: any, setTextValue: (arg0: string) => void) => {
    let text = evt.target.value;
    setTextValue(text);
}

const onClickRemoveLastHandler = (evt: any, setTaskList: (arg0: any[]) => void, taskList: any) => {

    if (taskList.length > 0) {
        let newTaskList = taskList.slice(0, taskList.length - 1)
        setTaskList(newTaskList)
    }
}

const onClickAddHandler = (evt: any, setTaskList: (arg0: any[]) => void, taskList: any, selectedOperation: string) => {

    console.log("taskList Length is: " + (taskList.length + 1));

    const task: any = {
        id: taskList.length + 1,
        operation: 'click',
        text: '',
        icon_base64: '',
        icon_blob: '',
        icon_name: 'icon_name',
        x_move: 0,
        y_move: 0,
        setExColorVar: null,
    }

    setTaskList([...taskList, task])
}


const onClickSaveHandler = async (evt: any, taskList: [], textValue: string, setSequences: (arg0: any[]) => void, sequences: [], setSelectedOperation: (arg0: string) => void, selectedOperation: string) => {


    //Already exists
    let nm = sequences.find((sequence: any) => sequence.name === textValue);
    if (nm !== undefined && (selectedOperation === 'New')) {
        alert('Sequence name already exists');
        return;
    }


    if (textValue === '') {
        alert('Please enter a name for the sequence');
        return;
    }

    if (taskList.length === 0) {
        alert('Please add at least one task to the sequence');
        return;
    }

    let sequence = {
        name: textValue,
        tasks: taskList
    };

    let tmp = {
        id: sequences.length + 1,
        name: textValue
    };

    await axios.post('http://localhost:3000/api/saveNewSequence', sequence);

    if (selectedOperation === 'New') {
        let newSequences = [...sequences, tmp]
        console.log('newSequences -->', newSequences);
        setSequences(newSequences);
    }

    alert('Sequence saved successfully');

    if (textValue === selectedOperation) {
        setSelectedOperation('New');
    }

}

const onClickDeleteHandler = async (evt: any, selectedOperation: string, setSequences: (arg0: any[]) => void, sequences: []) => {


    if (selectedOperation === 'New') {
        alert('Please select a sequence to delete');
        return;
    }

    if (confirm('Are you sure you want to delete this sequence?') === false) {
        return;
    }

    if (selectedOperation !== 'New') {
        const result = await axios.delete('http://localhost:3000/api/deleteSequence/' + selectedOperation);
        console.log('result -->', result);
        let newSequences = sequences.filter((sequence: any) => sequence.name !== selectedOperation);
        setSequences(newSequences);
    }
}

export const XList = () => {

    const disabeledButtonStyle = 'bg-green-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed';
    const enabledButtonSyle = 'col-span-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded';

    let init: any = []
    const [taskList, setTaskList] = useState(init);
    const [sequences, setSequences] = useState(init);
    const [selectedOperation, setSelectedOperation] = useState('New');
    const [textValue, setTextValue] = useState('');
    const [btnExecutetStyle, setBtnExecuteStyle] = useState(disabeledButtonStyle);



    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('http://localhost:3000/api/getSequences')
            setSequences(result.data)
        }

        fetchData()
            .catch((err) => {
                console.log(err);
            }
            )
    }, []);

    useEffect(() => {
        if (selectedOperation !== 'New') {
            const fetchData = async () => {
                setTaskList([]);
                setTextValue('');
                const result = await axios.get('http://localhost:3000/api/getSequence/' + selectedOperation);
                console.log('result.data -->', result.data.tasks);

                caches.keys().then((names) => {
                    names.forEach((name) => {
                        caches.delete(name);
                    });
                });

                setTaskList([...result.data.tasks]);
                setTextValue(selectedOperation);
                setBtnExecuteStyle(enabledButtonSyle);
            }

            fetchData()

                .catch((err) => {
                    console.log(err);
                }
                )
        }
        else {
            setTaskList([]);
            setTextValue('');
            setBtnExecuteStyle(disabeledButtonStyle);
        }
    }, [selectedOperation]);

    useEffect(() => {
        setTaskList([]);
        setTextValue('');
    }, [sequences]);

    return (
        <>
            <br />
            <div style={{ backgroundColor: 'white', height: '140px', width: '1065px', margin: 'auto', display: 'flex', gap: '5px', padding: '5px', borderRadius: '5px' }}>
                <div className="grid grid-cols-0 column-gap: 0px;">

                    <button style={{ width: '150px', height: '40px' }} onClick={(evt) => { onClickAddHandler(evt, setTaskList, taskList, selectedOperation) }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                        Add
                    </button>

                    <button style={{ width: '150px', height: '40px' }} onClick={(evt) => { onClickRemoveLastHandler(evt, setTaskList, taskList) }} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded">
                        Remove Last
                    </button>

                    <button style={{ height: '40px' }} onClick={(evt) => { onClickExecutetHandler(evt, selectedOperation, setTaskList, taskList) }} className={btnExecutetStyle}>
                        Execute
                    </button>

                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '900px' }}>

                    <select value={selectedOperation} style={{ marginBottom: '7px', width: '100%', fontWeight: 'bold', height: '40px', border: 'black 1px solid', borderRadius: '5px' }} onChange={(evt) => { onSelectOperationChangeHandler(evt, setSelectedOperation); }}>
                        <option value="New" style={{ fontWeight: 'bold' }}>New</option>
                        {
                            sequences.map((sequence: any) => {
                                return (
                                    <option key={sequence.name} value={sequence.name} style={{ fontWeight: 'bold' }}>{sequence.name}</option>
                                )
                            })
                        }
                    </select>

                    <input type="text" value={textValue} onChange={(evt) => { onTextChangeHandler(evt, setTextValue) }} style={{ padding: '5px', paddingLeft: '10px', width: '100%', marginBottom: '7px', borderRadius: '5px', border: '1px black solid' }} />


                    <div style={{ display: 'flex', flexDirection: 'row-reverse', width: '100%', gap: '5px' }}>
                        <button style={{ width: '50px', height: '40px' }} onClick={(evt) => { onClickDeleteHandler(evt, selectedOperation, setSequences, sequences) }} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded">
                            <RiDeleteBin2Fill />
                        </button>
                        <button style={{ width: '50px', height: '40px' }} onClick={(evt) => { onClickSaveHandler(evt, taskList, textValue, setSequences, sequences, setSelectedOperation, selectedOperation) }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                            <FaSave />
                        </button>
                    </div>

                </div>
            </div>

            <div style={listStyle}>
                {
                    taskList.map((task: any) => {
                        let uniqueKey = task.id + '-' + selectedOperation;
                        return <>
                            <XUnit
                                key={uniqueKey}
                                sequenceSelected={selectedOperation}
                                task={task}
                                updateTaskList={updateTaskList}
                                taskList={taskList}
                                updateColorant={updateColorant}
                            />
                        </>
                    })
                }
            </div>
        </>
    )
}

/*
updateExColor={updateExColor}
*/


/*
<br/>
<XUnit
    task={task}
    updateTaskList={updateTaskList}
/>
<br/>
*/

/*
How to access a child's state in React
https://stackoverflow.com/questions/27864951/how-to-access-a-childs-state-in-react

Convert blob to base64
https://stackoverflow.com/questions/18650168/convert-blob-to-base64

How to convert image "blob:http://localhost...." to File in ReactJS?
https://stackoverflow.com/questions/67241736/how-to-convert-image-blobhttp-localhost-to-file-in-reactjs
*/
