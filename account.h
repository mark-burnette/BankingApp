#ifndef ACCOUNT_H
#define ACCOUNT_H

class Account
{
private:
    double balance;

public:
    Account();
    Account(double balance);

    double getBalance();
    void setBalance(double balance);

    virtual void print() = 0;

    virtual void withdraw(double amount) = 0;
    void deposit(double amount);
};

class SavingsAccount : public Account
{
private:
public:
    void print() override;
    void withdraw(double amount) override;
};

class CheckingAccount : public Account
{
private:
public:
    void print() override;
    void withdraw(double amount) override;
};

#endif