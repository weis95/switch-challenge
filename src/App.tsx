import React, { useEffect, useState } from "react"
import styles from "./App.module.css"
import { Checkbox } from "./components/ToggleButton/ToggleButton"

interface CheckBox {
    checked: boolean,
    text: string,
    children: Array<Child>,
    show: boolean,
}

interface Child {
    checked: boolean,
    text: string,
}

const App: React.FC = () => {
    const [arr, setArr] = useState<CheckBox[]>([])
    
    const switches: Array<CheckBox> = [
        {
            checked: true, 
            text: 'Good',
            show: false,
            children: []
        },
        {
            checked: true,
            children: [
                {
                    checked: true, 
                    text: 'Better', 
                },
                {
                    checked: false, 
                    text: 'Best',
                }
            ], 
            text: 'Great',
            show: false,
        },
        
    ]

    useEffect(() => {
        setArr(switches)
    }, [])


    const setDropdown = (index: number) => {
        const array = [...arr]
        array[index].show = !array[index].show
        setArr(array)
    }

    const setSwitch = (index: number) => {
        const array = [...arr]
        array[index].checked = !array[index].checked
        setArr(array)
    }

    const setSwitchChild = (index: number, indexChild: number) => {
        const array = [...arr]
        array[index].children[indexChild].checked = !array[index].children[indexChild].checked
        setArr(array)
    }
   
    const setParent = (index: number) => {
        const array = [...arr]
        setSwitch(index)

        for (const child of array[index].children){
            child.checked =  array[index].checked
        }

        setArr(array)
    }

    return (
        <div className={styles.container}>
            {
                arr.map((elem: any, key: number) => (     
                    elem.children.length ? 
                        <div key={key} className={styles.toggleContainer}>
                            <Checkbox 
                                parent={true} 
                                onDropdown={() => setDropdown(key)}
                                text={elem.text} 
                                checkedSet={elem.checked} 
                                onSlide={() => setParent(key)} 
                            />
                            {
                                elem.show ?
                                    elem.children.map((child: any, childkey: number) => {
                                        return (
                                            <Checkbox
                                                text={child.text}
                                                checkedSet={child.checked} 
                                                key={key + childkey} 
                                                onSlide={() => setSwitchChild(key, childkey)} 
                                            />
                                        )
                                    })
                                : ''
                            }
                        </div>
                    :    
                        <div key={key} className={styles.toggleContainerSingle}>
                            <Checkbox
                                text={elem.text}
                                checkedSet={elem.checked}
                                onSlide={() => setSwitch(key)} 
                            />
                        </div>
                )) 
            }
        </div>
    )
}

export default App
