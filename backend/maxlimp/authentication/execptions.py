class UserAlreadyExistsError(Exception):
    """Exceção levantada quando tenta-se criar um usuário com um email já existente."""
    pass

class ORMError(Exception):
    """Exceção levantada quando ocorre um erro na camada ORM."""
    pass
