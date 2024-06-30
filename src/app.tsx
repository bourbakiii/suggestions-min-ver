import styles from './app.module.scss'
import SuggestInput from "./components/SuggestInput/SuggestInput.tsx";
import TextBlock from "./components/TextBlock/TextBlock.tsx";
import {TargetedEvent, useEffect, useState} from "react";
import useDebounce from "./utils/hooks/useDebounce.tsx";
import useFetch from "./utils/hooks/useFetch.tsx";

export function App() {
    const [text, setText] = useState<string>('');
    const debouncedText = useDebounce<string>(text, 500);
    const [fixedText, setFixedText] = useState<string>('');
    const {data, isLoading, isError, refetch} = useFetch('https://amogus-3.onrender.com/process_text', {
        method: "POST",
        body: JSON.stringify({text: debouncedText}),
        headers: {"Content-Type": "application/json"},
    });
    const onTextInputHandler = (e: TargetedEvent<HTMLTextAreaElement>) => {
        console.log('e.currentTarget.value, ', e.currentTarget.value)
        setText(e.currentTarget.value);
    }

    useEffect(() => {
        if (debouncedText) refetch()
    }, [debouncedText])

    useEffect(() => setFixedText(data?.changed_text || ''), [data]);


    return (
        <main className={styles['app']}>
            <TextBlock className={styles['app-textarea']} label={'Изначальный текст'} value={text} onInput={onTextInputHandler}/>
            <TextBlock className={styles['app-textarea']} isLoading={isLoading} label={'Исправленный текст'} value={fixedText} onInput={onTextInputHandler}
                       readOnly={true}/>
        </main>
    )
}
