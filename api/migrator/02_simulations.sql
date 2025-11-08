CREATE TABLE IF NOT EXISTS simulations (
  id               BIGSERIAL PRIMARY KEY,
  user_id          INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at       TIMESTAMP NOT NULL DEFAULT NOW(),
  amount           NUMERIC(14,0) NOT NULL,
  months           INT NOT NULL,
  annual_rate      NUMERIC(7,4) NOT NULL,
  method           VARCHAR(16) NOT NULL DEFAULT 'french',
  monthly_payment  NUMERIC(14,2) NOT NULL,
  total_interest   NUMERIC(14,2) NOT NULL,
  total_to_pay     NUMERIC(14,2) NOT NULL,
  CHECK (amount BETWEEN 100000 AND 50000000),
  CHECK (months BETWEEN 6 AND 60),
  CHECK (annual_rate >= 0 AND annual_rate <= 1)
);

CREATE INDEX IF NOT EXISTS idx_simulations_user_created_at ON simulations (user_id, created_at DESC);