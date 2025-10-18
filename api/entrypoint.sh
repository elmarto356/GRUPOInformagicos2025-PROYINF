#!/usr/bin/env sh
set -e

echo "Esperando Postgres en $DB_HOST:$DB_PORT..."
until pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" >/dev/null 2>&1; do
  sleep 1
done
echo "Postgres listo ✅"

CONN="postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME"

# Tabla de control de migraciones
psql "$CONN" -v ON_ERROR_STOP=1 -c \
  "CREATE TABLE IF NOT EXISTS schema_migrations (name TEXT PRIMARY KEY, applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW());"

# Aplica solo los SQL no registrados
for f in $(ls -1 /app/migrator/*.sql 2>/dev/null | sort); do
  name=$(basename "$f")
  applied=$(psql "$CONN" -t -A -c "SELECT 1 FROM schema_migrations WHERE name='$name' LIMIT 1;")
  if [ "$applied" = "1" ]; then
    echo "→ $name ya aplicado, saltando."
  else
    echo "→ Aplicando $name ..."
    psql "$CONN" -v ON_ERROR_STOP=1 -f "$f"
    psql "$CONN" -v ON_ERROR_STOP=1 -c "INSERT INTO schema_migrations(name) VALUES ('$name') ON CONFLICT DO NOTHING;"
    echo "✓ $name aplicado."
  fi
done

echo "Migraciones OK ✅"
echo "Levantando API..."
exec npm start
