#include "admin.h"

Admin::Admin(unsigned int id, std::string_view name, std::string_view username, std::string_view password) :
    User(id, name, username, password) {
}

Admin::~Admin() {

}

void Admin::greet() {
    std::cout << "Welcome to the admin dashboard, " << getName() << "." << std::endl;
}