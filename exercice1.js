// Simule la récupération des commandes d'un utilisateur après un délai
async function fetchUserOrders(userLogin) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const ordersData = {
                'Lorraine123': [
                    { orderId: 101, product: 'Ordinateur Portable', quantity: 1, price: 7000 },
                    { orderId: 102, product: 'Souris sans fil', quantity: 1, price: 200 }
                ],
                'Jhonny123': [
                    { orderId: 201, product: 'Téléphone', quantity: 1, price: 5000 },
                    { orderId: 202, product: 'Écouteurs Bluetooth', quantity: 1, price: 300 }
                ],
                'Paul567': [
                    { orderId: 301, product: 'Tablette', quantity: 1, price: 4000 },
                    { orderId: 302, product: 'Clavier mécanique', quantity: 1, price: 600 }
                ]
            };

            // Retourner les commandes spécifiques à l'utilisateur
            resolve(ordersData[userLogin] || []);
        }, 2000);
    });
}

// Fonction pour hasher le mot de passe
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

// Fonction asynchrone pour récupérer plusieurs utilisateurs après un délai
async function fetchUsersData() {
    return new Promise((resolve) => {
        setTimeout(async () => {
            const users = [
                {
                    name: 'RAHELIARISOA Andriamasy Lorraine Agnès',
                    email: 'lorraine@gmail.com',
                    avatar: 'images/avatar1.jpeg',
                    gender: 'F',
                    login: 'Lorraine123',
                    password: await hashPassword('securepassword1'),
                    address: 'Boukhalef Irfane 2, Tanger'
                },
                {
                    name: 'RAZAFINDRAIBE Jhonny',
                    email: 'jhonny@gmail.com',
                    avatar: 'images/avatar2.jpeg',
                    gender: 'H',
                    login: 'Jhonny123',
                    password: await hashPassword('securepassword2'),
                    address: 'Médina, Rabat'
                },
                {
                    name: 'RAKOTO Paul',
                    email: 'paul@gmail.com',
                    avatar: 'images/avatar3.jpeg',
                    gender: 'H',
                    login: 'Paul567',
                    password: await hashPassword('securepassword3'),
                    address: 'Tananarive, Madagascar'
                }
            ];
            resolve(users);
        }, 2000);
    });
}

// Fonction pour afficher le profil individuel d'un utilisateur
function displayUserProfile(user) {
    const profileContainer = document.getElementById('profile');
    profileContainer.innerHTML = `
        <div style="border: 1px solid #007bff; padding: 20px; margin-bottom: 20px; background-color: #f9f9f9;">
            <img src="${user.avatar}" alt="${user.name}" style="width: 100px; height: 100px; border-radius: 50%; margin: 10px;">
            <h2>${user.name}</h2>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Genre:</strong> ${user.gender}</p>
            <p><strong>Adresse:</strong> ${user.address}</p>
        </div>
    `;
}

// Fonction pour afficher les commandes d'un utilisateur
function displayUserOrders(orders) {
    const ordersContainer = document.getElementById('orders');
    let ordersHTML = `
        <h3>Commandes de l'utilisateur</h3>
        <table border="1">
            <tr>
                <th>ID de la commande</th>
                <th>Produit</th>
                <th>Quantité</th>
                <th>Prix</th>
            </tr>
    `;
    orders.forEach(order => {
        ordersHTML += `
            <tr>
                <td>${order.orderId}</td>
                <td>${order.product}</td>
                <td>${order.quantity}</td>
                <td>${order.price} DH</td>
            </tr>
        `;
    });
    ordersHTML += '</table>';
    ordersContainer.innerHTML = ordersHTML;
}

// Fonction pour afficher les utilisateurs dans un tableau avec un bouton "Voir le profil"
function displayUsersTable(users) {
    const usersContainer = document.getElementById('users');
    let tableHTML = `
        <h3>Liste des utilisateurs</h3>
        <table border="1">
            <tr>
                <th>Avatar</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Genre</th>
                <th>Login</th>
                <th>Adresse</th>
                <th>Mot de passe hashé</th>
                <th>Action</th>
            </tr>
    `;
    users.forEach((user, index) => {
        tableHTML += `
            <tr>
                <td><img src="${user.avatar}" width="50" height="50"></td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.gender}</td>
                <td>${user.login}</td>
                <td>${user.address}</td>
                <td>${user.password}</td>
                <td><button onclick="loadUserProfile(${index})">Voir le profil</button></td>
            </tr>
        `;
    });
    tableHTML += '</table>';
    usersContainer.innerHTML = tableHTML;
}

// Fonction pour charger le profil et les commandes d'un utilisateur sélectionné
async function loadUserProfile(index) {
    try {
        const users = await fetchUsersData();
        const selectedUser = users[index];

        // Afficher le profil de l'utilisateur sélectionné
        displayUserProfile(selectedUser);

        // Récupérer et afficher ses commandes
        const userOrders = await fetchUserOrders(selectedUser.login);
        displayUserOrders(userOrders);
    } catch (error) {
        console.error('Erreur lors du chargement du profil:', error);
    }
}

// Charger les données utilisateurs lors du chargement de la page
async function loadUsersData() {
    try {
        const users = await fetchUsersData(); // Récupère les utilisateurs
        displayUsersTable(users); // Affiche la liste des utilisateurs
    } catch (error) {
        console.error('Erreur lors du chargement des utilisateurs:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadUsersData);
