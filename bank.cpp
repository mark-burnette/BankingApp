#include "bank.h"
#include "customer.h"
#include "admin.h"

#include <iostream>

Bank::Bank() : user{nullptr}, users{} {
    // seed bank with users
    users.push_back(new Customer(0, "Customer", "customer", "customerpassword"));
    users.push_back(new Admin(1, "Admin", "admin", "adminpassword"));

    // seed users with accounts
    auto customerChecking = new CheckingAccount();
    customerChecking->setBalance(120.00);

    auto customerSavings = new SavingsAccount();
    customerSavings->setBalance(900.00);

    users[0]->getAccounts().push_back(customerChecking);
    users[0]->getAccounts().push_back(customerSavings);

    login();

    if (dynamic_cast<Customer*>(user)) {
        customerDashboard();
    }
    else {
        adminDashboard();
    }
}

Bank::~Bank() {
    for (auto& user : users)
        delete user;
}

void Bank::login() {
    std::cout << "Welcome to the banking application." << std::endl;
    std::cout << "Please enter your credentials." << std::endl;

    std::string name{};
    std::string username{};
    std::string password{};

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
}

void Bank::customerDashboard() {
    int option = -1;

    while (option != 4) {
        std::cout << "-------" << std::endl;
        std::cout << "1: List Accounts" << std::endl;
        std::cout << "2: Deposit" << std::endl;
        std::cout << "3: Withdraw" << std::endl;
        std::cout << "4: Exit" << std::endl;
        std::cout << "-------" << std::endl;
        std::cout << "Select an option: ";

        std::cin >> option;

        switch (option) {
        case 1: {
            auto accounts = user->getAccounts();
            if (accounts.empty()) {
                std::cerr << "No accounts to list." << std::endl;
                break;
            }

            for (int i = 0; i < accounts.size(); i++) {
                std::cout << i << ": ";
                accounts[i]->print();
            }

            break;
        }
        case 2: {
            std::cout << "Select account:" << std::endl;
            unsigned int i;
            std::cin >> i;

            auto accounts = user->getAccounts();
            if (i >= accounts.size()) {
                std::cerr << "Invalid account number." << std::endl;
                break;
            }

            std::cout << "Enter amount to deposit: ";
            double amount;
            std::cin >> amount;

            accounts[i]->deposit(amount);
            break;
        }
        case 3: {
            std::cout << "Select account:" << std::endl;
            unsigned int i;
            std::cin >> i;

            auto accounts = user->getAccounts();
            if (i >= accounts.size()) {
                std::cerr << "Invalid account number." << std::endl;
                break;
            }

            std::cout << "Enter amount to withdraw ($$.$$): ";
            double amount;
            std::cin >> amount;

            accounts[i]->withdraw(amount);
            break;
        }
        }
    }
}

void Bank::adminDashboard() {
    // TODO
}