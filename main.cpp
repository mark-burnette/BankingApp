#include "user.h"
#include <vector>

int main() {
    std::vector<User*> users {};
    users.push_back(new User(0, "User1", "username1", "password1"));
    users.push_back(new User(1, "User2", "username2", "password2"));

    std::cout << "Welcome to the banking application." << std::endl;
    std::cout << "Please enter your credentials." << std::endl;

    std::string name {};
    std::string username {};
    std::string password {};

    User* user = nullptr;

    while (!user) {
        std::cout << "Username: ";
        std::cin >> username;

        std::cout << "Password: ";
        std::cin >> password;

        for (const auto& u : users) {
            if (u->getUsername() == username) {
                user = u;
                break;
            }
        }

        if (user == nullptr) {
            std::cerr << "Invalid username." << std::endl;
            continue;
        }

        if (-1 == user->login(password))
            user = nullptr;
    }

    for (auto& user : users)
        delete user;

    return 0;
}