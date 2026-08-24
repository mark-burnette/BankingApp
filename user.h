#ifndef USER_H
#define USER_H

#include <iostream>
#include <string>
#include <string_view>

class User
{
private:
    unsigned int id;
    std::string name;
    std::string username;
    std::string password;

public:
    User(unsigned int id, std::string_view name, std::string_view username, std::string_view password);
    ~User();
    std::string_view getName();
    std::string_view getUsername();
    int login(std::string_view password);
    void greet();
};

#endif