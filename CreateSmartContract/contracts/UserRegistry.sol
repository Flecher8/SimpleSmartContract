// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract UserRegistry {
    // Структура для представлення користувача
    struct User {
        string name;
        string data;
    }

    // Мапа для збереження користувачів
    mapping(address => User) public users;

    // Подія для відслідковування реєстрації користувачів
    event UserRegistered(address indexed user, string name);

    // Функція реєстрації користувача
    function registerUser(string memory name) public {
        require(bytes(name).length > 0, "Name cannot be empty");

        User storage newUser = users[msg.sender];
        newUser.name = name;

        emit UserRegistered(msg.sender, name);
    }

    // Функція отримання даних користувача за адресою
    function getUserData(address userAddress) public view returns (string memory, string memory) {
        User storage user = users[userAddress];
        return (user.name, user.data);
    }
}