from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator


class Cliente(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    fecha_Nacimiento = models.DateField()
    rut = models.CharField(
        max_length=12, 
        unique=True,
        validators=[RegexValidator(
            regex=r'^\d{7,8}-[\dkK]$',
            message='Formato: 12345678-9'
        )]
    )

    telefono = models.CharField(
        max_length=15,
        help_text="Formato: +56912345678"
    )

    fecha_creacion = models.DateField(auto_now_add=True)

    def get_email(self):
        return self.user.email

    def get_nombre_completo(self):
        return f"{self.user.first_name} {self.user.last_name}".strip()
    
    class Meta:
        verbose_name = "Cliente"
        verbose_name_plural = "Clientes"
        
    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"


class SolicitudCredito(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    monto = models.DecimalField(max_digits=10, decimal_places=2)
