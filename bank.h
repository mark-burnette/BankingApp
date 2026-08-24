#ifndef BANK_H
#define BANK_H

#include "user.h"
#include <vector>

class Bank
{
private:
    User* user;
    std::vector<User*> users{};
public:
    Bank();
    ~Bank();
    void login();
    void customerDashboard();
    void adminDashboard();
};

#endif