import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import './OneOne.css';
import Book from '../Book/Book';
import text_merge from './../../assets/images/text_under.svg';
import copyright_symbol from './../../assets/images/copyright_symbol.svg';
import button_arrow from './../../assets/images/button_arrow.svg';
import { useLayoutEffect, useState } from 'react';




const OneOne = () => {

    const oneOne = useLoaderData();

    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    });

    const [book, setBook] = useState({});

    const handleBook = event => {
        event.preventDefault();

        fetch('http://localhost:5000/one_one', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(book)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    alert('Book Added Successfully');
                    event.target.reset();
                }
            })
    }


    const handleInputBlur = event => {
        const field = event.target.name;
        const value = event.target.value;
        const newBook = { ...book }
        newBook[field] = value;
        setBook(newBook);
    }



    return (
        <div className='container'>

            <img className='book-merge' src={text_merge} alt="book" />
            <div className="main-text book-header">
                <Link to="/">
                    <img className='rotate' src={button_arrow} alt="" />
                </Link>
                <div className='selected'>
                    1st year Odd semester
                </div>
            </div>

            <form onSubmit={handleBook}>
                <div className='form-group mt-2'>
                    <input onBlur={handleInputBlur} className='form-input' type="text" name='image' placeholder='image_url' required />
                </div>

                <div className='form-group mt-2'>
                    <input onBlur={handleInputBlur} className='form-input' type="text" name='name' placeholder='name' required />

                </div>

                <div className='form-group mt-2'>
                    <input onBlur={handleInputBlur} className='form-input' type="text" name='book_url' placeholder='book_url' required />
                </div>

                <button className='btn submit mt-2' type="submit">Add Book</button>
            </form>

            <div className="container">
                <div className="cards">
                    {
                        oneOne.map((each_book, id) => <Book key={id + 1} each_book={each_book}></Book>)
                    }
                </div>
            </div>



            <div className='copyright-section footer-book-gap'>
                <img src={copyright_symbol} alt="" />
                <div className='copyright-text'>
                    2023 All Rights Reserved - Fair & Turag
                </div>
            </div>

        </div>
    );
};

export default OneOne;