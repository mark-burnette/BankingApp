#include "customer.h"

Customer::Customer(unsigned int id, std::string_view name, std::string_view username, std::string_view password) :
    User(id, name, username, password) {
}

Customer::~Customer() {

}

void Customer::greet() {
    std::cout << "Welcome to the customer dashboard, " << getName() << "." << std::endl;
}