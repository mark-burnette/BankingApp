#ifndef CUSTOMER_H
#define CUSTOMER_H

#include "user.h"
#include "account.h"
#include <vector>

class Customer : public User
{
private:
    std::vector<Account*> accounts{};
public:
    Customer(unsigned int id, std::string_view name, std::string_view username, std::string_view password);
    ~Customer() override;
    void greet() override;
};

#endif