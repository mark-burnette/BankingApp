class Account
{
private:
    double balance;

public:
    Account();
    Account(double balance);

    double getBalance();
    void setBalance(double balance);

    virtual void withdraw(double amount) = 0;
};

class SavingsAccount : public Account
{
private:
public:
    void withdraw(double amount);
};

class CheckingAccount : public Account
{
private:
public:
    void withdraw(double amount);
};
