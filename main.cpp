#include <iostream>
#include <string>
#include <string_view>
#include <vector>

class Bank
{
};

class User
{
private:
    unsigned int id;
    std::string name;
    std::string username;
    std::string password;

public:
    User(unsigned int id, std::string_view name, std::string_view username, std::string_view password) :
        id{id}, name{name}, username{username}, password{password} {
    }

    ~User() {

    }

    std::string_view getName() {
        return name;
    }

    std::string_view getUsername() {
        return username;
    }

    int login(std::string_view password) {
        if (password != this->password) {
            std::cerr << "Invalid password." << std::endl;
            return -1;
        }

        greet();
        return 0;
    }

    void greet() {
        std::cout << "Welcome, " << name << "." << std::endl;
    }
};

class Admin : public User
{
};

class Customer : public User
{
};

class Account
{
    // TODO: abstract
};

class SavingsAccount : public Account
{
};

class CheckingsAccount : public Account
{
};

int main()
{
    std::vector<User*> users{};
    users.push_back(new User(0, "name", "username", "password"));

    std::cout << "Welcome to the banking application." << std::endl;
    std::cout << "Please enter your credentials." << std::endl;

    std::string name{};
    std::string username{};
    std::string password{};

    User* user = nullptr;

    while (!user) {
        std::cout << "Username: ";
        std::cin >> username;

        std::cout << "Password: ";
        std::cin >> password;

        std::cout << name << " " << username << " " << password << std::endl;

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

        if (-1 == user->login(password)) {
            std::cerr << "Invalid password." << std::endl;
            user = nullptr;
        }
    }

    for (auto& user : users)
        delete user;

    return 0;
}