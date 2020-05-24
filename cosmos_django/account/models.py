from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models


class AccountManager(BaseUserManager):
    """Manager for the Account class."""

    def create_user(self, email, password):
        """Create a user."""
        if not email:
            raise ValueError('User must provide an email.')

        if not password:
            raise ValueError('User must provide a password.')

        normalized_email = self.normalize_email(email)
        user = self.model(normalized_email)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        """Create a superuser. Superusers can log into the admin platform."""
        superuser = self.create_user(email=email, password=password)
        superuser.is_staff = True
        superuser.is_admin = True
        superuser.is_superuser = True
        superuser.save(using=self._db)
        return superuser


class Account(AbstractBaseUser):
    """The Base User account."""
    email = models.EmailField(max_length=60, unique=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = AccountManager()

    # Specify which field the user will log in with.
    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'

    def __str__(self):
        return self.email

    def is_staff(self):
        return self.is_staff

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return self.is_admin
