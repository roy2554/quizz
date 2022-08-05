import type { NextPage } from 'next';
import Image from 'next/image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';

interface Props {
    cardNumber: number;
    props_question?: string;
    props_answer?: string;
    // dragStart: (e: React.DragEvent<HTMLDivElement>) => void;
    // handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    change: (cardNumber: number, question: string, answer: string) => void;
    deleteCard: (cardNumber: number) => void;

    dragStart: (e: React.DragEvent<HTMLDivElement>, cardNumber: number) => void;
    dragEnter: (e: React.DragEvent<HTMLDivElement>, cardNumber: number) => void;
    dragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
    dragTarget: number;
}

// const Card: NextPage<Props> = ({ cardNumber, props_question, props_answer, change }) => {
// const Card: NextPage<Props> = ({ cardNumber, props_question = null, props_answer = null, dragStart, handleDrop, change, deleteCard }) => {
const Card: NextPage<Props> = ({ cardNumber, props_question = null, props_answer = null, change, deleteCard, dragStart, dragEnter, dragEnd, dragTarget }) => {
    const [question, setQuestion] = useState(props_question || '');
    const [answer, setAnswer] = useState(props_answer || '');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        let q,
            a = '';
        if (e.target.name === 'question') {
            q = e.target.value;
            setQuestion(q);
        } else if (e.target.name === 'answer') {
            a = e.target.value;
            setAnswer(a);
        }

        change(cardNumber, q || question, a || answer);
    };

    return (
        <div
            id={cardNumber.toString()}
            draggable={true}
            // onDragOver={(e) => {
            // e.preventDefault();
            // }}
            // onDragStart={dragStart}
            // onDragStart={(e) => {
            // console.log(`STARTING DRAGG... ${cardNumber}`);
            // }}
            // onDragEnter={(e) => {
            //     console.log(`- ENTERING DRAGG... ${cardNumber}`);
            //     console.log(` \`---> ${e}`);
            // }}

            onDragStart={(e) => {
                dragStart(e, cardNumber);
            }}
            onDragEnter={(e) => {
                dragEnter(e, cardNumber);
            }}
            onDragEnd={(e) => {
                dragEnd(e);
            }}
            // onDrop={handleDrop}
            className={`${dragTarget === cardNumber ? 'bg-dark-bg-secondary' : 'bg-dark-bg'} border-solid border-2 border-dark-border rounded-md p-4 flex flex-col space-y-4`}
        >
            <div className="card-info flex flex-row justify-between px-2 text-dark-text">
                <a>{cardNumber}</a>
                <div className="menu flex flex-row space-x-4">
                    <a
                        className="cursor-pointer hover:text-dark-text-hover"
                        onClick={() => {
                            deleteCard(cardNumber);
                        }}
                    >
                        <FontAwesomeIcon icon={faTrash as IconProp} />
                    </a>
                </div>
            </div>
            <div className="border-solid border border-dark-border" />
            <div className="card-data flex flex-row space-x-4">
                <input
                    name="question"
                    type="text"
                    placeholder="question"
                    className="p-4 rounded-md basis-1/2 dark:bg-dark-bg-secondary border-2 dark:border-dark-border"
                    value={question}
                    onChange={handleChange}
                />
                <input
                    name="answer"
                    type="text"
                    placeholder="answer"
                    className="p-4 rounded-md basis-1/2 dark:bg-dark-bg-secondary border-2 dark:border-dark-border"
                    value={answer}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};

export default Card;
