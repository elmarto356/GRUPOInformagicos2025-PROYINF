from django.contrib import admin
from .models import Cliente, SolicitudCredito

@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    # Campos que se muestran en la lista
    list_display = [
        'rut',
        'get_nombre_completo', 
        'get_email',
        'telefono', 
        'fecha_Nacimiento',
        'fecha_creacion'
    ]
    
    # Filtros laterales
    list_filter = [
        'fecha_creacion',
        'fecha_Nacimiento'
    ]
    
    # Campos de búsqueda
    search_fields = [
        'rut', 
        'user__email',
        'user__first_name', 
        'user__last_name',
        'telefono'
    ]
    
    # Campos de solo lectura
    readonly_fields = ['fecha_creacion']
    
    # Organización de campos en el formulario
    fieldsets = (
        ('Usuario Asociado', {
            'fields': ('user',)
        }),
        ('Datos Personales', {
            'fields': ('rut', 'fecha_Nacimiento', 'telefono')
        }),
        ('Metadatos', {
            'fields': ('fecha_creacion',),
            'classes': ('collapse',)
        }),
    )
    
    # Ordenamiento por defecto
    ordering = ['-fecha_creacion']
    
    # Campos editables directamente desde la lista
    list_editable = ['telefono']
    
    # Métodos personalizados para mostrar datos del User
    def get_nombre_completo(self, obj):
        return obj.get_nombre_completo()
    get_nombre_completo.short_description = 'Nombre Completo'
    get_nombre_completo.admin_order_field = 'user__first_name'
    
    def get_email(self, obj):
        return obj.get_email()
    get_email.short_description = 'Email'
    get_email.admin_order_field = 'user__email'
    
    # Configuración adicional
    list_per_page = 25
    
    # Acción personalizada para desactivar usuarios
    actions = ['desactivar_usuarios']
    
    def desactivar_usuarios(self, request, queryset):
        count = 0
        for cliente in queryset:
            cliente.user.is_active = False
            cliente.user.save()
            count += 1
        self.message_user(request, f'{count} clientes desactivados correctamente.')
    desactivar_usuarios.short_description = 'Desactivar usuarios seleccionados'


@admin.register(SolicitudCredito)
class SolicitudCreditoAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'get_cliente_nombre',
        'get_cliente_rut',
        'monto'
    ]
    
    list_filter = [
        'monto',
    ]
    
    search_fields = [
        'cliente__rut',
        'cliente__user__first_name',
        'cliente__user__last_name'
    ]
    
    # Mostrar información del cliente en la solicitud
    def get_cliente_nombre(self, obj):
        return obj.cliente.get_nombre_completo()
    get_cliente_nombre.short_description = 'Cliente'
    get_cliente_nombre.admin_order_field = 'cliente__user__first_name'
    
    def get_cliente_rut(self, obj):
        return obj.cliente.rut
    get_cliente_rut.short_description = 'RUT'
    get_cliente_rut.admin_order_field = 'cliente__rut'
    
    # Configuración adicional
    list_per_page = 25
    ordering = ['-id']