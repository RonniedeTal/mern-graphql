# Merngraphql

**Merngraphql** is a MERN stack application (MongoDB, Express, React, Node.js) that allows you to manage clients and projects, with a complete CRUD and the ability to link them together. The project uses **GraphQL** on the backend and **Apollo Client** on the frontend.

---

## 📂 Project Structure

```yaml
merngraphql/
├─ client/ # Frontend with React and Apollo Client
├─ server/ # Backend with Node.js, Express, and GraphQL
└─ README.md
```

---

## 🛠 Technologies Used

- **Frontend:** React, Apollo Client
- **Backend:** Node.js, Express, GraphQL
- **Database:** MongoDB (Mongo Atlas)

---

## ⚡ Installation

### 1. Clone the repository

```bash
git clone <REPOSITORY_URL>
cd merngraphql
```
### 2. Install dependencies
#### Backend (server)
```bash
cd server
npm install
```
#### Frontend (client)
```bash
cd ../client
npm install
```
### 3. Configure environment variables
Create a `.env` file in the `server` folder with your MongoDB credentials:

```env
MONGO_URI=your_mongo_atlas_uri
PORT=5000
```
### 4. Run the application
#### Backend
```bash
cd server
npm run dev
```
#### Frontend
```bash
cd client
npm start
```
The application will be available at http://localhost:3000.

## 💻 Using Apollo Client
### Queries
```javascript
import { gql } from "@apollo/client";

const GET_CLIENTS = gql`
  query getClients {
    clients {
      id
      name
      email
      phone
    }
  }
`;

export { GET_CLIENTS };
```
### Mutations
```javascript
import { gql } from "@apollo/client";

const ADD_CLIENT = gql`
  mutation addClient($name: String!, $email: String!, $phone: String!) {
    addClient(name: $name, email: $email, phone: $phone) {
      id
      name
      email
      phone
    }
  }
`;

const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id) {
      id
      name
      email
      phone
    }
  }
`;

export { ADD_CLIENT, DELETE_CLIENT };
```
### 🔗 Example usage in React with Apollo Client
```javascript
import { useQuery, useMutation } from "@apollo/client";
import { GET_CLIENTS, ADD_CLIENT, DELETE_CLIENT } from "./queries";

function App() {
  const { data, loading, error } = useQuery(GET_CLIENTS);
  const [addClient] = useMutation(ADD_CLIENT);
  const [deleteClient] = useMutation(DELETE_CLIENT);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleAddClient = () => {
    addClient({ variables: { name: "John", email: "john@email.com", phone: "123456789" } });
  };

  const handleDeleteClient = (id) => {
    deleteClient({ variables: { id } });
  };

  return (
    <div>
      <h1>Clients</h1>
      <ul>
        {data.clients.map(client => (
          <li key={client.id}>
            {client.name} - {client.email}
            <button onClick={() => handleDeleteClient(client.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddClient}>Add Client</button>
    </div>
  );
}

export default App;
```
## 🚀 Features
- Complete CRUD for Clients and Projects
- Relationship between clients and projects
- Backend with GraphQL and Apollo Server
- Frontend with React and Apollo Client
