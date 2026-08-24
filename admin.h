#ifndef ADMIN_H
#define ADMIN_H

#include "user.h"

class Admin : public User
{
private:
public:
    Admin(unsigned int id, std::string_view name, std::string_view username, std::string_view password);
    ~Admin() override;
    void greet() override;
};

#endif