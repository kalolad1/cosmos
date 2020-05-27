from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models


class AccountManager(BaseUserManager):
    """Manager for the Account class."""

    def create_user(self, email: str, password: str) -> 'Account':
        """Create a user."""
        if not email:
            raise ValueError('User must provide an email.')

        if not password:
            raise ValueError('User must provide a password.')

        normalized_email: str = self.normalize_email(email=email)
        user: Account = self.model(email=normalized_email)
        user.set_password(raw_password=password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email: str, password: str) -> 'Account':
        """Create a superuser. Superusers can log into the admin platform."""
        superuser: Account = self.create_user(email=email, password=password)
        superuser.is_admin = True
        superuser.is_superuser = True
        superuser.save(using=self._db)
        return superuser


class Account(AbstractBaseUser):
    """The Base User account."""
    email: models.EmailField = models.EmailField(max_length=60, unique=True)
    date_joined: models.DateTimeField = models.DateTimeField(auto_now_add=True)
    is_active: models.BooleanField = models.BooleanField(default=True)
    is_admin: models.BooleanField = models.BooleanField(default=False)
    is_superuser: models.BooleanField = models.BooleanField(default=False)

    objects: AccountManager = AccountManager()

    # Specify which field the user will log in with.
    USERNAME_FIELD: str = 'email'
    EMAIL_FIELD: str = 'email'

    def __str__(self) -> models.CharField:
        return self.email

    def is_staff(self) -> models.BooleanField:
        return self.is_admin

    def has_perm(self, perm: str, obj=None) -> models.BooleanField:
        return self.is_admin

    def has_module_perms(self, app_label: str) -> models.BooleanField:
        return self.is_admin
