import React, { Component } from 'react';
import { RoomContext } from '../context'; 
import Loading from './Loading';
import Room from './Room';
import Title from './Title';

export default class FeaturedRooms extends Component {
    static contextType = RoomContext
    
    render() {
        // get loading and set featuredRooms
        let { loading, featuredRooms: rooms } = this.context;
        // update rooms using .map function
        rooms = rooms.map(room => {
            return <Room key={room.id} room={room} />
        })

        return (
            <section className="featured-rooms">
                <Title title="featured rooms" />
                <div className="featured-rooms-center">
                    {loading ? <Loading /> : rooms}
                </div>
            </section>
        )
    }
}
