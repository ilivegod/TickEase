// Mock data for events
const events = [
  {
    id: "1",
    title: "Summer Music Festival",
    date: "15",
    month: "Aug",
    location: "Accra",
    subLocation: "Garage night club",
    organizer: "Rock Waves Production",
    category: "Music",
  },
  {
    id: "2",
    title: "Tech Conference 2024",
    date: "20",
    month: "Sept",
    location: "Accra",
    subLocation: "Garage night club",
    organizer: "Viewer Arts Group",

    category: "Technology",
  },
  {
    id: "3",
    title: "Food & Wine Festival",
    date: "5",
    month: "Oct",
    location: "Accra",
    subLocation: "Garage night club",
    organizer: "BET",
    category: "Food",
    image: "https://your-image-url.com/3",
  },
  {
    id: "4",
    title: "Summer Music Festival",
    date: "15",
    month: "Aug",
    location: "Accra",
    subLocation: "Garage night club",
    organizer: "Rock Waves Production",

    category: "Music",
  },
  {
    id: "5",
    title: "Tech Conference 2024",
    date: "20",
    month: "Sept",
    location: "Accra",
    subLocation: "Garage night club",
    organizer: "Viewer Arts Group",
    category: "Technology",
  },
  {
    id: "6",
    title: "Food & Wine Festival",
    date: "5",
    month: "Oct",
    location: "Accra",
    subLocation: "Garage night club",
    organizer: "BET",
    category: "Food",
    image: "https://your-image-url.com/3",
  },
];

// Mock data for featured events
const featuredEvents = [
  {
    id: "1",
    title: "Summer Music Festival",
    date: "Jun 15-17",
    location: "Central Park",
    price: "$85.00",
    image: "https://picsum.photos/id/1035/300/150",
    category: "event",
  },
  {
    id: "2",
    title: "Basketball Championship",
    date: "Jul 22",
    location: "Sports Arena",
    price: "$65.00",
    image: "https://picsum.photos/id/1058/300/150",
    category: "sport",
  },
  {
    id: "3",
    title: "MTN FA CUP Championship",
    date: "Jul 25",
    location: "Accra Stadium",
    price: "$25.00",
    image: "https://picsum.photos/id/1058/300/150",
    category: "sport",
  },
];

// Mock data for transport options
const transportOptions = [
  {
    id: "1",
    title: "Trotro Pass",
    type: "Monthly",
    price: "$120.00",
    image: "https://picsum.photos/id/416/100/100",
  },
  {
    id: "2",
    title: "Bus Ticket",
    type: "Single Journey",
    price: "$2.50",
    image: "https://picsum.photos/id/417/100/100",
  },
  {
    id: "3",
    title: "Train Ticket",
    type: "Round Trip",
    price: "$45.00",
    image: "https://picsum.photos/id/418/100/100",
  },
];

// Mock data for recommended events based on user preferences
const recommendedEvents = [
  {
    id: "1",
    title: "Jazz Night Downtown",
    date: "May 25",
    location: "Blue Note Club",
    price: "$35.00",
    image: "https://picsum.photos/id/1082/300/150",
  },
  {
    id: "2",
    title: "Modern Art Exhibition",
    date: "Jun 3-10",
    location: "Metropolitan Museum",
    price: "$22.00",
    image: "https://picsum.photos/id/1068/300/150",
  },
];

// mock data for promotions
const promotions = [
  {
    id: "1",
    title: "Early Bird Special",
    description: "20% off on all concert tickets",
    expiryDate: "Expires in 3 days",
    backgroundColor: "#FFE1E1",
    textColor: "#FF4D4D",
    icon: "pricetag",
  },
  {
    id: "2",
    title: "Weekend Pass",
    description: "Unlimited transport all weekend",
    expiryDate: "Expires this Sunday",
    backgroundColor: "#E1F5FE",
    textColor: "#0288D1",
    icon: "time",
  },
];

// quick access mock data
const quickAccess = [
  {
    id: "4",
    title: "Event Tickets",
    icon: "calendar",
    color: "#9C27B0",
    route: "event-tickets",
  },
  {
    id: "1",
    title: "Transport Pass",
    icon: "bus",
    color: "#4CAF50",
    route: "event-tickets",
  },
  {
    id: "2",
    title: "Movie Tickets",
    icon: "film",
    color: "#FF9800",
    route: "event-tickets",
  },
  {
    id: "3",
    title: "Sport Tickets",
    icon: "football",
    color: "#2196F3",
    route: "event-tickets",
  },
];

export {
  events,
  featuredEvents,
  transportOptions,
  recommendedEvents,
  promotions,
  quickAccess,
};
