import type { NextPage } from 'next';
import Image from 'next/image';

import React, { useEffect, useRef, useState } from 'react';
import { getSession, signIn, useSession } from 'next-auth/react';

import Card from '../../components/card';
import axios from 'axios';

const Home: NextPage = () => {
    const { data: session } = useSession();

    useEffect(() => {
        const asyncFunc = async () => {
            const userSession = await getSession();
            if (!userSession) {
                alert('Please sign in');
                signIn('google');
            }
        };
        asyncFunc();
    }, [session]);

    interface interface_Card {
        order: number;
        question: string;
        answer: string;
    }

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [cards, setCards] = useState<interface_Card[]>([{ order: 0, question: '', answer: '' }]);

    const [cardsAddQty, setCardsAddQty] = useState(1);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'title') {
            setTitle(e.target.value);
        } else if (e.target.name === 'description') {
            setDescription(e.target.value);
        } else if (e.target.name === 'cardsAddQty') {
            setCardsAddQty(Number(e.target.value));
            console.log(`cardsAddQty: ${cardsAddQty}`);
        }
    };

    const modifyCard = (cardNumber: number, question: string, answer: string) => {
        if (cards.length + 1 === cardNumber) {
            setCards([...cards, { order: cardNumber, question, answer }]);
        } else if (cards.length >= cardNumber) {
            const newCards = [...cards];
            newCards[cardNumber - 1].question = question;
            newCards[cardNumber - 1].answer = answer;
            setCards(newCards);
        } else {
            new Error('Card number is too high');
        }
    };

    const newCard = (number: number = -1, question: string = '', answer: string = '') => {
        if (number === -1) {
            setCards([...cards, { order: cards.length, question, answer }]);
        } else {
            const newCards = [...cards];
            newCards.splice(number, 0, { order: cards.length, question, answer });
            setCards(newCards);
        }
    };

    const newCardFor = (number: number) => {
        const newCards = [...cards];
        for (let i = 0; i < number; i++) {
            newCards.push({ order: newCards.length, question: '', answer: '' });
        }
        setCards(newCards);
    };

    const deleteCard = (number: number) => {
        const newCards = [...cards];
        newCards.splice(number - 1, 1);
        setCards(newCards);
    };

    const submitSet = async () => {
        const newCards = cards
            .filter((card) => card.question !== '' && card.answer !== '')
            .map((card) => ({
                question: card.question,
                answer: card.answer
                    .split(',')
                    .map((ans) => ans.trim())
                    .filter((ans) => ans !== ''),
            }));

        const newSet = await axios.post('/api/sets', {
            title: title,
            description: description,
            cards: newCards,
        });
        if (!newSet) {
            alert('Error submitting set');
        } else {
            alert('Set submitted');
        }
    };

    return (
        <div className="">
            <div className="head">
                <meta charSet="utf-8" />
                <meta name="og:title" content="Home" />
                <meta name="og:description" content="quizz home page" />
                <meta name="og:type" content="website" />

                <title>QUIZZ - Create a set</title>
            </div>

            <div className="spacer m-4" />

            <p className="px-4 font-bold text-3xl">CREATE A SET</p>

            <div className="spacer m-4" />

            <div className="set-configuration flex flex-col space-y-4 mx-4">
                <input
                    name="title"
                    type="text"
                    placeholder="set's title"
                    className="p-4 rounded-md dark:bg-dark-bg-secondary border-2 dark:border-dark-border"
                    onChange={onChange}
                />
                <input
                    name="description"
                    type="text"
                    placeholder="set's description"
                    className="p-4 rounded-md dark:bg-dark-bg-secondary border-2 dark:border-dark-border"
                    onChange={onChange}
                />
            </div>
            <div className="spacer m-4" />
            <div className="border-solid border border-dark-border" />
            <div className="spacer m-4" />
            <div className="create-cards flex flex-col space-y-4 mx-4">
                <div className="card flex flex-col space-y-4">
                    {cards.map((card, index) => (
                        <div key={`${card.order}`} className={'flex flex-col space-y-4'} id={index.toString()}>
                            <Card
                                cardNumber={index + 1}
                                props_question={card.question}
                                props_answer={card.answer}
                                // dragStart={handleDragStart}
                                // handleDrop={handleDrop}
                                change={modifyCard}
                                deleteCard={deleteCard}
                            />
                            <div
                                className="cursor-pointer dark:bg-dark-bg dark:hover:bg-dark-bg-hover p-4 rounded-md border-2 dark:border-dark-border text-center"
                                onClick={() => {
                                    newCard(index + 1);
                                }}
                            >
                                <a className="dark:text-dark-text">+</a>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-row space-x-4">
                    <div className="basis-1/2 card-add flex flex-col space-y-4 rounded-md border-2 dark:border-dark-border">
                        <input
                            name={'cardsAddQty'}
                            type={'number'}
                            placeholder={'card number'}
                            className={'p-4 dark:bg-dark-bg-secondary dark:hover:bg-dark-bg-secondary-hover rounded-md text-center dark:text-dark-text'}
                            onChange={onChange}
                            value={cardsAddQty}
                        />
                    </div>
                    <div
                        className="basis-1/2 card-add flex flex-col items-center justify-center space-y-4 dark:bg-dark-bg-secondary p-4 rounded-md cursor-pointer dark:hover:bg-dark-bg-secondary-hover border-2 dark:border-dark-border"
                        onClick={() => {
                            newCardFor(cardsAddQty);
                            console.log(`requested ${cardsAddQty}`);
                        }}
                    >
                        <a className="text-center dark:text-dark-text">add card</a>
                    </div>
                </div>
                <div
                    className="set-submit flex flex-col space-y-4 dark:bg-dark-bg-secondary p-4 rounded-md cursor-pointer dark:hover:bg-dark-bg-secondary-hover border-2 dark:border-dark-border"
                    onClick={async () => {
                        await submitSet();
                    }}
                >
                    <a className="text-center dark:text-dark-text">submit</a>
                </div>
            </div>
        </div>
    );
};

export default Home;
