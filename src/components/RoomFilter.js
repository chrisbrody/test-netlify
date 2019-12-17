import React from 'react';
import {useContext} from 'react';
import {RoomContext} from '../context';
import Title from '../components/Title';

// get unige type
const getUnique = (items, value)=>{
    return[...new Set(items.map(item => item[value]))]
}

export default function RoomFilter({rooms}) {
    const context = useContext(RoomContext)
    const { handleChange, type, capacity, price, minPrice, maxPrice, minSize, maxSize, breakfast, pets } = context
    // get unique types
    let types = getUnique(rooms, 'type');
    // add those unique types
    types = ['all',...types]
    // map to jsx
    types = types.map((item, index) => {
        return <option value={item} key={index}>{item}</option>
    })

    let people = getUnique(rooms, 'capacity')

    people = people.map((item, index) => {
        return <option key={index} value={item}>{item}</option>
    })

    return (
        <section className="filter-container">
            <Title title="search rooms" />
            <form className="filter-form">
                {/* select type */}
                <div className="form-group">
                    <label htmlFor="type">room type</label>
                    <select 
                        name="type" 
                        id="type" 
                        value={type} 
                        className="form-control" 
                        onChange={handleChange}
                    >
                        {types}
                    </select>
                </div>

                {/* guests */}
                <div className="form-group">
                    <label htmlFor="type">Guests</label>
                    <select 
                        name="capacity" 
                        id="capacity" 
                        value={capacity} 
                        className="form-control" 
                        onChange={handleChange}
                    >
                        {people}
                    </select>
                </div>

                {/* price */}
                <div className="form-group">
                    <label htmlFor="price">Price: ${price}</label>
                    <input type="range" name="price" min={minPrice} max={maxPrice} id="price" className="form-control" value={price} onChange={handleChange} /> 
                </div>

                {/* size */}
                <div className="form-group">
                    <label htmlFor="size">room size</label>
                    <input type="number" name="minSize" id="size" className="size-input" value={minSize} onChange={handleChange} /> 
                    <input type="number" name="maxSize" id="size" className="size-input" value={maxSize} onChange={handleChange} /> 
                </div>

                {/* breakfast */}
                <div className="form-group">
                    <div className="single-extra">
                        <input type="checkbox" name="breakfast" id="breakfast" value={breakfast} checked={breakfast} onChange={handleChange} /> 
                        <label htmlFor="breakfast">Breakfast</label>
                    </div>
                    <div className="single-extra">
                        <input type="checkbox" name="pets" id="pets" value={pets} checked={pets} onChange={handleChange} /> 
                        <label htmlFor="pets">pets</label>
                    </div>
                </div>
            </form>
        </section>
    )
}
