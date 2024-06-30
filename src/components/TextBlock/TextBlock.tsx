import styles from './TextBlock.module.scss';
import {FC} from "react";
import classNames from "classnames";

export interface ITextBlockProps extends HTMLTextAreaElement {
    label?: string,
    isLoading?: boolean;
}

const TextBlock: FC<ITextBlockProps> = ({
                                            id = `text-block-${Math.random()}`,
                                            name,
                                            value,
                                            label,
                                            onInput, onChange,
                                            className = '',
                                            isLoading = false,
                                            ...rest
                                        }) => {
    return (
        <label htmlFor={id} className={styles['wrapper']}>
            {label && <span className={styles['label']}>{label}</span>}
            <div className={styles['textarea-wrapper']}>
            <textarea name={name} id={id} value={value} onInput={onInput}
                      onChange={onChange} {...rest} className={classNames(styles['textarea'], className)}>
            </textarea>
                {isLoading && <div class={styles["loader-wrapper"]}>
                    <div className={styles["loader"]}/>
                </div>}
            </div>
        </label>
    );
};

export default TextBlock;