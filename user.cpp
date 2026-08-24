#include "user.h"

User::User(unsigned int id, std::string_view name, std::string_view username, std::string_view password)
    : id{id}, name{name}, username{username}, password{password}, accounts{} {
}

User::~User() {
}

unsigned int User::getId() {
    return id;
}

std::string_view User::getName() {
    return name;
}

std::string_view User::getUsername() {
    return username;
}

std::vector<Account*>& User::getAccounts() {
    return accounts;
}

int User::login(std::string_view password) {
    if (password != this->password) {
        std::cerr << "Invalid password." << std::endl;
        return -1;
    }

    greet();
    return 0;
}