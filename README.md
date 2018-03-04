# custom-funds

Feature list:
* Register as a user
* Login as a user (HTTP Basic Auth used)
* Create new account (Current, Savings, etc.)
* Create in/out categories


Database design:
* User Table
    * ID
    * Other fields
        * Username
        * Name
        * Email address
        * Hashed & Salted Password
* Accounts Table
    * ID
    * Other fields
        * Name
        * Type
        * Balance
        * Currency
        * Owner
* Transactions Table
    * ID
    * Other fields
        * Description
        * Account From
        * Account To
        * Type
        * Amount
        * Currency
