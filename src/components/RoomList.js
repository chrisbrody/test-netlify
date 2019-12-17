import React from 'react';
import Room from './Room';

export default function RoomList({rooms}) {
    if(rooms.length === 0) {
        return (
            <div className="empty-seach">
                <h3>unfortunately no rooms matched your search parameters</h3>
            </div>
        )
    }

    return <section className="roomslist">
        <div className="roomslist-center">
            {
                rooms.map(item => {
                    return <Room key={item.id} room={item} />
                })
            }
        </div>
    </section>
}


// CLASS BASED DISPLAYING DATA FROM CONTEXT

// import React, { Component } from 'react';
// import { RoomContext } from '../context'; 
// import Loading from './Loading';
// import Room from './Room';

// export default class RoomList extends Component {
//     static contextType = RoomContext

//     render() {
//         let { loading, rooms } = this.context
//         rooms = rooms.map(room => {
//             return <Room key={room.id} room={room} />
//         })

//         return (
//             <div>
//                 {rooms}
//             </div>
//         )
//     }
// }

