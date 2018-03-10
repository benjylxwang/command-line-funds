DELIMITER $$
CREATE TRIGGER update_accounts AFTER INSERT ON transactions
FOR EACH ROW 
BEGIN
	UPDATE accounts SET Balance = Balance + NEW.Amount WHERE ID = NEW.AccountTo;
	UPDATE accounts SET Balance = Balance - NEW.Amount WHERE ID = NEW.AccountFrom;
END
$$
DELIMITER ;