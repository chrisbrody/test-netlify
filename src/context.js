import React, { Component } from 'react';
// uncomment for local items, and change rooms variable to items instead of response.items
// import items from './data';
import Client from './Contentful';

    // test access to contently
    Client.getEntries({
        content_type: 'beachResortRoom'
    }).then(response => console.log(response));


const RoomContext = React.createContext();

class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading:  true,
        type: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false,
    };

    // get data from contently
    getData = async () => {
        try {
            let response = await Client.getEntries({ 
                content_type: 'beachResortRoom',
                order: 'sys.createdAt' 
            });
            let rooms = this.formatData(response.items)
            let featuredRooms = rooms.filter(room => room.featured === true);
            let maxPrice = Math.max(...rooms.map(item => item.price));
            let maxSize = Math.max(...rooms.map(item => item.size));

            this.setState({
                rooms, 
                featuredRooms,
                sortedRooms: rooms,
                loading: false,
                maxPrice,
                maxSize
            })  ;
        } catch (error) {
            console.log(error);
            
        }
    }

    componentDidMount() {
        // get data when RoomProvider mounts to main Component
        this.getData();
    }

    formatData(items) {
        // store a temp item from individual items
        let tempItems = items.map(item => {
            // store id
            let id = item.sys.id;
            // store images
            let images = item.fields.images.map(image => image.fields.file.url);

            // store entire room
            let room = {...item.fields, images, id};
            // return formatted room data
            return room;
        });
        // return array of formatted room data
        return tempItems;
    }

    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find(room => room.slug === slug);
        return room;
    }

    handleChange = event => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = event.target.name;
        // set value for all search properties and callback function of filterRooms
        this.setState(
            {
                [name]: value
            },
            this.filterRooms
        );
        // console.log(`this is ${target}, this is ${name}, this is ${value}`)
    }
    filterRooms = () => {
        // get data frmo state to manipulate
        let {rooms, type, capacity, price, minSize, maxSize, breakfast, pets} = this.state;

        // store all the rooms in temp rooms variable
        let tempRooms = [...rooms];
        // make sure capacity is a number
        capacity = parseInt(capacity);

        // filter by type
        if(type !== 'all') {
            // filter rooms with type === to current selected type (single, double, family, presidential)
            tempRooms = tempRooms.filter(room => room.type === type);
        }

        // filter by capacity
        if(capacity !== 1) {
            tempRooms = tempRooms.filter(room => room.capacity >= capacity);
        }

        // filter by price
        tempRooms = tempRooms.filter(room => room.price >= price);
        
        // filter by size
        tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize)

        // filter by breakfast
        if(breakfast){
            tempRooms = tempRooms.filter(room => room.breakfast === true)
        }

        // filter by pets
        if(pets){
            tempRooms = tempRooms.filter(room => room.pets === true)
        }
        
        //  update this.setState
        this.setState({sortedRooms: tempRooms})   
    }

    render() {
        return (
            <RoomContext.Provider 
                value={{
                    ...this.state,
                    getRoom : this.getRoom,
                    handleChange: this.handleChange
                }}
            >
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
    return function ConsumerWrapper(props) {
        return <RoomConsumer>
            {value => <Component {...props} context={value} />}
        </RoomConsumer>
    }
}

export { RoomProvider, RoomConsumer, RoomContext }
