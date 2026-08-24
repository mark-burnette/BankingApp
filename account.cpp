#include "account.h"
#include <iostream>

Account::Account() : balance {0.0} {
}

Account::Account(double balance) : balance {balance} {
}

double Account::getBalance() {
    return balance;
}

void Account::setBalance(double balance) {
    this->balance = balance;
}


void SavingsAccount::withdraw(double amount) {
    double bal = getBalance();
    if (bal - amount < 0.0) {
        std::cerr << "Error: Insufficient funds." << std::endl;
        return;
    }

    setBalance(bal - amount);
    std::cout << "Your new balance is: " << getBalance() << std::endl;
}


void CheckingAccount::withdraw(double amount) {
    setBalance(getBalance() - amount);
}