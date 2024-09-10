# Shoowflix

> [Shoowflix](https://shoowflix.vercel.app/) is a modern web application for streaming and discovering your favorite movies . Built with cutting-edge technologies, Shoowflix provides a seamless user experience and an engaging interface for entertainment enthusiasts.

### Features

- Movie Catalog: Browse a comprehensive catalog of movies.
- Search Functionality: Quickly find your favorite content using the search feature.
- User Authentication: Secure login and registration for personalized experiences.
- Responsive Design: Fully responsive interface compatible with various devices.
- User Reviews: Read and write reviews movies.
- Watchlist: Save and manage your favorite content in a watchlist.

### Technologies

- Frontend: Next.js, Vite
- Backend: Node.js, Express, Next.js
- Database: MongoDB
- ORM: Prisma
- Authentication: JWT (JSON Web Tokens), Next Auth
- Hosting: Vercel

## Installation

#### Prerequisites

Ensure you have the following installed:

- Node.js (v16 or later)
- npm or yarn

### Code Setup

1. Clone the repository

```
git clone https://github.com/shubhlpu16/shoowflix.git
```

2. Navigate to folder

```
cd shoowflix
```

3. Install Dependencies

```
npm i
```

4. Start development server

```
npm run dev
```

### Usage

Once the servers is running, navigate to http://localhost:3000 to access the ShoowFlix application. You can start exploring, searching, and managing your favorite content!

### Contributing

We welcome contributions to ShoowFlix! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes and test them thoroughly.
4. Submit a pull request with a clear description of your changes.

### License

Shoowflix is licensed under the MIT License. See LICENSE for more information.

### Contact

For any inquiries or issues, please contact us at shubh.lpu16@gmail.com


### For Setting up Mongo on Docker we need replicaSet setup.

Run Command: docker compose up
then: npx prisma db push

Use below url:
DATABASE_URL=mongodb://localhost:27017/showflix?replicaSet=rs0&retryWrites=true&w=majority&directConnection=true
=======

###
Service Workers are scripts that your browser runs in the background, separate from a web page. 
Sits between your web app on browser and network.(Acts as proxy servers)
They enable features that don’t need a web page or user interaction, like push notifications and background sync.

Web Push is a technology that allows servers to send messages to web applications, even when the web app is not open in the browser. (Sends via SW)

Web push notifications rely on active service workers to function.

How Web Push Works with Active Service Workers?
1. User Subscription: The user subscribes to push notifications through the browser.
2. Subscription Information: The browser sends the subscription information to the server.
3. Push Message and Push Service: When the server has a message to send, it sends the push message via push service and push service delivers the message to the browser.
4. Service Worker Activation: The browser wakes up the service worker to handle the incoming push message.
5. Notification Display: The service worker processes the message and displays a notification to the user.

